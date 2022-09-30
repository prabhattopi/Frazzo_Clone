import React,{useEffect} from "react"
import { useSelector } from 'react-redux'


import Loading from './Loading'
import Toast from './Toast'

export const Alert = () => {
  const { alert } = useSelector((state) => state)
  // console.log(alert)


  return (
    <div>
      {alert.loading && <Loading/> }

      { 
        alert.errors && 
        <Toast 
        title="Errors"
        body={alert.errors}
        bgColor="bg-danger"
        />
      }

      { 
        alert.success && 
        <Toast 
        title="Success"
        body={alert.success}
        bgColor="bg-success"
        />
      }
    </div>
  )
}

export const showErrMsg=(msg)=>{
  return <div className="errMsg">{msg}</div>

}

export const showSuccessMsg=(msg)=>{
  return <div className="successMsg">{msg}</div>

}