import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import routes from "./Routes/index.js";
import dotenv from "dotenv/config";

dbConnect.on("error", console.log.bind(console, "Erro de conexão: "));
dbConnect.once("open", () => {
  console.log("Conectado ao banco com sucesso");
});

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options = (cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
});

app.use(cors(options));
app.use(express.json());
app.use(cookieParser());

routes(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Conectado ao BackEnd na porta ${port}`);
});
