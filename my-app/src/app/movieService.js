import axios from 'axios';

// Backend API endpoint (adjust this if needed)
const API_URL = 'http://localhost:9090/movies';

// Function to fetch all movies
export const fetchMovies = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Function to search for movies based on a query
export const searchMovies = async (query) => {
    const response = await axios.get(`${API_URL}?search=${query}`);
    return response.data;
};
