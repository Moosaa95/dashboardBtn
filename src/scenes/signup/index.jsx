import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Snackbar, Stack, InputLabel, Select,  MenuItem  } from "@mui/material";
import { Form } from "formik";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";



const SignUp = () => {
    const [adminFirstName, setAdminFirstName] = useState("");
    const [adminLastName, setAdminLastName] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [adminUsername, setAdminUserame] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState([]);
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [countries, setCountries] = useState([]);
    const [countriesId, setCountriesId] = useState("")
    const [statesId, setStatesId] = useState("")
    const [stateName, setStateName] = useState("")
    const [countryName, setCountryName] = useState("");
    const [cityName, setCityName] = useState("")
    const [cityId, setCityId] = useState("")
    const [city, setCity] = useState([])
    
  
  
    const { registerUser } = useContext(AuthContext);
  console.log('hello signupo');
  const handleClose = () => {
    console.log( password);
  }
  useEffect(() => {
    const getCountry = async () => {
      try {
        const getCountryData = await fetch(
          "https://nest-srm.up.railway.app/location/apibundle"
        );
        const countryJson = await getCountryData.json();
        console.log(countryJson["country"], "ppp");
        setCountries(await countryJson["country"]);
        if (getCountryData.ok){
          
        }
      } catch (error) {
        setErrorMessage(error);
      }
    };
    getCountry();
  }, []);



  useEffect(() => {
    if (countriesId){
      // console.log('hi i am inside', countriesId);
      const getState = async () => {
        try {
          const getState = await fetch(
            `https://nest-srm.up.railway.app/location/apibundle?country=${countriesId}`
            );
            const stateJson = await getState.json();
            console.log(stateJson, "state");
            setState(await stateJson["state"]);
          } catch (error) {
            setErrorMessage(error);
          }
        };
        getState();
      }
  }, [countryName]);

  useEffect(() => {
    if (stateName){
      // console.log('hi i am inside', countriesId);
      const getCity = async () => {
        try {
          const getCities = await fetch(
            `https://nest-srm.up.railway.app/location/apibundle?country=${countriesId}&state=${statesId}`
            );
            const citiesJson = await getCities.json();
            console.log(citiesJson, "city");
            setCity(await citiesJson["city"]);
          } catch (error) {
            setErrorMessage(error);
          }
        };
        getCity();
      }
  }, [stateName]);

  const handleCountry = (event)=>{
    const getCountryId = event.target.value;
    console.log(getCountryId, 'id');
    return countries.map((target, index) => {
      console.log('targer', target["country_name"] == getCountryId);
      if (getCountryId == target["country_name"]){
        console.log('setter',target["country_pk"] );
        setCountriesId(target["country_pk"]);
        setCountryName(target["country_name"])
      }
    })

    
  }

  const handleState = (event)=>{
    const getStateId = event.target.value;
    console.log(getStateId, 'id');
    return state.map((target, index) => { 
      console.log('targer', target["name"] == getStateId);
      if (getStateId == target["name"]){
        console.log('setter',target["pk"] );
        setStatesId(target["pk"]);
        setStateName(getStateId)
      }
    })

    
  }

  const handleCity = (event)=>{
    const getCityId = event.target.value;
    console.log(getCityId, 'id');
    return city.map((target, index) => { 
      console.log('targer', target["name"] == getCityId);
      if (getCityId == target["name"]){
        console.log('setter',target["pk"] );
        setCityId(target["pk"]);
        setCityName(getCityId)
      }
    })

    
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    registerUser({
      admin_email : adminEmail,
      admin_first_name : adminFirstName,
      address : address,
      password : password,
      phone_number : phoneNumber,
      company_email : companyEmail,
      company_name : companyName,
      country : countriesId,
      state : statesId,
      gender: gender,
      admin_username: adminUsername,
      admin_last_name: adminLastName,
      city: cityId
    })
  }

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  return (
    <div className="container">
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message={errorMessage}
      key={"top_center"}
    />
    
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
                <h2 className="card-title fw-bold mb-1">Sign Up</h2>
                <p className="card-text mb-2">
                  Start tracking your Stakeholder progress
                </p>
                <form
                  className="auth-register-form mt-2"
                  action=""
                  method="POST"
                  onSubmit={onSubmitHandler}
                >
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-adminFirstName"
                        >
                          Admin First Name
                        </label>
                        <input
                          className="form-control"
                          id="adminFirstName"
                          type="text"
                          name="admin_first_name"
                          placeholder="Aiivon Innovation Hub"
                          aria-describedby="adminFirstName"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) =>
                            setAdminFirstName(e.target.value)
                          }
                          value={adminFirstName}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-adminLastName"
                        >
                          Admin Last Name
                        </label>
                        <input
                          className="form-control"
                          id="adminLastName"
                          type="text"
                          name="admin_Last_name"
                          placeholder="Aiivon Innovation Hub"
                          aria-describedby="adminLastName"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setAdminLastName(e.target.value)}
                          value={adminLastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-username"
                        >
                          Username
                        </label>
                        <input
                          className="form-control"
                          id="register-username"
                          type="text"
                          name="admin_username"
                          placeholder="Aiivon Innovation Hub"
                          aria-describedby="register-username"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setAdminUserame(e.target.value)}
                          value={adminUsername}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label className="form-label" htmlFor="basicSelect">
                          Gender
                        </label>
                        <select className="form-select" id="basicSelect"
                        onChange={e=>setGender(e.target.value)}
                        value={gender}
                        name="gender"
                        >
                          <option>select your gender</option>
                          <option>MALE</option>
                          <option>FEMALE</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-email"
                        >
                          Company Email
                        </label>
                        <input
                          className="form-control"
                          id="register-company-email"
                          type="text"
                          name="company_email"
                          placeholder="aiivonglobal@yahoomail.com"
                          aria-describedby="register-company-email"
                          tabIndex={2}
                          onChange={(e) => setCompanyEmail(e.target.value)}
                          value={companyEmail}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-16 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-email"
                        >
                          Email
                        </label>
                        <input
                          className="form-control"
                          id="register-email"
                          type="text"
                          name="admin_email"
                          placeholder="aiivonglobal@yahoomail.com"
                          aria-describedby="register-email"
                          tabIndex={2}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          value={adminEmail}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-16 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-number"
                        >
                          Phone Number
                        </label>
                        <input
                          className="form-control"
                          id="register-number"
                          type="tel"
                          name="phone_number"
                          placeholder="08012345678"
                          aria-describedby="register-number"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          value={phoneNumber}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label className="form-label" htmlFor="basicSelect">
                          Country
                        </label>
                        <select className="form-select" id="basicSelect"
                        onChange={e=>handleCountry(e)}
                        name="country"
                        >
                          <option>Select a country</option>
                          {
                            countries.map((country, index) => (
                              <option value={country.country_id} key={country.country_pk}>{country.country_name}</option>
                            ))
                          }
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label className="form-label" htmlFor="basicSelect">
                          State
                        </label>
                        <select className="form-select" id="basicSelect"
                        onChange={e=>handleState(e)}
                        name="state"
                        >
                          <option>Select a State</option>
                          {
                            state.map((stat, index) => (
                              <option value={stat.id} key={stat.pk}>{stat.name}</option>

                            ))
                            }
                          
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label className="form-label" htmlFor="basicSelect">
                          City
                        </label>
                        <select className="form-select" id="basicSelect"
                        onChange={e=>handleCity(e)}
                        name="city"
                        >
                          <option>Select a City</option>
                          {
                            city.map((cit, index) => (
                              <option value={cit.id} key={cit.pk}>{cit.city}</option>

                            ))
                            }
                          
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-company-name"
                        >
                          Company Name
                        </label>
                        <input
                          className="form-control"
                          id="register-company-name"
                          type="text"
                          name="company_name"
                          placeholder="Aiivon Innovation Hub"
                          aria-describedby="register-company-name"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setCompanyName(e.target.value)}
                          value={companyName}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-password"
                        >
                          Password
                        </label>
                        <input
                          className="form-control"
                          id="register-password"
                          type="password"
                          name="password"
                          placeholder="**********"
                          aria-describedby="register-password"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-address"
                        >
                          Address
                        </label>
                        <input
                          className="form-control"
                          id="register-address"
                          type="text"
                          name="address"
                          placeholder="167 St. James house off Adetokunbo Ademola Crescent, Wuse 2, Abuja-FCT."
                          aria-describedby="register-username"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-1">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id="register-privacy-policy"
                          type="checkbox"
                          tabIndex={4}
                        />
                        <div className="row">
                          <div className="col-6">
                            <label
                              className="form-check-label"
                              htmlFor="register-privacy-policy"
                            >
                              Remember me
                            </label>
                          </div>
                          <div className="col-6">
                            <p>
                              <a href="#" style={{ float: "right" }}>
                                Forget Password
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary w-100" tabIndex={5}>
                    Sign up
                  </button>
                  <p className="text-center mt-2">
                    <span>Already have an account?</span>
                    {/* <a href="auth-login-cover.html"> */}
                    <Link to="/login">
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        &nbsp;Sign in instead
                      </span>
                    </Link>
                    {/* </a> */}
                  </p>
                </form>
              </div>
              <div className="d-none d-lg-flex col-lg-6 align-items-center p-5">
                <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                  <img
                    className="img-fluid"
                    src="./images/banner/auth-image.png"
                    alt="Register V2"
                  />
                </div>
              </div>
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

export default SignUp;
