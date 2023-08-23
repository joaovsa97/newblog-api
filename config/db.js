import mongoose from "mongoose";
import dotenv from "dotenv/config"

mongoose.connect(process.env.API_URL)

const dbConnect = mongoose.connection

export default dbConnect