

import { postAPI } from "../../utils/FetchData"
import {validRegister} from "../../utils/valid"
import { ALERT } from "../alert/alerts"
import { AUTH } from "./types"
export const login=(userlogin)=>async(dispatch)=>{

  try{
    dispatch({type:ALERT,payload:{loading:true}})
  const res=await postAPI("login",userlogin)
  // console.log(res)
  dispatch({

    type:AUTH,
    payload:{
      token:res.data.access_token,
      user:res.data.user
    }
  })
  dispatch({type:ALERT,payload:{success:res.data.msg}})
  }
  catch(err){
    dispatch({type:ALERT,payload:{errors:err.response.data.msg}})

  }

}


export const register=(userRegister)=>async(dispatch)=>{
  const check=validRegister(userRegister)
  if(check.errLength>0){
    return  dispatch({type:ALERT,payload:{errors:check.errMsg}})
  }

  try{
    dispatch({type:ALERT,payload:{loading:true}})

    const res=await postAPI('register',userRegister)
   console.log(res)

 
  dispatch({type:ALERT,payload:{success:res.data.msg}})
  }
  catch(err){
    dispatch({type:ALERT,payload:{errors:err.response.data.msg}})

  }

}