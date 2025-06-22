import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
const navigate = useNavigate();
    
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const {signup, isLoading, error} = useAuthStore();


const handleSignUp = async(e)=> {
    e.preventDefault();
    try {
        await signup(username, email, password);
        navigate("/");
    } catch (error) {
        console.log(error);
    }
    console.log("Sign Up Successful ",username, email, password);
}

console.log("Username: ", username, "Email: ", email, "Password: ", password);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 md:px-8 py-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/background_banner.jpg)",
      }}
    >
      <div className="max-w-[450px] w-full bg-black opacity-90 p-8 rounded-lg mx-auto">
        <h1 className="text-3xl font-medium text-white mb-7">Sign Up</h1>
        <form onSubmit={handleSignUp} action="" className="flex flex-col space-y-4 ">
          <input
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            placeholder="username"
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base"
          />
          <input
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base"
          />
          <input
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            placeholder="enter your password"
            className="w-full h-[50px] bg-[#333] text-white rounded px-5 text-base"
          />

            {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#e50914] text-white py-2 rounded text-base hover:opacity-90 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-10 text-[#737373] text-sm">
          <p>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/signin")}
              className="text-white font-medium cursor-pointer ml-2 hover:text-[#e50914]"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
