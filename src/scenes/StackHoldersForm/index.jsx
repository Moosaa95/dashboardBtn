import { Box, Button, InputLabel, MenuItem, Select, TextField, Snackbar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const StackHolderForm = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [countries, setCountries] = useState([]);
    const [countriesId, setCountriesId] = useState("")
    const [statesId, setStatesId] = useState("")
    const [stateName, setStateName] = useState("")
    const [countryName, setCountryName] = useState("");
    const [cityName, setCityName] = useState("")
    const [cityId, setCityId] = useState("")
    const [city, setCity] = useState([])
    const [state, setState] = useState([])
    const [postalCode, setPostalCode] = useState("")
    const [address, setAddress] = useState("")
    const [interest, setInterest] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [stakeholderType, setStakeholderType] = useState("")
    const [businessCategory, setBusinessCategory] = useState([])
    const [businessSectorId, setBusinessSectorId] = useState("")
    const [jobTitle, setJobTitle] = useState("")
    const [businessSector, setBusinessSector] = useState("")
    const [businessSectorName, setBusinessSectorName] = useState("")

    


  const isNonMobile = useMediaQuery("(min-width:600px)");



  const {addStakeHolder, authTokens} = useContext(AuthContext)
  console.log(authTokens);


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
    const getBusiness = async () => {
      try {
        const getBusinessData = await fetch(
          "https://nest-srm.up.railway.app/business-sector", 
          {method:"GET", 
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + authTokens.token.access
          }
        },

        );
        const businessJson = await getBusinessData.json();
        console.log(businessJson, "business ppp");
        setBusinessSector(await businessJson);
        if (getBusiness.ok){
          
        }
      } catch (error) {
        setErrorMessage(error);
      }
    };
    getBusiness();
  }, []);



  useEffect(() => {
    if (countriesId){
      console.log('hi i am inside', countriesId);
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

  const handleBusinessSector = (event)=>{
    const getBusinessSectorId = event.target.value;
    console.log(getBusinessSectorId, 'id');
    return businessSector["data"].map((target, index) => { 
      console.log('targer', target["name"] == getBusinessSectorId);
      if (getBusinessSectorId == target["name"]){
        console.log('setter',target["pk"] );
        setBusinessSectorId(target["pk"]);
        setBusinessSectorName(getBusinessSectorId)
      }
    })

    
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    addStakeHolder({
      first_name:firstName, 
      last_name:lastName, 
      stakeholder_type:stakeholderType,
      business_category:["1", "2"],
      business_sector:["1"],
      job_title:jobTitle,
      email : email,
      phone:phoneNumber, 
      address:address,
      country:countriesId,
      state:statesId, 
      postal_code:postalCode,
      city:cityId,
      interest:interest,
      
    })
  }


  const handleChange = (event) => {
    const vectio = ""
  };
  

  const handleClose = (values) => {
    console.log(values);
  };

  console.log('host business sector', businessSector);
  // businessSector["data"].map(ind=>console.log('inner', ind.code))

  return (
    <>
       <div className="container">
    {/* <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      onClose={handleClose}
      autoHideDuration={6000}
      message={errorMessage}
      key={"top_center"}
    /> */}
    
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
                <h2 className="card-title fw-bold mb-1">Add Stake holder</h2>
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
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          className="form-control"
                          id="firstName"
                          type="text"
                          name="firstName"
                          placeholder="Enter first name"
                          aria-describedby="firstName"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          className="form-control"
                          id="lastName"
                          type="text"
                          name="lastName"
                          placeholder="last Name"
                          aria-describedby="address"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-postal-code"
                        >
                          Postal Code
                        </label>
                        <input
                          className="form-control"
                          id="postalCode"
                          type="text"
                          name="postal_code"
                          placeholder="Postal Code"
                          aria-describedby="postal-code"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setPostalCode(e.target.value)}
                          value={postalCode}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <input
                          className="form-control"
                          id="address"
                          type="text"
                          name="address"
                          placeholder="add stake holder address"
                          aria-describedby="address"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                   
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
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="businessCategory"
                        >
                          Business Category
                        </label>
                        <input
                          className="form-control"
                          id="businessCategory"
                          type="text"
                          name="businessCategory"
                          placeholder="add stake holder businessCategory"
                          aria-describedby="businessCategory"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setBusinessCategory(e.target.value)}
                          value={businessCategory}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                   
                    <div className="col-lg-6 col-md-16 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-job-title"
                        >
                          Job title
                        </label>
                        <input
                          className="form-control"
                          id="register-number"
                          type="text"
                          name="jobTitle"
                          placeholder="job title"
                          aria-describedby="register-number"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setJobTitle(e.target.value)}
                          value={jobTitle}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      {/* <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="businessCategory"
                        >
                          Business Sector
                        </label>
                        <input
                          className="form-control"
                          id="businessSector"
                          type="text"
                          name="businessSector"
                          placeholder="add stake holder businessSector"
                          aria-describedby="businessSector"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setBusinessSector(e.target.value)}
                          value={businessSector}
                        />
                      </div> */}
                      <div className="mb-1">
                        <label className="form-label" htmlFor="basicSelect">
                          Business Sector
                        </label>
                        <select className="form-select" id="basicSelect"
                        // onChange={e=>handleBusinessSector(e)}
                        name="business_sector"
                        >
                          <option>Select a Business Sector</option>
                          {
                            businessSector["data"].forEach(element => (
                              <option value={element.id}>{element.name}</option>
                              
                            ))
                          }
                          {/* {
                            businessSector["data"].map((busin, index) => (
                              <option value={busin.id} key={busin.id} >{busin.name}</option>
                            ))
                          } */}
                        </select>
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
                          htmlFor="register-interest"
                        >
                          Interest
                        </label>
                        <input
                          className="form-control"
                          id="register-interest"
                          type="text"
                          name="interest"
                          placeholder="Interest"
                          aria-describedby="register-interest"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setInterest(e.target.value)}
                          value={interest}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-interest"
                        >
                          Email
                        </label>
                        <input
                          className="form-control"
                          id="register-interest"
                          type="text"
                          name="email"
                          placeholder="email"
                          aria-describedby="register-interest"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-stakeholderType"
                        >
                          Stack holder Type
                        </label>
                        <input
                          className="form-control"
                          id="register-stakeholderType"
                          type="text"
                          name="stakeholderType"
                          placeholder="stakeholder Type"
                          aria-describedby="register-stakeholderType"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setStakeholderType(e.target.value)}
                          value={stakeholderType}
                        />
                      </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6 col-sm-8 px-xl-2 mx-auto">
                      <div className="mb-1">
                        <label
                          className="form-label"
                          htmlFor="register-interest"
                        >
                          Email
                        </label>
                        <input
                          className="form-control"
                          id="register-interest"
                          type="text"
                          name="email"
                          placeholder="email"
                          aria-describedby="register-interest"
                          autoFocus=""
                          tabIndex={1}
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                    </div> */}
                    
                  </div>
                  <div className="row">
                    <div className="mb-1">
                    </div>
                  </div>
                  <button className="btn btn-primary w-100" tabIndex={5}>
                    Add Stake holder
                  </button>
                 
                </form>
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
    </>
  )  
};

export default StackHolderForm;
