import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Stack, Typography, Snackbar, TextField, Button } from "@mui/material";
import * as yup from "yup";
import { Form, Formik } from "formik";
import Header from "../../components/Header";
import React, { useState, useContext , useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Login.css";
import { useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";


const Login = ({setLoggedIn}) => {
  // const [email, setEmail] = useState("");
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [values, setValues] = useState({
    email: "",
    pass: "",
    showPass: false,
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");
   


  
  const { loginUser, user,success, error,authTokens, clearSuccess, clearError } = useContext(AuthContext);

  if (!authTokens){
    setLoggedIn(false)
  }
  else{
    setLoggedIn(true)
  }
  // const handleSubmit = () => {
  //   // console.log(email, password, name);
  // }
  // // console.log(user, 'jjj user', authTokens);

  useEffect(()=>{
    if(success){
      setMsg(success)
      setOpen(true)
      setLoadingBtn(false);
      setInterval(() => {
        clearSuccess()
      }, 6000);
    }
    else{
      setMsg(error)
      setOpen(true)
      setLoadingBtn(false);
      // setInterval(() => {
      //   clearError()
      // }, 6000)
    }
  }, [error])

  const handleClose = () => {
    setOpen(false);
  };


  const handlePassVisible = () => {
    setValues({
      ...values,
      showPass: !values.showPass,
    });
  };
    const handleFormSubmit = (values, actions) => {
      // // console.log(values, "ation valeus");
      // values.preventDefault()
      setLoadingBtn(true);
      [values].map((value) => {
        // console.log(values, "jury values");
        loginUser({
          password: value.password,
          username: value.adminUsername,
        });
      });
      // actions.resetForm();
      // // console.log(values);
    };
  
    //  // console.log('country id', statesId);
    // // console.log(ref.current.values, 'lopghjnjk');
  
    return (
      <Box
        m="20px"
        display="flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="Column"
              backgroundColor="#000"
              height="100%"
        // mt="200px"
      >
         
          <Snackbar
          
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
          open={msg?open : false}
          onClose={handleClose}
          autoHideDuration={6000}
          message={msg}
          key={'top_center'}
          color="#000"
          />
       
        <Header title="Login" subtitle="Login an Account" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          enableReinitialize={true}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="550px"
                gap="30px"
                // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <Box display="flex" mr="15px" justifyContent="space-between" width="100%" gap="20px">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.adminUsername}
                  name="adminUsername"
                  error={!!touched.adminUsername && !!errors.adminUsername}
                  helperText={touched.adminUsername && errors.adminUsername}
                  sx={{ gridColumn: "span 2" }}
                />
                </Box>
                
                <Box display="flex" mr="15px" justifyContent="space-between" width="100%" gap="20px">
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
                </Box>
                
              </Box>
              <Box display="flex" flexDirection="column" width="100%" mr="20px" justifyContent="space-between" mt="20px">
              <LoadingButton
              loading={loadingBtn}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Login
            </LoadingButton>
                <Typography 
                color="#fff"
                alignItems="center"

                >
                     dont have an Account? 
                     <Link to="/register">
                   <Typography 
                   alignItems="center"
                   mb="20px"
                   >
                     Sign up
                   </Typography>
                </Link>
                  </Typography>
                
                <Link to="/forgot-password">
                  <Typography>
                    forgot password?
                  </Typography>
                </Link>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
  );
};

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const checkoutSchema = yup.object().shape({
  adminUsername: yup.string().required("required"),
  password: yup
    .string()
    .min(5)
    .required("Required"),
});
const initialValues = {
  adminUsername: "",
  password: "",
};

export default Login;
