import axios from 'axios';
import { useState } from 'react';

// Base API URLs
const GET_MOVIES_URL = 'http://localhost:9090/get-movies'; // For getting all movies
const SEARCH_MOVIES_URL = 'http://localhost:9090/api/movies'; // For searching movies
const REGISTER_URL = 'http://localhost:9090/register'; // For registering users

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

