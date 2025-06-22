import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.model.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))
const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=> {
    res.send("Hello, World!!!!!!!");
})

app.post("/api/signup", async(req, res)=> {
    const {username, email, password} = req.body;
    try {
        if(!username || !email || !password){
            throw new Error("Please fill all the fields");
        }

        const emailExists = await User.findOne({email});
        if(emailExists){
            throw new Error("Email already exists");
        }

        const usernameExists = await User.findOne({username});
        if(usernameExists){
            throw new Error("Username already exists");
        }

        // Hash the password
        const hashedPass = await bcryptjs.hash(password, 10);

        const userDoc = await User.create({
            username,
            email,
            password: hashedPass
        });

        //JWT Token generation can be added here
        if(userDoc){
            // jwt.sign(payload, secret, options)
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET,{
                expiresIn: "7d",
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
            return res.status(200).json({ user: userDoc, message:"User Created Successfully"});
        }

    } catch (error) {
        return res.status(400).json({message: error.message});
    }
})

app.post("/api/login", async(req, res)=> {
    const {username, password} = req.body;
    try {
       const userDoc = await User.findOne({username});
       if(!userDoc){
            return res.status(400).json({message: "Invalid Credentials"});
       }

       const isPasswordValid = await bcryptjs.compare(password, userDoc.password);

        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid Credentials"});
        }

         //JWT Token generation can be added here
         if(userDoc){
            // jwt.sign(payload, secret, options)
            const token = jwt.sign({id: userDoc._id}, process.env.JWT_SECRET,{
                expiresIn: "7d",
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            })
            return res.status(200).json({ user: userDoc, message:"Logged In Successfully"});
        }

    } catch (error) {
        console.log("Error logging in:", error);
        res.status(400).json({message: error.message});
    }
})

app.get("/api/fetch_user", async(req, res)=> {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({message: "No Token Provided"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "Invalid Token"});
        }

        const userDoc = await User.findById(decoded.id).select("-password");
        if(!userDoc){
            return res.status(400).json({message: "User not found"});
        }
        res.status(200).json({user: userDoc});
    } catch (error) {
        console.log("Error fetching user:", error);
        res.status(400).json({message: error.message});
    }
})

app.post("/api/logout", async(req, res)=> {
    res.clearCookie("token");
    res.status(200).json({message: "Logged out successfully"});
})

app.listen(PORT, ()=> {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
})