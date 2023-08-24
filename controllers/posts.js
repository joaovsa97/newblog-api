import Post from "../models/Post.js";
import fs from "fs";
import jwt from "jsonwebtoken";

class postController {
  static findAll = async (req, res) => {
    try {
      const response = await Post.find()
        .populate("userId", ["username"])
        .sort({ createdAt: -1 });
      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };

  static findOne = async (req, res) => {
    try {
      const response = await Post.find({ _id: req.params.id }).populate(
        "userId",
        ["username"]
      );

      res.status(200).json(response);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };

  static create = async (req, res) => {
    try {
      const token = req.headers['authorization'];
      
      if (!token) return res.status(401).json("Usuário não autenticado");

      jwt.verify(token, "jwtsecurity", async (err, user) => {
        if (err) return res.status(403).json("token não é válido");

        const newPost = await Post.create({
          title: req.body.title,
          summary: req.body.summary,
          desc: req.body.desc,
          img: req.body.file,
          // category: req.body.category,
          userId: user.id,
        });
        res.status(201).send({ message: newPost });
      });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };

  static delete = async (req, res) => {
    try {
      await Post.deleteOne({ _id: req.params.id });

      res.status(200).send({ message: "Publicação deletada com sucesso!" });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };

  static findByIdAndUpdate = async (req, res) => {
    try {
      const filter = { _id: req.params.id };

      await Post.findOneAndUpdate(filter, {
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.file,
        category: req.body.category,
      });

      res.status(200).send({ message: "post updated" });
    } catch (err) {
      res.status(500).send({ message: err });
    }
  };
}

export default postController;
