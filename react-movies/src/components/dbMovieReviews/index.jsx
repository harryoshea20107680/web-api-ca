import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Spinner from "../spinner";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/authContext";
import { getDbMovieReviews, addReview } from "../../api/tmdb-api"; 


export default function DbMovieReviews({ movie }) {
  const auth = useContext(AuthContext);
  const [rating, setRating] = useState(8);
  const [text, setText] = useState("");

  const { data, error, isPending, isError, refetch } = useQuery({
    queryKey: ["db-reviews", { id: movie.id }],
    queryFn: getDbMovieReviews,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const reviews = data; 

  const handleSubmit = async () => {
    await addReview({
      movieId: Number(movie.id),
      movieTitle: movie.title,
      rating: Number(rating),
      review: text,
      username: auth.userName,
    });

    setText("");
    refetch(); 
  };

  return (
    <>
      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        Reviews from our app
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="db reviews table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell>Review</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>No reviews yet.</TableCell>
              </TableRow>
            ) : (
              reviews.map((r) => (
                <TableRow key={r._id}>
                  <TableCell component="th" scope="row">
                    {r.username}
                  </TableCell>
                  <TableCell align="center">{r.rating}/10</TableCell>
                  <TableCell>{r.review}</TableCell>
                  <TableCell align="right">
                    {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {auth.isAuthenticated && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1">Add a review</Typography>

          <TextField
            label="Rating (0-10)"
            type="number"
            inputProps={{ min: 0, max: 10 }}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            sx={{ mr: 2, mt: 1 }}
          />

          <TextField
            label="Review"
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            minRows={2}
            fullWidth
            sx={{ mt: 1, mb: 1 }}
          />

          <Button variant="contained" onClick={handleSubmit} disabled={!text.trim()}>
            Submit Review
          </Button>
        </Paper>
      )}
    </>
  );
}
