import React from 'react';
import Link from 'next/link';

const MovieCard = ({ movie }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      {/* Movie Poster */}
      <img className="w-full" src={movie.poster} alt={`${movie.title} Poster`} />

      {/* Movie Details */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{movie.title}</div>
      </div>

      {/* Button to go to Movie Details */}
      <div className="px-6 py-4">
        <Link href={`/movies/${movie.id}`}>
          <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View Details
          </a>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
