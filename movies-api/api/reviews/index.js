import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from "./reviewModel";
import authenticate from '../../authenticate';

const router = express.Router();

// get reviews for a movie
router.get('/movie/:movieId', asyncHandler(async (req, res) => {
    const movieId = Number (req.params.movieId);
    const reviews = await Review.find({ movieId }).sort({createdAt: -1});
    res.status(200).json(reviews);
}));

// get reviews for a user
router.get('/user/:username', authenticate, asyncHandler(async (req, res) => {
    const { username } =req.params;
    const reviews = await Review.find({ username }).sort({ createdAt: -1});
    res.status(200).json(reviews);
}));

// post a review
router.post('/', authenticate, asyncHandler(async (req, res) => {
    const { movieId, movieTitle, rating, review, username } = req.body;
    if( movieId === undefined || !movieTitle || rating === undefined || !review || !username)
    { return res.status(400).json({ success: false, msg: "Field Missing"});}
    const created = await Review.create({ movieId: Number(movieId), movieTitle, rating: Number(rating), review, username, });
    res.status(201).json(created);
}));

export default router;