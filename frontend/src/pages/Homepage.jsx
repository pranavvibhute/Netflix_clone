import React from 'react'
import Hero from '../components/Hero'
import CardList from '../components/CardList'
import Footer from '../components/Footer'
import TV_Shows_CardList from '../components/TV_Shows_CardList'

const Homepage = () => {
  return (
    <div className='p-3'>
        <Hero />
       <div className='mt-10'> 
        <h1 className='text-white text-4xl text-center mt-15 font-bold'>MOVIES</h1>
        <CardList title="Now Playing" category={"now_playing"} />
        <CardList title="Upcoming" category={"upcoming"} />
       </div>
       <div className='mt-10'> 
        <h1 className='text-white text-4xl text-center mt-15 font-bold'>TV SHOWS</h1>
        <TV_Shows_CardList title="On The Air" category={"on_the_air"} />
        <TV_Shows_CardList title="Top Rated" category={"top_rated"} />

       </div> 
       <div className='mt-10'> 
        <h1 className='text-white text-4xl text-center mt-15 font-bold'>ANIME</h1>
      <TV_Shows_CardList
        title="Popular"
        category="with_genres=16&with_original_language=ja&sort_by=popularity.desc"
      />

      <TV_Shows_CardList
        title="Top Rated"
        category="with_genres=16&with_original_language=ja&sort_by=vote_average.desc&vote_count.gte=100"
      />
       </div> 
       <Footer />
    </div>
  )
}

export default Homepage