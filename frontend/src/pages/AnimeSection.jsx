import React from "react";
import TV_Shows_CardList from "../components/TV_Shows_CardList";
import TV_Hero from "../components/TV_Hero";

const AnimeSection = () => {
  return (
    <div className="p-3">
      <TV_Hero isAnime={true} />

      <TV_Shows_CardList
        title="On The Air"
        category="with_genres=16&with_original_language=ja&sort_by=popularity.desc"
      />

      <TV_Shows_CardList
        title="Popular"
        category="with_genres=16&with_original_language=ja&sort_by=popularity.desc"
      />

      <TV_Shows_CardList
        title="Top Rated"
        category="with_genres=16&with_original_language=ja&sort_by=vote_average.desc&vote_count.gte=100"
      />
    </div>
  );
};

export default AnimeSection;
