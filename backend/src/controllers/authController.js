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
const { generateActiveToken } = require("../config/generateToken");
const sendEmail = require("../config/sendMail");
const { sendSms } = require("../config/sendSMS");
const CLIENT_URL = `${process.env.BASE_URL}`;

exports.registerController = async (req, res) => {
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

exports.activeAccount = async (req, res) => {
  try {
    const { active_token } = req.body;
    const decode = jwt.verify(
      active_token,
      `${process.env.ACTIVE_TOKEN_SECRET}`
    );
    const { newuser } = decode;
    if(!newuser) return res.status(400).json({msg:"Invalid authentication"})
    const user = new User(newuser);
    await user.save();

    res.send({ msg: "Account is Activated" });
  } catch (err) {
    let errMsg;
    if(err.code===11000){
      errMsg=Object.keys(err.keyValue)[0]+" already exits"
    }
    else{
    console.log(err)
    let name=Object.keys(err.errors)[0]
    errMsg=err.errors[`${name}`].message
    }
    return res.status(500).json({ msg: errMsg });
  }
};
