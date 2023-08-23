import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import routes from "./Routes/index.js";
import multer from "multer";
import fs from "fs";

dbConnect.on("error", console.log.bind(console, "Erro de conexão: "));
dbConnect.once("open", () => {
  console.log("Conectado ao banco com sucesso");
});

const upload = multer({ dest: "./uploads" });

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options = (cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
});

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("/uploads"));

routes(app);

app.post("/upload", upload.single("file"), (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  res.status(200).send(newPath);
});

app.post("/deletefile", (req, res) => {
  fs.unlink(req.body.file, (err) => {
    if (err) {
      console.error(err);
    }
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Conectado ao BackEnd na porta ${port}`);
});
