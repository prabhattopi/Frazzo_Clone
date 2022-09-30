import { AUTH, RESET } from "./types";

const initial = {
   msg:"",
   token:"",
    user:{}
  
};

export const userReducer = (state = initial, { type, payload }) => {
  switch (type) {
    case AUTH:{
      return {
        ...state,
        msg:payload.msg,
      token:payload.access_token,
        user:payload.user
      }
    }
      case RESET:{
        return {
          ...state,
          msg:"",
          token:"",
           user:{}

        }
      }
  
    default:
      return state;
  }
};
