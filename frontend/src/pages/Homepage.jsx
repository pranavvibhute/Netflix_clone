import React from 'react'
import Hero from '../components/Hero'
import CardList from '../components/CardList'
import Footer from '../components/Footer'
import TV_Shows_CardList from '../components/TV_Shows_CardList'

const Homepage = () => {
  return (
    <div className='p-3'>
        <Hero />
       <div className='flex flex-col items-center mt-10'> 
        <h1 className='text-white text-4xl text-center mt-10 font-bold'>MOVIES</h1>
        <CardList title="Now Playing" category={"now_playing"} />
        <CardList title="Upcoming" category={"upcoming"} />
       </div>
       <div className='flex flex-col items-center mt-10'> 
        <h1 className='text-white text-4xl text-center mt-10 font-bold'>TV SHOWS</h1>
        <TV_Shows_CardList title="On The Air" category={"on_the_air"} />
        <TV_Shows_CardList title="Top Rated" category={"top_rated"} />
        <Footer />
       </div> 
    </div>
  )
}

export default Homepage