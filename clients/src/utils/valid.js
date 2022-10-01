


export const validRegister=(data)=>{
    const {first,email,phone,last,password}=data
    const errors=[]
    if(!first||!last){
        errors.push("Please add your name.")
 
     }
     else if((first+last).length>20){
        errors.push("Your fullName is up to 20 chars long")
 
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
  
     return {
        errMsg:errors,
        errLength:errors.length
     }
 
 


}


const isPhone=(phone)=>{
    const re=/^[+]/g
    return re.test(phone)
}




const isEmail=(email)=>{
              
    // Regular Expression (Not accepts second @ symbol
    // before the @gmail.com and accepts everything else)
    var regexp =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      
    // Converting the email to lowercase
    return regexp.test(String(email).toLowerCase());
}