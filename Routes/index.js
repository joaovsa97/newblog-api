import express from "express";
// import usersRoutes from './Users.js'
import postsRoutes from './Post.js'
import authRoutes from "./Auth.js";

const routes = (app) => {
  app.use(
    express.json(),
    // usersRoutes,
    postsRoutes,
    authRoutes,
  );
};

export default routes;
