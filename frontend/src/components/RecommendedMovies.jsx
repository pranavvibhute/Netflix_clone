import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
const RecommendedMovies = ({ movieTitles }) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjkxYTU4NmU5YmU4ZWEzODBmMmZjZGNmODY0NTVlYyIsIm5iZiI6MTc0NDI4NDY3Ny43ODksInN1YiI6IjY3ZjdhYzA1ZDNhYjdkN2E4YmFkNDg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6gYxTOUOAyes_6Is6qZKxrH2DsqdQYc4W9HRsKSfD34",
    },
  };

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovie = async (title) => {
    const encodedTitle = encodeURIComponent(title);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=false&language=en-US&page=1`;
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.results?.[0] || null;
    } catch (error) {
      console.log("Error fetch;ing movie:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const results = await Promise.all(
        movieTitles.map((title) => fetchMovie(title))
      );
      setMovies(results.filter(Boolean));
      setLoading(false);
    };

    if (movieTitles?.length) {
      loadMovies();
    }
  }, [movieTitles]);

  if (loading) {
    return <p className="text-white"> Loading . . .</p>;
  }

  console.log(movies);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <Link
          to={`/movie/${movie.id}`}
          key={movie.id}
          className="bg-[#232323] rounded-lg overflow-hidden"
        >
          {movie.poster_path ? (
            <img
              src={`http://image.tmdb.org/t/p/w300${movie.poster_path}`}
              className="w-full h-64 object-cover mb-4"
            />
          ) : (
            <>No Image</>
          )}
          <div>
            <h3 className="text-sm font-semibold text-white truncate">{movie.title}</h3>
            <p className="text-sx text-gray-400">{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedMovies;
