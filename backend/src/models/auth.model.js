const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
  unique: true,
      lowercase: true,
      required: [true, "Please add your email"],
    },
    first: {
      type: String,
      trim: true,
      required: [true, "Please add your first name"],
      maxLength: [10, "Your first name is up to 10 chars long."]

    },
    last: {
      type: String,
      trim: true,
      required: [true, "Please add your last name"],
      maxLength: [10, "Your last name is up to 10 chars long."]
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
     
      required: [true, "Please add your password"],
    
    },
    salt: String,
    role: {
      type: String,
      default: "Normal",
      //We have more type(normal,admin...)
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
    type:{
      type:String,
      default:"register"

    }
  },
  { timestamps: true }
);

//virtual Password
// userSchema
//   .virtual("password")
//   .set(function (password) {
//     //set password note you must use normal funtion not arrow function

//     this.password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

// //methods

// userSchema.methods = {
//   //Generate Salt
//   makeSalt: function () {
//     return Math.round(new Date().valueOf() * Math.random()) + "";
//   },
//   //Encrypt Password
//   encryptPassword: function (password) {
//     if (!password) return;
//     try {
//       return crypto
//         .createHmac("shal", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },

//   //Compare password between plain get from user and hashed
//   authenticate: function (plainPassword) {
//     return this.encryptPassword(plainPassword) === this.hashed_password;
//   },
// };

module.exports = mongoose.model("User", userSchema);
