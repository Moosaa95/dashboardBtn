import { style } from '@mui/system';
import React, {useState, useEffect, Fragment, useContext} from 'react'
import {useParams, Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'
import { Box, Button, Typography } from "@mui/material";
import styles from "./style.module.css";
import successful from "./assets/approved-icon-profile-verification-accept-badge-vector-26934469.jpg"

 
export const EmailVerify = ({setLoggedIn}) => {
  const [validUrl, setValidUrl] = useState(false)

  const param = useParams()
  // const params = new URLSearchParams(window.location.search)


  const { loginUser, user,success, error,authTokens } = useContext(AuthContext);

  if (!authTokens){
    setLoggedIn(false)
  }
  else{
    setLoggedIn(true)
  }

  // console.log(param, 'lol', param.token, param.uuid64);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      // console.log('vferrtftyfty');
      try{
        const response = await fetch(`${process.env.REACT_APP_BASE_API_KEY}/auth/email-verify/?token=${param.token}&uidb64=${param.uuid64}`, {
          method:"GET",
          
        })
        const data = await response.json()
        if (response.ok){
          setValidUrl(true)
        }

      }catch(error){
        setValidUrl(false)
      }
    }
    verifyEmailUrl()
  }, [param])

  return (
    <>
    <Fragment>
      <Box sx={{ width: "600px", backgroundColor: "#fff", margin: "auto", padding: "50px", boxShadow: "rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem" }}>
          {validUrl ? (
            <div>
              {/* <img src={successful} alt="success" height="50%" width="50%" className='success-img' /> */}
              <h1 sx={{ color: "#000" }}>Email Verified successfully</h1>
              <Link to="/login">
                <Button color="secondary" variant="contained" sx={{ padding: "10px 20px", }}>Login</Button>
              </Link>
            </div>
          ):(
            <Typography sx={{ color: "#000" }}>404 Not Found</Typography>
          )
        }
      </Box>
    </Fragment>
    </>
  )
}
