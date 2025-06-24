import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";

const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    const API_KEY = "6d5956077c5948b9994faeaf788ddd99";
    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGame(data);
      })
      .catch((err) => console.error(err));

    fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setScreenshots(data.results || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!game) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl text-red-500">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      <div
        className="relative h-[60vh] flex items-end"
        style={{
          backgroundImage: `url(${game.background_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent"></div>
        <div className="relative z-10 flex items-end p-8 gap-8">
          <div className="mb-2">
            <h1 className="text-4xl font-bold mb-2">{game.name}</h1>
            <div className="flex items-center gap-4 mb-2">
              <span>⭐{game.rating?.toFixed(1)}</span>
              <span>{new Date(game.released).toLocaleDateString()}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {game.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="max-w-3xl text-gray-200">
              {game.description_raw.length > 200
                ? `${game.description_raw.slice(0, 200)}...`
                : game.description_raw}
            </p>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="bg-[#232323] rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="text-gray-300 space-y-3">
              <li>
                <span className="font-semibold text-white">Released: </span>
                <span className="ml-2">{game.released}</span>
              </li>
              <li>
                <span className="font-semibold text-white">Developers: </span>
                <span className="ml-2">
                  {game.developers?.map((dev) => dev.name).join(", ") || "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Publishers: </span>
                <span className="ml-2">
                  {game.publishers?.map((pub) => pub.name).join(", ") || "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Platforms: </span>
                <span className="ml-2">
                  {game.platforms?.map((p) => p.platform.name).join(", ") ||
                    "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Genres: </span>
                <span className="ml-2">
                  {game.genres?.map((g) => g.name).join(", ")}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Website: </span>
                <span className="ml-2">
                  <a
                    href={game.website}
                    className="text-blue-400 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {game.website}
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Description:</h3>
            <p className="text-gray-400">{game.description_raw}</p>
          </div>
        </div>
        {screenshots.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-white mb-2">
              Screenshots ({screenshots.length})
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {screenshots.map((shot) => (
                <img
                  key={shot.id}
                  src={shot.image}
                  alt={`Screenshot ${shot.id}`}
                  className="rounded-lg w-[1366px] h-[768px] object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
