import express from "express";
const port = process.env.PORT || 8000;
import "../config/connection.js";
import { User } from "../models/user_modle.js";
import bcryptjs from "bcryptjs";

const app = express();
const router = express.Router();

app.use(express.json());

app.get("/users", (req, res) => {
  res.send("keshav");
});

// new user registration process
app.post("/user-registration", (req, res) => {
  const newUser = new User(req.body);
  newUser
    .save()
    .then((ack) => {
      res
        .status(200)
        .send({ message: "User registered successfully", response: 1 });
    })
    .catch((error) => {
      res.status(400).send({ message: error, response: 0 });
    });
});

app.post("/user-login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const keeplogged_in = req.body.keeplogged_in;

  User.findOne({ username: username })
    .then((data) => {
      try {
        let savedPassword = data.password;
        const matchPass = async () => {
          const Matched = await bcryptjs.compare(password, savedPassword);
          if (Matched) {
            res.cookie("Auth", savedPassword, [{ maxAge: 10000 }]);
            res.send({ message: "User logged in successfully", response: 1 });
          } else
            res.send({ message: "Username or password invalid", response: 0 });
        };
        matchPass();
      } catch {
        res.send({ message: "User does not exist", response: 0 });
      }
    })
    .catch((error) => {
      res.status(400).send({ message: "Internal server error", response: 0 });
    });
});

app.post("/availible-username", (req, res) => {
  const username = req.body.username;
  try {
    User.countDocuments({ username: username })
      .then((data) => {
        try {
          console.log(data);
          if (data === 0) {
            res.send({ message: "Username is availible", response: 1 });
          } else res.send({ message: "Username not availible", response: 0 });
        } catch {
          // res.send({ message: "User does not exist", response: 0 });
        }
      })
      .catch((error) => {
        res.status(400).send({ message: "Internal server error", response: 0 });
      });
  } catch (error) {}
});

app.listen(port);
