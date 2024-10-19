
import axios from 'axios';

// Base API URLs
const GET_MOVIES_URL = 'http://localhost:9090/get-movies'; // For getting all movies
const SEARCH_MOVIES_URL = 'http://localhost:9090/api/movies'; // For searching movies
const REGISTER_URL = 'http://localhost:9090/register'; // For registering users
const VERIFY_EMAIL_URL = 'http://localhost:9090/Success'; // For verifying emails
const LOGIN_URL = 'http://localhost:9090/login'; // Add the login URL



// Function to fetch all movies
export const fetchMovies = async () => {
    const response = await axios.get(GET_MOVIES_URL);
    return response.data;
};

// Function to search for movies based on a query
export const searchMovies = async (query) => {
    const response = await axios.get(`${SEARCH_MOVIES_URL}?search=${query}`);
    return response.data;
};

// Function to handle user registration
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(REGISTER_URL, userData);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};



// Function to verify user email
export const verifyEmail = async (token) => {
    try {
        const response = await axios.get(`${VERIFY_EMAIL_URL}?token=${token}`);
        return response;
    } catch (error) {
        console.error("Email verification failed:", error);
        throw error;
    }
};


// Function to handle login
export const loginUser = async (email, password) => {
    try {
        console.log('Before API Call:', email, password);
        const response = await axios.post(LOGIN_URL, { email, password });
        console.log("Response Data in movieService:", response.data);

        return response.data; // Assuming the backend returns a token or user info

        const sessionStatus = await checkSession();
        console.log('Session Status:', sessionStatus); // Should reflect the logged-in state

    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};




