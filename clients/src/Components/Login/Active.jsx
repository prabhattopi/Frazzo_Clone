import React from 'react'
import { Link, useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import { postAPI } from '../../utils/FetchData'
import {showErrMsg,showSuccessMsg} from "../../Components/Alert/Alert"

const Active = () => {
    const {id}=useParams()
const [err,setErr]=useState("")
const [success,setSuccess]=useState("")

useEffect(()=>{
if(id){
    postAPI("active",{active_token:id})
    .then((res)=>setSuccess(res.data.msg))
    .catch((err)=>setErr(err.response.data.msg))

}

},[id])
  return (
<div>
<div style={{transform:"translateX(20%)",marginBottom:"50px"}}>
    <Link  to="/">Go To Home Page</Link>
    </div>
    {err&&showErrMsg(err)}
    {success && showSuccessMsg(success)}
   
   


</div>
  )
}

export default Active