/*
"use client";

import React from 'react';
import SearchBar from './search/page.js';

export default function Home() {
    return (
        <div>
            <h1>Hello, this is the Home page</h1>
            <SearchBar />
        </div>
    );
}
*/

"use client";

import React, { useEffect, useState } from 'react';
import SearchBar from './search/page.js'; // Import your SearchBar component
import { fetchMovies, searchMovies } from './movieService'; // Import the API calls

export default function Home() {
    const [movies, setMovies] = useState([]); // Store the list of movies
    const [searchQuery, setSearchQuery] = useState(''); // Store the current search query

    // Fetch all movies when the component mounts
    useEffect(() => {
        const loadMovies = async () => {
            const movieList = await fetchMovies();
            setMovies(movieList);
        };
        loadMovies();
    }, []);

    // Handle the search functionality
    const handleSearch = async (query) => {
        const results = await searchMovies(query);
        setMovies(results); // Update the movie list with the search results
    };

    return (
        <div>
            <h1>Welcome to the Movie Booking System</h1>
            <SearchBar onSearch={handleSearch} /> {/* Search bar to input movie titles */}

            <h2>Movie List</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li> // Adjust this based on your movie structure
                ))}
            </ul>
        </div>
    );
}


