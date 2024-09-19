"use client";

import React, { useState } from 'react';

export default function ManageMovies() {
    const [movies, setMovies] = useState([
        { id: 1, title: 'Barbie', schedule: '12:00 PM' },
        { id: 2, title: 'Oppenheimer', schedule: '3:00 PM' },
    ]);
    const [newMovie, setNewMovie] = useState({ title: '', schedule: '' });

    const handleAddMovie = () => {
        if (!newMovie.title || !newMovie.schedule) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedMovies = [
            ...movies,
            { id: movies.length + 1, ...newMovie },
        ];
        setMovies(updatedMovies);
        setNewMovie({ title: '', schedule: '' });
    };

    const handleDeleteMovie = (id) => {
        const updatedMovies = movies.filter(movie => movie.id !== id);
        setMovies(updatedMovies);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-black">Manage Movies</h2>

            <div className="mb-4">
                <h3 className="font-semibold text-black">Add New Movie</h3>
                <input
                    type="text"
                    placeholder="Movie Title"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    className="border rounded w-full p-2 mb-2"
                />
                <input
                    type="text"
                    placeholder="Schedule (e.g., 12:00 PM)"
                    value={newMovie.schedule}
                    onChange={(e) => setNewMovie({ ...newMovie, schedule: e.target.value })}
                    className="border rounded w-full p-2 mb-2"
                />
                <button
                    onClick={handleAddMovie}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Add Movie
                </button>
            </div>

            <ul className="divide-y divide-gray-300">
                {movies.map((movie) => (
                    <li key={movie.id} className="py-2 flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-black">{movie.title}</p>
                            <p className="text-black">Schedule: {movie.schedule}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteMovie(movie.id)}
                            className="text-red-500 hover:underline"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
