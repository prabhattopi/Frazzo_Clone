import React, { useState } from "react"
import { useEffect } from "react";
const useGeoLocation=()=>{
    const [location,setLocation]=useState({
        loaded:false,
        coordinates:{lat:"",lng:""},



    });

    const onSuccess=location=>{
        setLocation({
            loaded:true,
            coordinates:{
                lat:location.coords.latitue,
                lng:location.coords.longitude
            }
        })
    }

  useEffect(()=>{
    if(!("geolocation" in navigator)){
         setLocation(state=>({
            ...state,
            loaded:true,
            error:{
                code:0,
                message:"Geolocation not supported"
            }

         }))
    }
    navigator.geolocation.getCurrentPosition(onSuccess,onError);

  },[])
    return location

}
export default useGeoLocation