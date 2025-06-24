import {Link} from 'react-router';
import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';

const TV_Shows_CardList = ({title, category}) => {

    const [data, setData] = useState([])

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjkxYTU4NmU5YmU4ZWEzODBmMmZjZGNmODY0NTVlYyIsIm5iZiI6MTc0NDI4NDY3Ny43ODksInN1YiI6IjY3ZjdhYzA1ZDNhYjdkN2E4YmFkNDg5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6gYxTOUOAyes_6Is6qZKxrH2DsqdQYc4W9HRsKSfD34'
        }
      };
      
      useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res =>{ console.log("full response:" ,res); setData(res.results)})
        .catch(err => console.error(err));
      }, []);

  return (
    <div className='text-white md:px-4 '>
        <h2 className='pt-10 pb-5 text-lg font-medium'>{title}</h2>
        
        <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
            {data.map((item, id) => (
                <SwiperSlide key={id} className='max-w-72'>
                    <Link to={`/tv/${item.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt="" className='h-44 w-full object-center rounded object-cover'/>
                    <p className='text-center pt-2'>{item.original_name}</p>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default TV_Shows_CardList