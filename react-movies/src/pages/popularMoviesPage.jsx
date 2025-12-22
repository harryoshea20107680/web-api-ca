import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../components/spinner';
import { getPopularMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const PopularMoviesPage = (props) => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["popularMovies", "en-US"],
    queryFn: () => getPopularMovies({ language: "en-US" }),
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
      title="Popular Movies"
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

export default PopularMoviesPage;

