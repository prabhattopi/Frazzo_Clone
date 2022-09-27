const User=require("../models/auth.model")
const expressJwt=require("express-jwt")
const _ =require("lodash")
const {OAuth2Client}=require("google-auth-library")
// const fetch=require("node-fetch")
const {validationResult}=require("express-validator")
const jwt =require("jsonwebtoken")
const { errorHandler } = require("../middlewares/errorhandlermiddleware")

const sgMail=require("@sendgrid/mail")
sgMail.setApiKey(process.env.MIAL_KEY)











exports.registerController=(req,res)=>{
    const {first,last,email,password,phone,address}=req.body
   const errors=validationResult(req)
   if(!errors.isEmpty()){
    const firstError=errors.array().map(error=>error.msg)[0]
    return res.status(422).json({
        error:firstError
    })
   }
   else{
    User.findOne({
        email
    })
    .exec((err,user)=>{
        //if User is Exist

        if(user){
            return res.status(400).json({
                error:"Email is taken"
            })
        }

    }
    )
    //Generating Token
    const token=jwt.sign({
        first,
        last,
        email,
        password,
        phone
    },
    process.env.JWT_ACCOUNT_ACTIVATION,
    {
        expiresIn:"15m"
    }
    )

    const emailData={
        from:process.env.EMIAL_FORM,
        to:to,
        subject:"Account is Activattion Link Thanks for Registering",
        html:`
        <h1>Please Click the link To acivate</h1>
        <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
        <hr/>
        <p>This email contain sensitive info</p>
        <p>${process.env.CLIENT_URL}</p>
        `

    }
   }

}