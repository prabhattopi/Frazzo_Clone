const User = require("../models/auth.model");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
  errorHandler,
  isEmail,
  isPhone,
} = require("../middlewares/errorhandlermiddleware");
const {
  generateActiveToken,
  generateAccesssToken,
  generateRefreshToken,
} = require("../config/generateToken");
const sendEmail = require("../config/sendMail");
const { sendSms } = require("../config/sendSMS");
const CLIENT_URL = `${process.env.BASE_URL}`;

const registerController = async (req, res) => {
  try {
    const { first, last, email, phone, address, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User Already exist" });
    } else {
      const passwordHashed = await bcrypt.hash(password, 12);
      const newuser = {
        first,
        last,
        email,
        phone,
        address,

        password: passwordHashed,
      };
      const active_token = generateActiveToken({ newuser });
      const url = `${CLIENT_URL}/active/${active_token}`;
      if (isEmail(email)) {
        sendEmail(email, url, "Verify your email address");
        return res.json({
          msg: "Success Please Check your Email",
        });
      } else if (isPhone(phone)) {
        sendSms(phone, url, "verify your Phone Number");
        return res.json({ msg: "Success!Please check your phne" });
      }
    }
  } catch (error) {
    res.status(500);
    throw new Error("Please add all fields");
  }
};

const activeAccount = async (req, res) => {
  try {
    const { active_token } = req.body;
    const decode = jwt.verify(
      active_token,
      `${process.env.ACTIVE_TOKEN_SECRET}`
    );
    const { newuser } = decode;
    if (!newuser)
      return res.status(400).json({ msg: "Invalid authentication" });
    const user = await User.findOne({ email: newuser.email });
    if (user) return res.status(400).json({ msg: "Users already exits" });
    const new_user = new User(newuser);
    await new_user.save();

    res.send({ msg: "Account is Activated" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: `Account doesn't exists` });
    loginUser(user, password, res);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const loginUser = async (user, password, res) => {
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(500).json({ msg: "Password is incorrect" });

  const access_token = generateAccesssToken({ id: user._id });

  const refresh_token = generateRefreshToken({ id: user._id }, res);

  // await Users.findOneAndUpdate({_id: user._id}, {
  //   rf_token:refresh_token
  // })
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return res.json({
    msg: "Login Success!",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

const logout = async (req, res) => {
  try {
    res.clearCookie(`refreshtoken`, { path: `/api/refresh_token` });
    return res.json({ msg: "Logged out!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) {
      return res.status(400).json({ msg: "Please Login now!" });
    }
    const decoded = jwt.verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`);
    if (!decoded.id) return res.status(400).json({ msg: "Please Login now!" });
    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return res.status(400).json({ msg: "This account does not exist." });

    const access_token = generateAccesssToken({ id: user._id });
    res.json({ 
    
      access_token,
      user
     });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  login,
  registerController,
  activeAccount,
  logout,
  refreshToken,
};
