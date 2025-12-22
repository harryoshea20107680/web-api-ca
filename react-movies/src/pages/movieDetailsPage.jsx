import React from "react";
import { useParams } from 'react-router';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
// import useMovie from "../hooks/useMovie";   Redundant
import MovieRecommendations from "../components/movieRecommendations";
import SimilarMovies from "../components/similarMovies";
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

const MoviePage = (props) => {
  const { id } = useParams();
  const [tab, setTab] = useState(0);

  const { data: movie, error, isPending, isError  } = useQuery({
    queryKey: ['movie', {id: id}],
    queryFn: getMovie,
  })

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
            <Tab label="Overview" />
            <Tab label="Recommendations" />
            <Tab label="Similar" />
            </Tabs>
            </Box>

            {tab === 0 && <MovieDetails movie={movie} />}
            {tab === 1 && <MovieRecommendations movieId={id} />}
            {tab === 2 && <SimilarMovies movieId={id} />}
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
