import React, { useEffect, useState } from "react";
import{Link} from 'react-router'
import { Play, Bookmark } from "lucide-react";

const TV_Hero = () => {
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
    fetch(
      "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          console.log("hero-section:",res.results[randomIndex]);
          setShow(res.results[randomIndex]); 
        }
      })
      .catch((err) => console.error(err));
  }, []);


    if (!show) {
        return(
            <p>Loading</p>
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
        <Link to={`/tv/${show.id}`}>
        <button className="flex items-center justify-center bg-[#e50914] text-white hover:ring-1 ring-white py-3 px-4 rounded cursor-pointer text-sm md:text-base">
          <Play />
          Watch Now
        </button>
        </Link>
        <button className="flex items-center justify-center bg-[#333333] text-white hover:text-[#e50914] hover:ring-1 ring-[#e50914] py-3 px-4 rounded cursor-pointer text-sm md:text-base">
          <Bookmark />
          Save For Later
        </button>
      </div>
    </div>
  );
};

export default TV_Hero;
