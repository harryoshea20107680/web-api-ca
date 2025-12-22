import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from '../components/spinner';
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const TopRatedMoviesPage = (props) => {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topRatedMovies", "en-US"],
    queryFn: () => getTopRatedMovies({ language: "en-US" }),
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
      title="Top Rated Movies"
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

export default TopRatedMoviesPage;
