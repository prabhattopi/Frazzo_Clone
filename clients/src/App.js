import React, { useState } from "react";
import "./App.css";
import { Routes, Route} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Checkout from "./Components/Checkout/Checkout";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Login/Login";
import Alert from "./Components/Alert/Alert";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from"react-redux"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const promise = loadStripe(
  "pk_test_51LnFjiSBiw6Me9peE81aB4PuPhVgGOY87Hk98o5mCODE2h6bDNUbZwrTPvoxh2PXJya9vNKfM3jXTxYkBtV0rccJ00JHO1doiL"
);


function App() {
  
  const {token} = useSelector((state) => state.user);
  const [open, setOpen] = useState(true);

  return (
  
    <div className="App">
      <Navbar />
     
      <Alert/>

      <div className="app_container_margin">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <>
                <h1>Need To Login First..!</h1>
                <Login open={true} setOpen={setOpen} />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <Elements stripe={promise}>
                <Checkout />
                {!token && <Login open={true} setOpen={setOpen} />}
              </Elements>
            }
          />

         
        </Routes>
      </div>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>

  );
}

export default App;
