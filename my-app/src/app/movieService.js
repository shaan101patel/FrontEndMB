import axios from 'axios';

// Base API URLs
const GET_MOVIES_URL = 'http://localhost:9090/get-movies'; // For getting all movies
const SEARCH_MOVIES_URL = 'http://localhost:9090/api/movies'; // For searching movies

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


