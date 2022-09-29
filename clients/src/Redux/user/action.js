
import { postAPI } from "../../utils/FetchData"
import { ALERT } from "../alert/alerts"
import { AUTH } from "./types"
export const login=(userlogin)=>async(dispatch)=>{

  try{
    dispatch({type:ALERT,payload:{loading:true}})
  const res=await postAPI("login",userlogin)
  console.log(res)
  dispatch({

    type:AUTH,
    payload:{
      token:res.data.access_token,
      user:res.data.user
    }
  })
  dispatch({type:ALERT,payload:{success:"Login Success"}})
  }
  catch(err){
    dispatch({type:ALERT,payload:{errors:err.response.data.msg}})

  }

}