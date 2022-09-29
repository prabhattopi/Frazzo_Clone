const jwt=require("jsonwebtoken")

exports.generateActiveToken=(payload)=>{
    return jwt.sign(payload,`${process.env.ACTIVE_TOKEN_SECRET}`,{expiresIn:"5m"})
}


exports.generateAccesssToken=(payload)=>{
    return jwt.sign(payload,`${process.env.ACCESS_TOKEN_SECRET}`,{expiresIn:"15m"})
}



exports.generateRefreshToken=(payload)=>{
    return jwt.sign(payload,`${process.env.REFRESH_TOKEN_SECRET}`,{expiresIn:"30d"})
}