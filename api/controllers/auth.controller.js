const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    !confirmpassword ||
    username === "" ||
    password === "" ||
    email === "" ||
    confirmpassword === ""
  ) {
    return res.status(400).json({ message: "Every field must be filled" });
  }
  if (confirmpassword !== password) {
    return res
      .status(400)
      .json({ message: "Password and Confirm password should match" });
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character"
    });
  }
  hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(200).json({ message: "signup successfull" });
  } catch (error) {
    res.status(500).json({ message: "error while register", error });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ message: "All fields should be filled" });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { id: validUser._id, username: validUser.username },
      process.env.SECRET_KEY
    );

    const { password: _, ...rest } = validUser.toObject();

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure:true,
        sameSite:'None',
      })
      .json(rest);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "some error in login", error });
  }
};

const getProfile = async (req, res) => {
  const { access_token } = req.cookies;
  jwt.verify(access_token, process.env.SECRET_KEY, {}, (err, info) => {
    if (err) {
      return res.status(400).json({ message: "jwt not provided" });
    }
    res.json(info);
  });
};
const logout = (req, res) => {
  
  res
    .clearCookie("access_token", { path: "/" })
    .json({ message: "Logged out successfully" });
};

module.exports = { register, login, getProfile, logout };
