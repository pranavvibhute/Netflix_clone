import React, { useEffect, useState } from "react";
import { Link } from 'react-router';
import { Play, Bookmark } from "lucide-react";

const TV_Hero = ({ isAnime = false }) => {
  const [show, setShow] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjkxYTU4NmU5YmU4ZWEzODBmMmZjZGNmODY0NTVlYyIsIm5iZiI6MTc0NDI4NDY3Ny43ODksInN1YiI6IjY3ZjdhYzA1ZDNhYjdkN2E4YmFkNDg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6gYxTOUOAyes_6Is6qZKxrH2DsqdQYc4W9HRsKSfD34",
    },
  };

  useEffect(() => {
    const url = isAnime
      ? "https://api.themoviedb.org/3/discover/tv?language=en-US&page=1&with_genres=16&with_original_language=ja"
      : "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          console.log("hero-section:", res.results[randomIndex]);
          setShow(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, [isAnime]);

  if (!show) {
    return (
      <div className="text-white p-6 text-lg">Loading...</div>
    );
  }

  return (
    <div className="text-white relative">
      <img
        src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`}
        alt="HeroBg"
        className="w-full rounded-2xl h-[500px] object-center object-cover"
      />
      <div className="flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10">
        <Link to={isAnime ? `/tv/${show.id}` : `/anime/${show.id}`}>
          <button className="flex items-center justify-center bg-[#e50914] text-white hover:ring-1 ring-white py-3 px-4 rounded cursor-pointer text-sm md:text-base">
            <Play className="mr-2" />
            Watch Now
          </button>
        </Link>
        <button className="flex items-center justify-center bg-[#333333] text-white hover:text-[#e50914] hover:ring-1 ring-[#e50914] py-3 px-4 rounded cursor-pointer text-sm md:text-base">
          <Bookmark className="mr-2" />
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default TV_Hero;
