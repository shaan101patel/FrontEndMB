import { useRouter } from 'next/navigation';

export default function MovieDetails() {
  const router = useRouter();
  const id = router.query?.id; // Fetch the movie ID from the URL

  // Temporary movie data, replace this with actual API call
  const movieDetails = {
    1: {
      title: 'Inception',
      description: 'A skilled thief, the absolute best in the dangerous art of extraction...',
      trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0',
      poster: '/images/inception.jpg',
    },
    2: {
      title: 'Interstellar',
      description: 'A team of explorers travel through a wormhole in space in an attempt to...',
      trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
      poster: '/images/interstellar.jpg',
    },
  };

  // Fetch the movie data based on the ID (for now, using local data)
  const movie = movieDetails[id];

  if (!movie) return <p>Movie not found!</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img className="w-full max-w-md mb-4" src={movie.poster} alt={`${movie.title} Poster`} />
      <p className="mb-4">{movie.description}</p>

      {/* Movie Trailer */}
      <div className="mb-6">
        <iframe
          width="100%"
          height="400px"
          src={movie.trailerUrl}
          title="Movie Trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Book Now
      </button>
    </div>
  );
}
