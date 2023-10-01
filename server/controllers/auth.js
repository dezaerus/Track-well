import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ msg: "Please fill all fields." });

    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail)
      return res.status(409).json({ msg: "Email already exists." });
    const duplicateUsername = await User.findOne({ username });
    if (duplicateUsername)
      return res.status(409).json({ msg: "Username already exists." });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    const userResponse = {
      username: savedUser.username,
      email: savedUser.email,
      ok: true,
    };

    res.status(201).json(userResponse);
  } catch (err) {
    res.status(500).json({ msg: err.message });
    console.log(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    const { username, _id } = user;
    res.status(200).json({ token, user: username, ok: true, id: _id });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err.message);
  }
};
