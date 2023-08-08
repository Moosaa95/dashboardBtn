// import { Outlet, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";

// const PrivateRoutes = ({children ,setLoggedIn, ...rest}) => {
//     console.log('it works');
//     // const authenticated = {'token':false}
//     let {authTokens} = useContext(AuthContext)

//     if (authTokens){
//         setLoggedIn(true)
//     }
    

    
//     return(
//         authTokens ? <Outlet  /> : <Navigate to="/login" />
//     )
// }


// export default PrivateRoutes;