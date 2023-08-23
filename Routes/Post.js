import express from "express";
import postController from "../controllers/posts.js";

const postsRoutes = express.Router();

postsRoutes
  .get("/posts/", postController.findAll)
  .get("/post/:id", postController.findOne)
  .post("/post/new", postController.create)
  .delete("/post/delete/:id", postController.delete)
  .put("/post/update/:id", postController.findByIdAndUpdate);

export default postsRoutes;