import { AUTH } from "./types";

const initial = {
 
    token:"",
    user:{}
  
};

export const userReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case AUTH:{
      return {
        ...state,
        token:payload.token,
        user:payload.user
      }
    }
      
  
    default:
      return state;
  }
};
