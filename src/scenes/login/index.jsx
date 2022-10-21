import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { Form } from "formik";
import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Login.css";

const Login = ({loggedIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    email: "",
    pass: "",
    showPass: false,
  });
  

  
  const { loginUser, user, authTokens } = useContext(AuthContext);

  if (authTokens){
    loggedIn = true
  }
  // const handleSubmit = () => {
  //   console.log(email, password, name);
  // }
  // console.log(user, 'jjj user', authTokens);


  const handlePassVisible = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };
  return (
    <div
      className="Auth-form-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <form className="Auth-form" onSubmit={loginUser}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
         <Link
         to="/forgot-password"
         >
         <p className="forgot-password text-right mt-2">
            Forgot <a href="#">password?</a>
          </p>
         </Link>

        </div>
      </form>
      <Link to='/register'
      style={{
        cursor:'pointer'
      }}
      >
        <span style={{
          cursor:'pointer'
        }}>&nbsp;Create an account</span>

      </Link>
      {/* <Typography>
        <Navigate
        
        >

      <span style={{
        cursor:'pointer'
      }}>&nbsp;Create an account</span>
      </Navigate>
      </Typography> */}
    </div>
  );
};

export default Login;
