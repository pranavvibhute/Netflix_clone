import React from 'react'
import TV_Shows_CardList from '../components/TV_Shows_CardList'
import TV_Hero from '../components/TV_Hero'

const TVShowsSection = () => {
  return (
    <div className='p-3'>
        <TV_Hero />
        <TV_Shows_CardList title="Airing Today" category={"airing_today"} />
        <TV_Shows_CardList title="On The Air" category={"on_the_air"} />
        <TV_Shows_CardList title="Popular" category={"popular"} />
        <TV_Shows_CardList title="Top Rated" category={"top_rated"} />
    </div>
  )
}

export default TVShowsSection