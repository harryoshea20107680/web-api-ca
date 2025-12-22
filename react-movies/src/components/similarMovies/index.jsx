import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSimilarMovies } from "../../api/tmdb-api";
import Spinner from "../spinner";
import PageTemplate from "../templateMovieListPage";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";

const SimilarMovies = ({ movieId }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["similarMovies", movieId],
    queryFn: () => getSimilarMovies(movieId),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Similar Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default SimilarMovies;