import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

class authController {
  static register = async (req, res) => {
    try {
      const userName = req.body.username;
      const Email = req.body.email;
      const Password = req.body.password;

      const userExist = await User.findOne({ email: Email });

      if (userExist) return res.status(409).json("User already exists!");
      else {
        const hashedPassword = await hashPassword(Password);
        const objUser = await User.create({
          username: userName,
          email: Email,
          password: hashedPassword,
        });
        res.status(201).send("Usuário cadastrado com sucesso");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

  static login = async (req, res) => {
    try {
      const Email = req.body.email;
      const Password = req.body.password;

      const user = await User.findOne({ email: Email });
      if (!user) return res.status(500).send("Usuário não cadastrado");
      else {
        const matchPassword = await comparePassword(Password, user.password);

        if (!matchPassword) return res.status(500).send("Senha incorreta");
        else {
          const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            "jwtsecurity",
            { expiresIn: "8h" }
          );

          const objUser = {
            id: user._id,
            username: user.username,
            email: user.email,
            token: token,
          };

          res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(objUser);
        }
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  };
}

export default authController;
