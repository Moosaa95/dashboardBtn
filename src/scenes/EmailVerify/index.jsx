import { style } from '@mui/system';
import React, {useState, useEffect, Fragment, useContext} from 'react'
import {useParams, Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'
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

  console.log(param, 'lol', param.token, param.uuid64);

  useEffect(() => {
    const verifyEmailUrl = async () => {
      // console.log('vferrtftyfty');
      try{
        const response = await fetch(`https://nest-srm.up.railway.app/auth/email-verify/?token=${param.token}&uidb64=${param.uuid64}`, {
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
      {validUrl ? (
        <div className={styles.container}>
          <img src={successful} alt="success" className='success-img' />
          <h1>Email Verified successfully</h1>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ):(

        <h1>404 Not Found</h1>
      )
      
    }
    </Fragment>
    </>
  )
}
