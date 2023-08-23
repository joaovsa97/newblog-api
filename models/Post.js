import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    id: { type: String },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    desc: { type: String, required: true },
    // category: { type: String, required: true },
    img: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref:'users', required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("posts", postSchema);

export default Post;
