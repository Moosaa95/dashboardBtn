import React from 'react'
import {useParams, Link } from "react-router-dom"


export const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false)

  const param = useParams()


  useEffect(() => {
    const verifyEmailUrl = async () => {
      try{
        const response = await fetch(`https://nest-srm.up.railway.app/auth/email-verify/?token=${param.token}&uidb64=${param.uidb64}`)
        const data = await response.json()
        if (response.ok){
          setValidUrl(true)
        }

      }catch(error){
        setValidUrl(false)
      }
    }
    verifyEmailUrl
  }, param)

  return (
    <>
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <h1>Verified successfully</h1>
        </div>
      ):{
        alert()
      }
        // <h1>404 Not Found</h1>
      
    }
    </Fragment>
    </>
  )
}
