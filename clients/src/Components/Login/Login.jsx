import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../styles/auth.css";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";

import {
login, register,
} from "../../Redux/user/action";

import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  width: 420,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  outline: 0,
  boxShadow: 24,
  p: 6,
  borderRadius: "20px",
};

export default function Login({ open, setOpen }) {
  
  const handleClose = () => setOpen(false);
  const [typePass, setTypePass] = useState(false);

  const [userData, setUserData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [signupForm, showSignupForm] = useState(false);

  const handleLoginForm = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleLogin = (loginData) => {
    dispatch(login(loginData));
    setLoginData({
      email: "", password: ""
    });
  
  handleClose()

   
 
  };
  const handleSignup = (userData) => {
    
     dispatch(register(userData))

    setUserData({
      first: "",
      last: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    });
    handleClose()
  };

  const handleUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Welcome to Fraazo!
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p">
            Sign In to track your Order and More.
          </Typography>
          {!signupForm ? (
            <>
              <TextField
                label="Enter your Email"
                id="standard-size-normal"
                variant="standard"
                color="success"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginForm}
                sx={{ mt: 4, width: "100%" }}
              />
              <TextField
                label="Enter your Password"
                id="standard-size-normal"
                variant="standard"
                color="success"
                name="password"
                value={loginData.password}
                type={typePass ? "text" : "password"}
                onChange={handleLoginForm}
                sx={{ mt: 3, width: "100%" }}
              />
              <small
                className="pass"
                style={{ cursor: "pointer" }}
                onClick={() => setTypePass(!typePass)}
              >
                {typePass ? "Hide" : "Show"}
              </small>
              <br />
              <small
                className="row my-2 text-primary"
                style={{ cursor: "pointer" }}
              >
                <Link to="/forgot_password" className="col-6">
                  Forgot password?
                </Link>
              </small>
            </>
          ) : (
            <>
              <TextField
                label="Enter First Name"
                id="standard-size-normal"
                variant="standard"
                color="success"
                name="first"
                value={userData.first}
                onChange={handleUserData}
                sx={{ mt: 4, width: "100%" }}
              />
              <TextField
                label="Enter Last Name"
                id="standard-size-normal"
                variant="standard"
                color="success"
                value={userData.last}
                name="last"
                onChange={handleUserData}
                sx={{ mt: 3, width: "100%" }}
              />
              <TextField
                label="Enter your Email"
                id="standard-size-normal"
                variant="standard"
                color="success"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleUserData}
                sx={{ mt: 3, width: "100%" }}
              />
              <TextField
                label="Enter your Password"
                id="standard-size-normal"
                variant="standard"
                color="success"
                name="password"
                type="password"
                value={userData.password}
                onChange={handleUserData}
                sx={{ mt: 3, width: "100%" }}
              />
              <TextField
                label="Enter your Phone"
                id="standard-size-normal"
                variant="standard"
                color="success"
                name="phone"
                value={userData.phone}
                onChange={handleUserData}
                sx={{ mt: 3, width: "100%" }}
              />
              <TextField
                label="Enter your Address"
                id="standard-size-normal"
                variant="standard"
                color="success"
                name="address"
                value={userData.address}
                onChange={handleUserData}
                sx={{ mt: 3, width: "100%" }}
              />
            </>
          )}
          <Box
            sx={{ mt: 2, cursor: "pointer" }}
            onClick={() => showSignupForm(!signupForm)}
          >
            <Typography
              id="modal-modal-title"
              variant="p"
              color="gray.400"
              component="p"
            >
              {!signupForm
                ? (<>New to Fraazo.! click here <span style={{color:"red"}}>Register</span></> )
                : (<>Already Have Account.! click here for <span style={{color:"red"}}>SignIn</span></>)}
            </Typography>
          </Box>
          <div style={{ textAlign: "center", mt: 2 }}>
            {signupForm ? (
              <Button
                variant="contained"
                color="success"
                sx={{
                  mt: 3,
                  width: "200px",
                  borderRadius: "50px",
                  pt: 2,
                  pb: 2,
                }}
                disabled={(userData.email && userData.password && userData.address && userData.phone && userData.first &&userData.last) ? false : true}
                onClick={() => handleSignup(userData)}
              >
                Create Account
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                disabled={(loginData.email && loginData.password) ? false : true}
                sx={{
                  mt: 3,
                  width: "200px",
                  borderRadius: "50px",
                  pt: 2,
                  pb: 2,
                }}
                onClick={() => handleLogin(loginData)}
              >
                LOGIN
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
