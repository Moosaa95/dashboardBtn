import { style } from '@mui/system';
import React, {useState, useEffect, Fragment, useContext, useRef} from 'react'
import {useParams, Link, useNavigate } from "react-router-dom"
import {
  Box,
  Snackbar,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Form, Formik, Field, useFormik } from "formik";
import * as yup from "yup";
// import AuthContext from '../context/AuthContext'
import AuthContext from '../scenes/context/AuthContext';
import { LoadingButton } from "@mui/lab";

 
export const ResetPassword = ({setLoggedIn}) => {
  const [validUrl, setValidUrl] = useState(false)
  const [msg, setMsg] = useState("")
  const [fieldErrors, setFieldError] = useState({})
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const ref = useRef(null);
  const param = useParams()
  // const params = new URLSearchParams(window.location.search)
  const navigate = useNavigate()


  const { success, error,authTokens, clearError, clearSuccess } = useContext(AuthContext);

  if (!authTokens){
    setLoggedIn(false)
  }
  else{
    setLoggedIn(true)
    navigate("/")
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

//   console.log(param, 'lol', param.token, param.uuid64);

  // useEffect(() => {
  //   const verifyEmailUrl = async () => {
  //     // console.log('vferrtftyfty');
  //     try{
  //       const response = await fetch(`https://nest-srm.up.railway.app/auth/reset-password/${param.uuid64}/${param.token}/`, {
  //         method:"POST",
          
  //       })
  //       const data = await response.json()
  //       console.log('password log', data)
  //       if (response.ok){
  //         setValidUrl(true)
  //       }

  //     }catch(error){
  //       setValidUrl(false)
  //     }
  //   }
  //   verifyEmailUrl()
  // }, [param])
  useEffect(() =>{
   
    // }
    if (success) {
      setLoadingBtn(false);

    }
    else{
      setMsg(error)
      setOpen(true)
      setLoadingBtn(false);
    }
  }, [error])



  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoadingBtn(true);
    if (param){
      const response = await fetch(`https://nest-srm.up.railway.app/auth/reset-password/${param.uuid64}/${param.token}/password=${password}/`,
       {
        method:"GET",
        // body: JSON.stringify({
        //   password: e.password,
        //   uidb64:param.uuid64,
        //   token: param.token
        // })
        
      })
      const data = await response.json()
      console.log('password log', data)
      if (response.ok){
        setValidUrl(true)
      }

    }
  }


  

  return (
    <>
     <Box
      m="20px"
      display="flex"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="Column"
      backgroundColor="#000"
    >
       <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box mb="30px">
      <Typography
        variant="h2"
        color="#fff"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Password Reset
      </Typography>
      <Typography variant="h5" color="#eee">
        forgot password
      </Typography>
    </Box>
      </Box>
      <Snackbar
        
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        open={msg?open : false}
        onClose={handleClose}
        autoHideDuration={6000}
        message= {msg} 
        // key={'top_center'}
        // color="#000"
        />
      
      {/* <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        innerRef={ref}
        enableReinitialize={true}
        sx={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => ( */}
          <form onSubmit={e=>handleFormSubmit(e)}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
              backgroundColor="#000"
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
                type="password"
                label="Password"
                // onBlur={handleBlur}
                onChange={e=>setPassword(e.target.value)}
                value={password}
                name="password"
                // error={!!touched.password && !!errors.password}
                // helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                // onBlur={handleBlur}
                onChange={e=>setConfirmPassword(e.target.value)}
                value={confirmPassword}
                name="confirmPassword"
                // error={!!touched.confirmPassword && !!errors.confirmPassword}
                // helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
              </Box>
              
              
              
            </Box>
            <Box display="flex" width="100%" mr="20px" justifyContent="space-between" mt="20px">
            <LoadingButton
              loading={loadingBtn}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Submit
            </LoadingButton>
            </Box>
          </form>
        {/* )}
      </Formik> */}
    </Box>
    </>
  );
};



const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const checkoutSchema = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "please Create a Stronger Password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
const initialValues = {
  password: "",
  confirmPassword: "",
  // state : "",
  // city : ""
}