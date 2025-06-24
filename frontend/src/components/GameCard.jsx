import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const GamesCard = ({ title, ordering = "-rating" }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const API_KEY = "6d5956077c5948b9994faeaf788ddd99";

    fetch(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=${ordering}&page=1`)
      .then(res => res.json())
      .then(res => {
        console.log("Games response:", res);
        setGames(res.results);
      })
      .catch(err => console.error(err));
  }, [ordering]);

  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-2xl font-medium">{title}</h2>

      <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
        {games.map((game) => (
          <SwiperSlide key={game.id} className="max-w-72">
            <Link to={`/games/${game.id}`}>
              <img
                src={game.background_image}
                alt={game.name}
                className="h-44 w-full object-center rounded object-cover"
              />
              <p className="text-center pt-2">{game.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GamesCard;
