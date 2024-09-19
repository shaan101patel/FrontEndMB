import MovieCard from '../components/MovieCard';

const movieList = [
  {
    id: 1,
    title: "Inception",
    poster: "/images/inception.jpg"
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "/images/interstellar.jpg"
  }
  // Add more movies here...
];

export default function Home() {
  return (
    <div>
      <h1>Hello, this is the Home page</h1>
    </div>
  );
}