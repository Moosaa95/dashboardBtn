import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Snackbar, Box, TextField, MenuItem, useMediaQuery } from "@mui/material";
import Select from "react-select";
import AuthContext from "../context/AuthContext";


export default function EditStakeholder({
  openModal,
  handleCloseModal,
  handleStakeEdit,
  rowId,
  stakeholders
}) {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesId, setCountriesId] = useState("");
  const [statesId, setStatesId] = useState("");
  const [stateName, setStateName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  // const [postalCode, setPostalCode] = useState("");
  // const [address, setAddress] = useState("");
  // const [interest, setInterest] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState("");
  // // const [firstName, setFirstName] = useState(rowId);
  // const [lastName, setLastName] = useState("");
  // const [stakeholderType, setStakeholderType] = useState("");
  // const [businessCategory, setBusinessCategory] = useState([]);
  const [businessSectorId, setBusinessSectorId] = useState("");
  // const [jobTitle, setJobTitle] = useState("");
  const [businessSector, setBusinessSector] = useState("");
  const [businessSectorName, setBusinessSectorName] = useState("");
  const [displayValue, getValue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [msg, setMsg] = useState("");

  const [nRow, setNRow] = useState({...rowId}) 

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    addStakeHolder,
    error,
    success,
    authTokens,
    clearError,
    clearSuccess,
  } = useContext(AuthContext);



  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // }
 

  

 

  console.log('HIGHEER ID IN THE MAKEING ', nRow)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    //   console.log(e, 'i am form to handle')
    if (rowId) {
      let response = await fetch(
        `https://nest-srm.up.railway.app/stakeholder-update/${rowId.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
          body: JSON.stringify({
            first_name: nRow.first_name,
            last_name:  nRow.last_name ,
            stakeholder_type: nRow.stakeholder_type,
            business_category: nRow.business_category,
            business_sector: nRow.business_sector,
            job_title: nRow.job_title,
            email: nRow.email,
            phone: nRow.phone,
            address: nRow.address,
            country: nRow.country,
            state: nRow.state,
            postal_code: nRow.postal_code,
            city: nRow.city,
            interest: nRow.interest,
          }),
        }
      );
      // const {address,business_category,
      //       business_sector,city,Saminaka,
      //       country, email, first_name,
      //       interest, state, phone, last_name,
      //       stakeholder_image, job_title, stakeholder_type,
      //       postal_code, id, tenant} = response.data;

      //       setStakeHolderVar(
      //         stakeHolderVar.map(ind => {
      //           return ind.id === id ? { ...response.data } : stakeHolderVar
      //         })
      //       )

      let data = await response.json();
      
      // console.log(data, "take seripous");
      // setStakeHolderVar(data["data"])
      if (response.ok) {
        // console.log(response, "erresponse", data);
        e.target.reset()
        setOpen(true);
        setMsg(data);
        setInterval(() => {
          setMsg(null)
        }, 3000);
      } else {
        setOpen(true);
        setMsg(data);
        setInterval(() => {
          setMsg(null)
        }, 3000);
      }
      // console.log(data, "data");
    }
  };

  useEffect(() => {
    const getCountry = async () => {
      try {
        const getCountryData = await fetch(
          "https://nest-srm.up.railway.app/location/apibundle"
        );
        const countryJson = await getCountryData.json();
        console.log(countryJson["country"], "ppp");
        setCountries(await countryJson["country"]);
        if (getCountryData.ok) {
        }
      } catch (error) {
        setErrorMessage(error);
      }
    };
    getCountry();
  }, []);

  useEffect(() => {
    if (countriesId) {
      console.log("hi i am inside", countriesId);
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
  }, [countriesId]);

  useEffect(() => {
    if (statesId) {
      console.log("hi i am inside states", statesId);
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
  }, [statesId]);

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const getBusinessData = await fetch(
          "https://nest-srm.up.railway.app/business-sector",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens.token.access,
            },
          }
        );
        const businessJson = await getBusinessData.json();
        console.log(businessJson, "business ppp");
        setBusinessSector(businessJson["data"]);
        if (getBusinessData.ok) {
          console.log("iron man");
          setIsLoaded(true);
        }
      } catch (error) {
        setErrorMessage(error);
      }
    };
    getBusiness();
  }, []);


  // const handleCountry = (event)=>{
  //   const getCountryId = event.target.value;
  //   console.log(getCountryId, 'id');
  //   return countries.map((target, index) => {
  //     console.log('targer', target["country_pk"] == getCountryId);
  //     if (getCountryId == target["country_pk"]){
  //       console.log('setter',target["country_pk"] );
  //       setCountriesId(target["country_pk"]);
  //       setCountryName(target["country_name"])
  //       setNRow(d=>({...d, country:countryName}))
  //     }
  //   })


  // }

  // const handleState = (event) => {
  //   const getStateId = event.target.value;
  //   console.log(getStateId, 'state id');
  //   return state.map((target, index) => { 
  //     console.log('state targer', target["name"] == getStateId);
  //     if (getStateId == target["pk"]){
  //       console.log('setter',target["pk"] );
  //       setStatesId(target["pk"]);
  //       setStateName(target["name"])
  //       setNRow(d=>({...d, state:stateName}))
  //     }
  //   })


  // }

  // const handleCity = (event) => {
  //   const getCityId = event.target.value;
  //   console.log(getCityId, 'id');
  //   return city.map((target, index) => {
  //     console.log('targer', target["city"] == getCityId);
  //     if (getCityId == target["pk"]){
  //       console.log('setter',target["pk"], 'city id', cityId );
  //       setCityId(target["pk"]);
  //       setCityName(target["city"])
  //       setNRow(d=>({...d, city:cityName}))
  //     }
  //   })


  // }
  console.log('i am a country name', countryName);

  const businessOptions = businessSector;
  const bus = [];

  for (let i = 0; i < businessSector.length; i++) {
    console.log(businessSector[i], "hello");
    bus.push({ value: businessSector[i].id, label: businessSector[i].id });
  }


  const handleBusinessSector = (e) => {
    getValue(Array.isArray(e)?e.map(x=>x.label):[])
    console.log(displayValue, 'poppppppppp')
    
    
  }

  return (
    <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg?open : false}
          onClose={handleCloseModal}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogTitle id="alert-dialog-title">{"Edit Stakeholder"}</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d => ({...d, first_name : e.target.value}))}
                value={nRow?.first_name}
                name="first_name"
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d => ({...d, last_name: e.target.value}))}
                value={nRow?.last_name}
                name="LastName"
                // error={lastName ? && !!errors.lastName}
                // helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d=>({...d, email:e.target.value}))}
                value={nRow?.email}
                name="email"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                select
                label="Business Category"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d=>({...d, business_category:e.target.value}))}
                value={nRow?.business_category}
                name="business_category"
                // error={!!touched.stakeholderType && !!errors.stakeholderType}
                // helperText={touched.stakeholderType && errors.stakeholderType}
                sx={{ gridColumn: "span 2" }}
              >
                {/* <MenuItem value="OLD">OLD</MenuItem> */}
                <MenuItem value="STARTUP">STARTUP</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Interest"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d=>({...d, interest:e.target.value}))}
                value={nRow?.interest}
                name="interest"
                // error={!!touched.interest && !!errors.interest}
                // helperText={touched.interest && errors.interest}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Stakeholder Type"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d=>({...d, stakeholder_type:e.target.value}))}
                value={nRow?.stakeholder_type}
                name="stakeHolderType"
                // error={
                // //   !!touched.businessCategory && !!errors.businessCategory
                // }
                // helperText={
                //   touched.businessCategory && errors.businessCategory
                // }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Job Title"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d=>({...d, job_title:e.target.value}))}
                value={nRow?.job_title}
                name="jobTitle"
                // error={!!touched.jobTitle && !!errors.jobTitle}
                // helperText={touched.jobTitle && errors.jobTitle}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Postal code"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d=>({...d, postal_code:e.target.value}))}
                value={nRow?.postal_code}
                name="postalCode"
                // error={!!touched.postalCode && !!errors.postalCode}
                // helperText={touched.postalCode && errors.postalCode}
                sx={{ gridColumn: "span 2" }}
              />

              <label className="form-label" htmlFor="basicSelect">
                            Business Sector
                          </label>
                            {isLoaded && 
                              <Select
                              isMulti
                              name="businessSector"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={()=>{
                                setNRow(d=>({...d, business_sector:handleBusinessSector}))}}
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                ...theme.colors,
                                  text: '#000',
                                  primary25: 'hotpink',
                                  primary: '#000',
                                  
                                },
                              })}
                            
                              options={bus} />
                            
                            }
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                // onBlur={handleBlur}
                onChange={(e) => setNRow(d=>({...d, phone:e.target.value}))}
                value={nRow?.phone}
                name="phoneNumber"
                // error={!!touched.phoneNumber && !!errors.phoneNumber}
                // helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                // onBlur={handleBlur}
                
                onChange={(e) => setNRow(d=>({...d, address:e.target.value}))}
                value={nRow?.address}
                name="address"
                // error={!!touched.address && !!errors.address}
                // helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                select
                label="Country"
                onChange={(e) => handleCountry(e)}
                name="country"
                sx={{ gridColumn: "span 2" }}
              >
                {countries.map((country, index) => (
                  <MenuItem value={country.country_pk} key={country.country_pk}>
                    {country.country_name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                select
                label="State"
                onChange={(e) => handleState(e)}
                name="state"
                sx={{ gridColumn: "span 2" }}
              >
                {state.map((stat, index) => (
                  <MenuItem value={stat.pk} key={stat.pk}>
                    {stat.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                select
                label="City"
                onChange={(e) => handleCity(e)}
                name="city"
                sx={{ gridColumn: "span 2" }}
              >
                {city.map((cit, index) => (
                  <MenuItem value={cit.pk} key={cit.pk}>
                    {cit.city}
                  </MenuItem>
                ))}
              </TextField> */}
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                className="btn btn-large"
                onClose={handleCloseModal}
                onClick={()=>window.location.reload()}
              >
                Add Stakeholder
              </Button>
              {/* <Button color="danger" onClick={handleCloseModal}>Cancel</Button> */}
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus> */}
          {/* Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
