import React, {useState, useEffect, Fragment, useContext} from 'react'
import {useParams, Link } from "react-router-dom"
import AuthContext from '../context/AuthContext'


export const EmailVerify = ({setLoggedIn}) => {
  const [validUrl, setValidUrl] = useState(false)

  // const param = useParams()
  const params = new URLSearchParams(window.location.search)


  const { loginUser, user,success, error,authTokens } = useContext(AuthContext);

  if (!authTokens){
    setLoggedIn(false)
  }
  else{
    setLoggedIn(true)
  }

  console.log(params, 'lol');

  useEffect(() => {
    const verifyEmailUrl = async () => {
      console.log('vferrtftyfty');
      try{
        const response = await fetch(`https://nest-srm.up.railway.app/auth/email-verify/?token=${params.get("token")}&uidb64=${params.get("uuid64")}`, {
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
  }, [params])

  return (
    <>
    <Fragment>
      {validUrl ? (
        <div className="juj">
          <h1>Verified successfully</h1>
        </div>
      ):(

        <h1>404 Not Found</h1>
      )
      
    }
    </Fragment>
    </>
  )
}
