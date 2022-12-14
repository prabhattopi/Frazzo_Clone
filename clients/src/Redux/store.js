//User store

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { productReducer } from "./products/reducer";
import { userReducer } from "./user/reducer";
import { cartReducer } from "./cart/reducer";
import { alertReducer } from "./alert/alertReducer";

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  cart: cartReducer,
  alert:alertReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

// store.subscribe(() => console.log(store.getState()));
