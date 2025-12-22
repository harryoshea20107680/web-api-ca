import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import PageTemplate from "../templateMovieListPage";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";

const MovieRecommendations = ({ movieId, movie }) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recommendations", movieId],
    queryFn: () => getMovieRecommendations(movieId),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <h3>{error.message}</h3>;

  const movies = data.results;

  return (
    <PageTemplate
      title={"If you liked this movie, you'll love:"}
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default MovieRecommendations;
