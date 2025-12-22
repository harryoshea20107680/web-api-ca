import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../components/spinner';
import { getNowPlayingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const NowPlayingMoviesPage = (props) => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["nowPlayingMovies", "en-US"],
    queryFn: () => getNowPlayingMovies({ language: "en-US" }),
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
      title="Movies playing in cinemas now"
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

export default NowPlayingMoviesPage;
