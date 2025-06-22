 import {create} from 'zustand';
 import axios from 'axios';

 axios.defaults.withCredentials = true; // Enable sending cookies with requests

 const API_URL = "http://localhost:5000/api"; // Base URL for the API

 export const useAuthStore = create((set)=>({
    // initial states
    user: null,
    isLoading: false,
    error: null,
    message: null,
    fetchingUser: true,

    //functions
    signup: async(username, email, password) => {
        set({isLoading: true, message: null});
        try {
            const response = await axios.post(`${API_URL}/signup`, {
                username, email, password,
            });

            set({user: response.data.user, isLoading:false})
        } catch (error) {
            set({isLoading: false, error: error.response.data.message || "Error signing up."});
            throw error;
        }
    },

    login: async(username, password)=>{
        set({isLoading: true, message: null, error:null});
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username, password,
            });

            const {user, message} = response.data;

            set({user, message, isLoading: false,});
            return {user, message};

        } catch (error) {
            set({isLoading: false, error: error.response.data.message || "Error logging in."});
            throw error;
        }
    },

    fetchUser: async() => {
        set({fetchingUser: true, error: null});
        try {
            const response = await axios.get(`${API_URL}/fetch_user`);
            set({user: response.data.user, fetchingUser: false});
        } catch (error) {
            set({
                fetchingUser: false,
                error: null,
                user: null,
            })
            throw error;
        }
    },

    logout: async() => {
        set({isLoading: true, error: null, message: null});
        try {
           const response =  await axios.post(`${API_URL}/logout`);
           const{message} = response.data;
            set({message, user: null, isLoading: false, error: null});
            return {message};
        } catch (error) {
            set({isLoading: false, error: error.response.data.message || "Error logging out."});
            throw error;
        }
    }
}));