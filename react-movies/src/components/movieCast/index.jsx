import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import { Avatar, Chip, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner";

const MovieCast = ({ movieId }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <Typography color="error">{error.message}</Typography>;

  const cast = data.cast.slice(0, 6); 


  return (
    <Stack direction="row" flexWrap="wrap">
      {cast.map((actor) => (
        <Chip
          key={actor.id}
          avatar={
            <Avatar
              src={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/default-avatar.png"
                }
            />
          }
          label={actor.name}
          onClick={() => navigate(`/people/${actor.id}`)} 
          clickable
          variant="outlined"
          color="primary"
        />
      ))}
    </Stack>
  );
};

export default MovieCast;
