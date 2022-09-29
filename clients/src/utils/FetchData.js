

import axios from "axios"

export const postAPI=async(url,post,token)=>{
    const res=await axios.post(`/api/${url}`,post,{
        headers:{Authorization:token}

    })

    return res;
}