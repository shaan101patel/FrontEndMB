/*
"use client";

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
*/

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState(''); // Store the search query

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the page from refreshing
        onSearch(query); // Call the `onSearch` function from the parent component (Home.js)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} // Update the query as the user types
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;

