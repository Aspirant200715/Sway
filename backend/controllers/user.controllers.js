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

export const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const userData = await User.findOne({ username }).select("-password");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User Details found", data: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const followUser = async (req, res) => {
  try {
    //id same as logged in user
    //the user cannot follow themselves
    //if you already follow -> unfollow
    //if not following then unfollow
    const currentUserid = req.user._id;
    const targetUserid = req.params.id;
    if (currentUserid.toString() === targetUserid.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById({ currentUserid });
    const targetUser = await User.findById({ targetUserid });

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFollowing = targetUser.followers.some((id)=>
    id.toString()===currentUserid.toString());

    if(alreadyFollowing){
      return res.status(409).json({message:"You are already following user"})
    }

    await User.findByIdAndUpdate(currentUserid,{
      $addToSet : {followings : targetUserid}
    })

    await User.findByIdAndUpdate(targetUserid,{
      $addToSet : {followers : currentUserid}
    })


    res.status(201).json({message:"User Followed"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
