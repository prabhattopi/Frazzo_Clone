

const validRegister=async function(req,res,next){
    const {first,email,last,password}=req.body
    const errors=[]
    if(!first||!last){
       errors.push("Please add your name.")

    }
    else if((first+last).length>20){
       errors.push("Your name is up to chars long")

    }

    if(!email){
      errors.push("Please add your email or Phone no.")

    }
    else if(!isEmail(email)&&!isPhone(phone)){
   errors.push("Email or Phone is not valid")

    }

    if(password.length<6){
     errors.push("Password length must be greater than equal to 6")
    }
 if(errors.length>0) return res.status(400).json({msg:errors})


    next();
 
   
    

}

const isPhone=(phone)=>{
    const re=/^[+]/g
    return re.test(phone)
}




const isEmail=(email)=>{
              
    // Regular Expression (Not accepts second @ symbol
    // before the @gmail.com and accepts everything else)
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
    // Converting the email to lowercase
    return regexp.test(String(email).toLowerCase());
}
module.exports={validRegister,isEmail,isPhone}