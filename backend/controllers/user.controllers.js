import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import gentoken from "../utils/gentoken.js";

const cokkieOptions = {
  httpOnly: true,
};

export const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  //validations
  try {
    if (!username || !name || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const usernameexist = await User.findOne({ username });

    if (usernameexist) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const emailexists = await User.findOne({ email });
    if (emailexists) {
      return res.status(400).json({ message: "Email_id already exists" });
    }

    if (password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Password length shoud be greater than 6" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      name,
      password: hashedPassword,
      email,
    });

    // Generate JWT
    const token = gentoken(newUser._id);
    console.log(token);
    res.cookie("token", token, cokkieOptions);
    const userData = newUser.toObject();
    delete userData.password;
    res.status(201).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to register user" });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userexists = await User.findOne({ email });

    if (!userexists) {
      return res.status(404).json({ message: "User not found" });
    }

    const correctPassword = bcrypt.compareSync(password, userexists.password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = gentoken(userexists._id);
    console.log(token);
    res.cookie("token", token, cokkieOptions);

    const userData = userexists.toObject();
    delete userData.password;

    res.status(200).json({
      message: "Login Successful",
      User: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to Login user" }, error);
  }
};

export const getUser = (req, res) => {
  const userData = req.user.toObject();
  delete userData.password;
  res.send(userData);
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
};
