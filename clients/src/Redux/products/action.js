import { ALERT } from "../alert/alerts";
import { API_URL } from "../../utils/config";
import axios from "axios";

//Action Types
export const PROD_LOADING = "PROD_LOADING";

export const PROD_ERROR = "PROD_ERROR";

export const ADD_ALL_PRODUCTS = "ADD_ALL_PRODUCTS";

// Action Creators

export const setProdLoading = (payload) => {
  return {
    type: PROD_LOADING,
    payload: payload,
  };
};

export const setProdError = (err) => {
  return {
    type: PROD_ERROR,
    payload: err,
  };
};

export const setAllProducts = (data) => {
  return {
    type: ADD_ALL_PRODUCTS,
    payload: data,
  };
};

// this is gonna action creator which return a function which will have access to dispath function

export const getProducts =() =>async(dispatch) => {

  try{
    dispatch({ type: ALERT, payload: { loading: true } });

    let res=await axios.get(`${API_URL}/fraazo`)
      
     
        dispatch(setAllProducts(res.data))
        dispatch({ type: ALERT, payload: { loading:false } });
  }
  catch(err){
    dispatch(setProdError(err))
  }
  
    
      
   
};
