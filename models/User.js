import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type: String},
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    img: {type: String, require: true},
})

const User = mongoose.model("users", userSchema)

export default User