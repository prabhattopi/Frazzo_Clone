import { postAPI, getAPI } from "../../utils/FetchData";
import { validRegister } from "../../utils/valid";
import { ALERT } from "../alert/alerts";
import { AUTH, RESET } from "./types";
export const login = (userlogin) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("login", userlogin);
    // console.log(res)
    dispatch({
      type: AUTH,
      payload: res.data,
    });
    dispatch({ type: ALERT, payload: { success: res.data.msg } });
    localStorage.setItem("logged", "prabhat");
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const register = (userRegister) => async (dispatch) => {
  const check = validRegister(userRegister);
  if (check.errLength > 0) {
    return dispatch({ type: ALERT, payload: { errors: check.errMsg } });
  }

  try {
    dispatch({ type: ALERT, payload: { loading: true } });

    const res = await postAPI("register", userRegister);
    console.log(res);

    dispatch({ type: ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const refreshToken = () => async (dispatch) => {
  const logged = localStorage.getItem("logged");
  if (logged !== "prabhat") return;

  try {
    // dispatch({ type: ALERT, payload: { loading: true } });
    const res = await getAPI("refresh_token");
    console.log(res);
    dispatch({
      type: AUTH,
      payload: res.data,
    });

    // dispatch({ type: ALERT, payload: { success: res.data.msg } });
    // localStorage.setItem("logged","true")
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    
    localStorage.removeItem("logged");
    await getAPI("logout")
  
    dispatch({ type: ALERT, payload: { loading: false } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } });
  }
};

export const reset=()=>(dispatch)=>{
  dispatch({
    type:RESET,
    payload:{}
  })
}
