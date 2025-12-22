import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUpcomingMovies()
      .then((results) => setMovies(results))
      .catch((err) => setError(err));
  }, []);

  if (error) return <p>Error loading upcoming movies: {error.message}</p>;
  if (!movies.length) return <p>Loading upcoming movies...</p>;

    return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      
      action={(movie) => <AddToWatchlistIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
