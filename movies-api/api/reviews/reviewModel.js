import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema(
    { movieId: { type: Number, required: true},
      movieTitle: { type: String, required: true },
      rating: { type: Number, required: true, min: 0, max: 10},
      review: { type: String, required: true },
      username: { type: String, required: true }, },
    { timestamps : { createdAt: "createdAt", updateAt: false } }
);

export default mongoose.model("Review", reviewSchema);