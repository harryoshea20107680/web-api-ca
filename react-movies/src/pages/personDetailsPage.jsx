import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPerson, getPersonMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Avatar, Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import MovieCard from "../components/movieCard";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const PersonDetailsPage = () => {
  const { id } = useParams();

  const { data: person, isLoading, isError, error } = useQuery({
    queryKey: ["person", id],
    queryFn: () => getPerson(id),
  });

  const { data: credits, isLoading: isLoadingCredits, isError: isErrorcredits, error: creditsError } = useQuery({
    queryKey: ["personCredits", id],
    queryFn: () => getPersonMovieCredits(id),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Typography color="error">{error.message}</Typography>;
  if (isLoadingCredits) return <Spinner />;
  if (isErrorcredits) return <Typography color="error">{creditsError.message}</Typography>;

  return (
    <div style={{ padding: "1em" }}>
      <Avatar
        src={
          person.profile_path
            ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
            : undefined
        }
        sx={{ width: 150, height: 150 }}
      />
      <Typography variant="h4">{person.name}</Typography>
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        {person.biography}
      </Typography>

      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Known For
      </Typography>
      <Grid container spacing={2}>
        {credits.cast.slice(0, 6).map((movie) => (
        <Grid item xs={6} sm={4} md={3} key={movie.id}>
         <MovieCard movie={movie} 
         action={(m) => <AddToFavoritesIcon movie={m} />}
         />
        </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PersonDetailsPage;
