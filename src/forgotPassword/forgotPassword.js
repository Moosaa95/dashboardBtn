import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Snackbar, Stack, InputLabel, Select,  MenuItem  } from "@mui/material";
import { Form } from "formik";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../scenes/context/AuthContext";



const ForgotPassword = () => {
    const [username, setUsername] = useState("");
    
    
  
  
    const { forgotPassword } = useContext(AuthContext);
  console.log('hello ForgotPasswordo');
  
  
  return (
    <div className="container">
    {/* <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message={errorMessage}
      key={"top_center"}
    /> */}
    
    <div className="content-overlay" />
    <div className="header-navbar-shadow" />
    <div className="content-wrapper">
      <div className="content-header row"></div>
      <div className="content-body">
        <div className="auth-wrapper auth-cover">
          <div className="auth-inner row m-0">
            {/* Brand logo*/}
            <a className="brand-logo" href="index-2.html">
              <img src="./images/logo/logo.png" alt="png" height={52} />
              <h2 className="brand-text text-primary ms-1" />
            </a>
            {/* /Brand logo*/}
            {/* Register*/}
            <div className="row">
              <div className="col-lg-6 align-items-center auth-bg px-2 p-lg-5 mx-auto my-auto">
                <h2 className="card-title fw-bold mb-1">Forgot Password Page</h2>
                <p className="card-text mb-2">
                  Forgot your password?
                </p>
                <form
                  className="auth-register-form mt-2"
                  action=""
                  method="POST"
                  onSubmit={forgotPassword}
                >
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-adminFirstName"
                        >
                          Enter username or email
                        </label>
                        <input
                          className="form-control"
                          id="userName"
                          type="text"
                          name="usernameoremail"
                          placeholder="Enter name"
                          aria-describedby="adminFirstName"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) =>
                            setUsername(e.target.value)
                          }
                          value={username}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button className="btn btn-primary w-100" tabIndex={5}>
                    Forgot Password
                  </button>
                 
                </form>
              </div>
              {/* <div className="d-none d-lg-flex col-lg-6 align-items-center p-5">
                <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                  <img
                    className="img-fluid"
                    src="./images/banner/auth-image.png"
                    alt="Register V2"
                  />
                </div>
              </div> */}
            </div>
            {/* /Register*/}
            {/* Left Text*/}
            {/* /Left Text*/}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ForgotPassword;
