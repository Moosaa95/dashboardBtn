import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()


export default AuthContext;

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [stakeHolderVar, setStakeHolderVar] = useState([])
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    
    const navigate = useNavigate()
    let registerUser = async ({
        admin_email,
        admin_first_name,
        address,
        password,
        phone_number,
        company_email,
        company_name,
        country,
        state,
        gender,
        admin_username,
        admin_last_name,
        city
    }) => {
        // e.preventDefault()

        let response = await fetch("https://nest-srm.up.railway.app/auth/registration/", {
            method:"POST", 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
            admin_email,
            admin_first_name,
            address,
            password,
            phone_number,
            company_email,
            company_name,
            country,
            state,
            gender,
            admin_username,
            admin_last_name,
            city
            })
        })
        let data = await response.json()
        console.log(data, 'data');
        if (response.ok){
            navigate('/login')
        }


    }


    let loginUser = async (e) => {
        e.preventDefault()
        
        console.log(e.target.email.value);
        
        let response = await fetch("https://nest-srm.up.railway.app/auth/user/login/", {
            method:"POST", 
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({'username':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        console.log(data, 'data');
        if (response.status == 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.token["access"]))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate("/")
        }else{
            alert("something wrong")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
            setUser(null)
            localStorage.removeItem("authTokens")
            navigate("/login")
    }

    // let updateToken = async () => {
    //     let response = await fetch("https://nest-srm.up.railway.app/auth/jwt/refresh/", {
    //         method:"POST", 
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify({'refresh':authTokens.token["refresh"]})
    //     })
    //     let data = await response.json()
    //     console.log(data, 'data');
    //     if (response.status == 200){
    //         setAuthTokens(data)
    //         setUser(jwt_decode(data.token["access"]))
    //         localStorage.setItem('authTokens', JSON.stringify(data))
    //         // navigate("/")
    //     }else{
    //         alert("something wrong")
    //         logoutUser()
    //     }
    // }

    let addUser = async({
        first_name, 
        last_name,
        email,
        gender
    }) => {
        if(authTokens){
            let response = await fetch('https://nest-srm.up.railway.app/auth/user/create/', {
                method:"POST", 
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + authTokens.token.access
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    gender 
                })

            })
            let data = await response.json()
            console.log(data, 'data');
        }else{
            alert("something went wrong")
        }
    }

    let addStakeHolder = async ({
        first_name, 
        last_name, 
        stakeholder_type,
        business_category,
        business_sector,
        job_title,
        email, 
        phone,
        address,
        city,
        state,
        country,
        postal_code,
        interest

    }) => {
        if(authTokens){
            let response = await fetch('https://nest-srm.up.railway.app/stakeholder/signup/', {
                method:"POST", 
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + authTokens.token.access
                },
                body: JSON.stringify({
                    first_name, 
                    last_name, 
                    stakeholder_type,
                    business_category,
                    business_sector,
                    job_title,
                    email, 
                    phone,
                    address,
                    city,
                    state,
                    country,
                    postal_code,
                    interest
                })

            })
            let data = await response.json()
            console.log(data, 'data');
        }else{
            alert("something went wrong")
        }
    }


    let forgotPassword = async({usernameoremail}) => {
        console.log('hiii', usernameoremail);
       

        try {
			let response = await fetch('https://nest-srm.up.railway.app/auth/user/password-reset/', {
                method:"POST",
                headers : {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    usernameoremail
                })
            })
            console.log('hiiiierhjfdjhdnsf', data);
            let data = await response.json()
            setSuccess(data)
			// console.log(accessResponse, 'opopopopo');
			// if (accessResponse && accessResponse.user) {
			// 	setUser(accessResponse.user)
            //     console.log(user, 'user now');
			// }

			// if (accessResponse && accessResponse.access) {
			// 	setAccessToken(accessResponse.access)
			// }

			// router.push('/')
		} catch(error) {
            console.log(error);
		//   if (error.response && error.response.data) {
		//   	setError(error.response.data.message)
		//   	return      
	    //   } else if (error.request) {
		//     setError({message:"something went wrong"})
		//     return  
	    //   } else {
		//     setError({message:"something went wrong"})
		// 	return
	    //   }
	
        }

        
        // const {data} = await axios.post('https://nest-srm.up.railway.app/auth/user/login/', body, config)
        
    }
    
    // let stakeHolders = async () => {
    //     if(authTokens){
    //         let response = await fetch('https://nest-srm.up.railway.app/stakeholder-list?stakeholder_create_from=10/19/2022&stakeholder_created_to=10/20/2022', {
    //             method:"GET", 
    //             headers: {
    //                 'Content-Type' : 'application/json',
    //                 'Authorization' : 'Bearer ' + authTokens.token.access
    //             },

    //         })
    //         let data = await response.json()
    //         setStakeHolderVar(data)
    //         console.log(data, 'data');
    //     }else{
    //         alert("something went wrong")
    //     }
        
    // }

    

    let contextData = {
        authTokens:authTokens,
        user:user,
        // stakeHolderVar: stakeHolderVar,
        loginUser : loginUser,
        registerUser:registerUser,
        logoutUser:logoutUser,
        addUser:addUser,
        addStakeHolder:addStakeHolder,
        forgotPassword:forgotPassword
        // stakeHolders:stakeHolders,
    }

    // useEffect(() => {
        
    //     let interval = setInterval(() => {
    //         if(authTokens){
    //             updateToken()
    //         }
    //     }, 2000)
    //     return ()=>clearInterval(interval)

    // }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData}>
            {children}

        </AuthContext.Provider>
    )
}