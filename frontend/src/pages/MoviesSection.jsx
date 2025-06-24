import React from 'react'
import CardList from '../components/CardList'
import Hero from '../components/Hero'

const MoviesSection = () => {
  return (
     <div className='p-3'>
        <Hero />
        <CardList title="Now Playing" category={"now_playing"} />
        <CardList title="Top Rated" category={"top_rated"} />
        <CardList title="Popular" category={"popular"} />
        <CardList title="Upcoming" category={"upcoming"} />
    </div>
  )
}

export default MoviesSection