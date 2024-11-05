import axios from 'axios';

// Base API URLs
const GET_MOVIES_URL = 'http://localhost:9090/get-movies'; // For getting all movies
const SEARCH_MOVIES_URL = 'http://localhost:9090/api/movies'; // For searching movies
const REGISTER_URL = 'http://localhost:9090/register'; // For registering users
const VERIFY_EMAIL_URL = 'http://localhost:9090/Success'; // For verifying emails
const LOGIN_URL = 'http://localhost:9090/login'; // For login
const USER_PROFILE_URL = 'http://localhost:9090/user-profile'; // For getting user profile
const ADD_MOVIE_URL = 'http://localhost:9090/add-movie'; // URL for adding a new movie
const PROMOTION_OPTIN_URL = 'http://localhost:9090/api/users/promotion-optin';
const ADD_PROMOTION_URL = 'http://localhost:9090/api/promotions/add';

// Function to update promotion opt-in status for a user
export const updatePromotionOptIn = async (userId, optIn) => {
    try {
        const response = await axios.post(PROMOTION_OPTIN_URL, { userId, optIn });
        return response.data;
    } catch (error) {
        console.error("Failed to update promotion opt-in status:", error);
        throw error;
    }
};

// Function to add a new promotion and send notifications to opted-in users
export const addPromotion = async (promotionData) => {
    try {
        const response = await axios.post(ADD_PROMOTION_URL, promotionData);
        return response.data;
    } catch (error) {
        console.error("Failed to add promotion:", error);
        throw error;
    }
};

// Function to add a movie to the database
export const addMovie = async (movieData) => {
    try {
        const response = await axios.post(ADD_MOVIE_URL, movieData);
        return response.data;
    } catch (error) {
        console.error("Failed to add movie:", error);
        throw error;
    }
};

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

        return response.data; // Assuming the backend returns user info
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// Function to fetch user profile
export const fetchUserProfile = async (email) => {
    try {
        const response = await axios.get(`${USER_PROFILE_URL}?email=${email}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

// Function to handle forgot password
export const sendResetPasswordEmail = async (email) => {
    try {
        const response = await axios.post('http://localhost:9090/forgot-password', { email });
        return response.data;
    } catch (error) {
        console.error("Failed to send reset password email:", error);
        throw error;
    }
};


// Add this function to movieService.js
export const updateUserProfile = async (userData) => {
    try {
        const response = await axios.post('http://localhost:9090/update-profile', userData);
        return response.data;
    } catch (error) {
        console.error("Update profile failed:", error);
        throw error;
    }
};

export const resetPassword = async (email, newPassword) => {
    try {
        const response = await axios.post('http://localhost:9090/reset-password', {
            email, // User's email
            password: newPassword // The new password to be updated
        });
        return response.data;
    } catch (error) {
        console.error("Failed to reset password:", error);
        throw error; // Rethrow the error to handle it in the frontend
    }
};

export const fetchMovieById = async (id) => {
    console.log("hi");
    try {
        const response = await axios.get(`http://localhost:9090/api/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch movie by ID:", error);
        throw error; // Rethrow the error to handle it in the frontend
    }
};


