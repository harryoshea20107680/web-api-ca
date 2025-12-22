import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { getTrendingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TrendingMoviePage = (props) => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trending", "week", "en-US"],
    queryFn: () => getTrendingMovies({ timeWindow: "week", language: "en-US" }),
  })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }



  const movies = data.results;
  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
             <AddToFavoritesIcon movie={movie} />
          </>
        );
      }}
    />
  );


};

export default TrendingMoviePage;

