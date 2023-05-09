const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("Welcome to home");
});

UserRouter.post("/register", async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    if(name==""||email==""||password==""||age==""){
      res.send({msg: "All fields are required"})
      return;
    }
    const existing_user = await UserModel.findOne({ email });

    if (existing_user) {
      res.status(409).json({ msg: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      age,
    });

    await user.save();

    res.status(200).json({ msg: "New user has been registered" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(401).json({ msg: "Incorrect email or password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ msg: "Incorrect email or password" });
      return;
    }
    if(email==""||password==""){
      res.send({msg: "All fields are required"})
      return;
    }

    const token = jwt.sign(
      { autherID: user._id, auther: user.name },
      "masai"
    );

    res.status(200).json({ msg: "Login successful", token: token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { UserRouter };
