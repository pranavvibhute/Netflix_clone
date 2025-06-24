import React from 'react'
import GameCard from '../components/GameCard'

const GamesSection = () => {
  return (
    <div className="p-4">
      <GameCard title="Most Popular Games" ordering="-added" />
      <GameCard title="Top Rated Games" ordering="-rating" />
      <GameCard title="Recently Released Games" ordering="-released" />
    </div>
  )
}

export default GamesSection