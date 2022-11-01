import {
  Box,
  Snackbar,
  MenuItem,
  TextField,
  Button,
  Select,
  OutlinedInput,
InputLabel,
FormControl,
Chip,
useTheme
} from "@mui/material";
// import Select from "react-select";
import React, { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext";
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { tokens } from "../../theme";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name.name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }



const StackHolderForm = () => {
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
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [interest, setInterest] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stakeholderType, setStakeholderType] = useState("");
  const [stakeholderTypeId, setStakeholderTypeId] = useState("")
  const [businessCategory, setBusinessCategory] = useState([]);
  const [businessSectorId, setBusinessSectorId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [businessSector, setBusinessSector] = useState([]);
  const [businessSectorName, setBusinessSectorName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayValue, getValue] = useState([]);
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState("");
  // const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [stakeholderTypes, setStakeholderTypes] = useState([]);
  const [personId, setPersonId] = useState([]);
  const [images, setImages] = useState(null)

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    addStakeHolder,
    error,
    success,
    authTokens,
    clearError,
    clearSuccess,
  } = useContext(AuthContext);

  const handleClose = () => {
    setOpen(false);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // // console.log('succesfull', success);

  const handleChangeImage = (e) => {
    if (e.target.files[0]){

      setImages(e.target.files[0].name)
    }
  }
  if (images){
    console.log(images, 'IMAGES');
  }

  useEffect(() => {
    if (success) {
      // // console.log('hihhh', success)
      // setMsg(success);
      setLoadingBtn(false);
      // setOpen(true);
      // clearSuccess();
      navigate('/stakeholders')
    } else {
      setMsg(error);
      setLoadingBtn(false)
      // setLoadingBtn(false);
      setOpen(true);
      // clearError();
      setInterval(() => {
        clearError()
        
      }, 6000);
    }
  }, [error, success]);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const getCountryData = await fetch(
          "https://nest-srm.up.railway.app/location/apibundle"
        );
        const countryJson = await getCountryData.json();
        // console.log(countryJson["country"], "ppp");
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

    let stakeHolders = async () => {
      // if(authTokens){
          let response = await fetch('https://nest-srm.up.railway.app/stakeholder-type/list', {
              method:"GET", 
              headers: {
                  'Content-Type' : 'application/json',
                  'Authorization' : 'Bearer ' + authTokens.token.access
              },

          })
          let data = await response.json()
          // console.log("user", data, 'nowowowo');
          setStakeholderTypes(data["data"])
          if (response.ok){
            setIsLoaded(false)
          }
          // console.log(data, 'data');
      // }else{
      //     alert("something went wro")
      // }
      
  }
  stakeHolders()

  }, [authTokens])

  useEffect(() => {
    if (countriesId) {
      // console.log("hi i am inside", countriesId);
      const getState = async () => {
        try {
          const getState = await fetch(
            `https://nest-srm.up.railway.app/location/apibundle?country=${countriesId}`
          );
          const stateJson = await getState.json();
          // console.log(stateJson, "state");
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
      // console.log("hi i am inside states", statesId);
      const getCity = async () => {
        try {
          const getCities = await fetch(
            `https://nest-srm.up.railway.app/location/apibundle?country=${countriesId}&state=${statesId}`
          );
          const citiesJson = await getCities.json();
          // console.log(citiesJson, "city");
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
        // console.log(businessJson, "business ppp");
        setBusinessSector(businessJson["data"]);
        if (getBusinessData.ok) {
          // console.log("iron man");
          setIsLoaded(true);
        }
      } catch (error) {
        setErrorMessage(error);
      }
    };
    getBusiness();
  }, []);

  useEffect(() => {

  }, [])


  const handleCountry = (event)=>{
    const getCountryId = event.target.value;
    // console.log(getCountryId, 'id');
    return countries.map((target, index) => {
      // console.log('targer', target["country_pk"] == getCountryId);
      if (getCountryId == target["country_pk"]){
        // console.log('setter',target["country_pk"] );
        setCountriesId(target["country_pk"]);
        setCountryName(target["country_name"])
      }
    })


  }

  const handleState = (event) => {
    const getStateId = event.target.value;
    // console.log(getStateId, 'state id');
    return state.map((target, index) => { 
      // console.log('state targer', target["name"] == getStateId);
      if (getStateId == target["pk"]){
        // console.log('setter',target["pk"] );
        setStatesId(target["pk"]);
        setStateName(target["name"])
      }
    })


  }

  const handleCity = (event) => {
    const getCityId = event.target.value;
    // console.log(getCityId, 'id');
    return city.map((target, index) => {
      // console.log('targer', target["city"] == getCityId);
      if (getCityId == target["pk"]){
        // console.log('setter',target["pk"], 'city id', cityId );
        setCityId(target["pk"]);
        setCityName(target["city"])
      }
    })


  }

  const handleStakeholderType = (e) => {
    const getStakeId = e.target.value;
    // console.log('kfkkjdfjJHBHJF', getStakeId);
    return stakeholderTypes.map(target => {
      if (getStakeId == target["id"]){
        setStakeholderTypeId(target["id"])
      }
    })
  }
  // console.log('i am a country name', countryName);

  const businessOptions = businessSector;
  const bus = [];

  for (let i = 0; i < businessSector.length; i++) {
    // console.log(businessSector[i], "hello");
    bus.push({ value: businessSector[i].id, label: businessSector[i].id });
  }
  // // console.log(
  //   "i am a business optioon",
  //   businessOptions,
  //   typeof businessOptions,
  //   bus
  // );

  const handleSubmit = (e) => {
    e.preventDefault()
      // console.log("=======================");
      setLoadingBtn(true)
    // console.log(e, "ation valeue")
    addStakeHolder({
      first_name:firstName, 
      last_name:lastName, 
      stakeholder_type:stakeholderTypeId,
      business_category:businessCategory,
      business_sector:personName.map(ind => ind.id),
      job_title:jobTitle,
      email : email,
      phone:phoneNumber, 
      address:address,
      country:countriesId,
      state:statesId, 
      postal_code:postalCode,
      city:cityId,
      interest:interest,
      stakeholder_image: images

    })
  };

  

  // console.log("country id", statesId);
  // // console.log(ref.current.values, 'lopghjnjk');
  const handleBusinessSector = (e) => {
    getValue(Array.isArray(e)?e.map(x=>x.label):[])
    // console.log(displayValue, 'poppppppppp')
    
    
  }
//   const initialValues = {
//     firstName : "",
//     lastName : "",
//     stakeholderType: "",
//     businessCategory: "",
//     businessSector : displayValue,
//     jobTitle : "",
//     email : "",
//     phoneNumber : "",
//     address : "",
//     // country : "",
//     // state : "",
//     postalCode : "",
//     // city : "",
//     interest : ""
   
// };









const handleSelectChange = (event) => {
  // // console.log(businessSector);
  // console.log(event, 'i ama an event', event, 'EVENET');
  
  const {
    target: { value },
  } = event;
  
  // console.log('target value', value);
  // console.log("================")
  // console.log(businessSector)
  setPersonName(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
    );
   
  }



if (personName) {
  // console.log("I AM A PERSON NAME", personName)
}
  return (
    <Box
      m="20px"
      backgroundColor="#292929"
      width="100%"
      height="100%"
    >
       {
          msg && 
          <Snackbar
          
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          message={msg}
          key={'top_center'}
          
          />}
          <Box display="flex" justifyContent="center" alignItems="center">
            <Header title="Add StakeHolder" subtitle="Add new Stakeholder" />
          </Box>

          <Box sx={{ width: "800px", margin: "auto", marginTop: "70px" }}>
            <form 
            onSubmit={e=>handleSubmit(e)}
            >
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
                    onChange={e=>setFirstName(e.target.value)}
                    value={firstName}
                    name="firstName"
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
                    onChange={e=>setLastName(e.target.value)}
                    value={lastName}
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
                    onChange={e=>setEmail(e.target.value)}
                    value={email}
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
                    onChange={e=>setBusinessCategory(e.target.value)}
                    value={businessCategory}
                    name="business_category"
                    // error={!!touched.stakeholderType && !!errors.stakeholderType}
                    // helperText={touched.stakeholderType && errors.stakeholderType}
                    sx={{ gridColumn: "span 2" }}
                  >
                    {/* <MenuItem value="OLD">OLD</MenuItem> */}
                    <MenuItem value="STARTUP">STARTUP</MenuItem>
                    <MenuItem value="MSMEs">MSMEs</MenuItem>
                    <MenuItem value="SMEs">SMEs</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Interest"
                    // onBlur={handleBlur}
                    onChange={e=>setInterest(e.target.value)}
                    value={interest}
                    name="interest"
                    // error={!!touched.interest && !!errors.interest}
                    // helperText={touched.interest && errors.interest}
                    sx={{ gridColumn: "span 2" }}
                  /> 

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    select
                    label="StakeHolder type"
                    // onBlur={handleBlur}
                    onChange={e=>handleStakeholderType(e)}
                    // value={countryName}
                    name="stakeholder_type"
                    // error={!!touched.country && !!errors.country}
                    // helperText={touched.country && errors.country}
                    sx={{ gridColumn: "span 2" }}
                    // onClick={setCountriesId(values.country)}
                  >
                    {stakeholderTypes.map((holder, index) => (
                      <MenuItem
                        value={holder.id}
                        key={holder.id}
                      >
                        {holder.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Job Title"
                    // onBlur={handleBlur}
                    onChange={e=>setJobTitle(e.target.value)}
                    value={jobTitle}
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
                    onChange={e=>setPostalCode(e.target.value)}
                    value={postalCode}
                    name="postalCode"
                    // error={!!touched.postalCode && !!errors.postalCode}
                    // helperText={touched.postalCode && errors.postalCode}
                    sx={{ gridColumn: "span 2" }}
                  />
                  {/* <label className="form-label" htmlFor="basicSelect">
                            Business Sector
                          </label> */}
                          {/* <select className="form-select" id="basicSelect" */}
                          {/* // onChange={e=>handleBusinessSector(e)} */}
                        {/* / name="business_sector" */}
                          {/* > */}
                            {/* <option>Select a Business Sector</option> */}
                            {/* {isLoaded && 
                              <Select
                              isMulti
                              name="businessSector" */}
                              {/* // defaultInputValue={[businessOptions["value"]]}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={handleBusinessSector}
                              // getOptionValue={displayValue}
                              // onClick={handleClick}
                              // value={displayValue}
                              
                              // value={multiSelect}
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
                            
                              options={bus} /> */}
                            
                            {/* } */}
                            
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Phone Number"
                    // onBlur={handleBlur}
                    onChange={e=>setPhoneNumber(e.target.value)}
                    value={phoneNumber}
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
                    onChange={e=>setAddress(e.target.value)}
                    value={address}
                    name="address"
                    // error={!!touched.address && !!errors.address}
                    // helperText={touched.address && errors.address}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    select
                    label="Country"
                    // onBlur={handleBlur}
                    onChange={e=>handleCountry(e)}
                    // value={countryName}
                    name="country"
                    // error={!!touched.country && !!errors.country}
                    // helperText={touched.country && errors.country}
                    sx={{ gridColumn: "span 2" }}
                    // onClick={setCountriesId(values.country)}
                  >
                    {countries.map((country, index) => (
                      <MenuItem
                        value={country.country_pk}
                        key={country.country_pk}
                      >
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
                    // onBlur={handleBlur}
                    onChange={e=>handleState(e)}
                    // value={stateName}
                    name="state"
                    // error={!!touched.state && !!errors.state}
                    // helperText={touched.state && errors.state}
                    sx={{ gridColumn: "span 2" }}
                    // onClick={setStatesId(values.state)}
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
                    // onBlur={handleBlur}
                    onChange={e=>handleCity(e)}
                    // value={city}
                    name="city"
                    // error={!!touched.city && !!errors.city}
                    // helperText={touched.city && errors.city}
                    sx={{ gridColumn: "span 2" }}
                    // onClick={setCityId(values.city)}
                  >
                    {city.map((cit, index) => (
                      <MenuItem value={cit.pk} key={cit.pk}>
                        {cit.city}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Box width="50%" height="500%">
                   
                  <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Business Sector</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          // itemID={personName}
          // key={personName}
          // name={personName}
          onChange={e=>handleSelectChange(e)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
            
          )}
          MenuProps={MenuProps}
        >
          {businessSector.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // id={name.id}
              // name={name.id}
              // style={getStyles(name, personName, theme)}
            >
              {name.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                  </Box>
                 <Box ml="150px">
                 <Button variant="contained" component="label" 
        // startIcon={<Add />}
        
        color="secondary">
        add Image
        <input hidden accept="image/png" multiple type="file" onChange={handleChangeImage} />
      </Button>
                 </Box>

              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
              <LoadingButton
              loading={loadingBtn}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Add StakeHolders
            </LoadingButton>
                </Box>
            </form>
          </Box>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   stakeholderType: yup.string().required("required"),
//   businessCategory: yup.string().required("required"),
// //   country: yup.string().required("Required"),
// //   city: yup.string().required("Required"),
// //   state: yup.string().required("Required"),
//   address: yup.string().required("Required"),
//   interest: yup.string().required("Required"),
//   jobTitle: yup.string().required("Required"),
//   phoneNumber: yup.string().matches(phoneRegExp, "Phone is not valid").required("Required"),
//   email: yup.string().email("invalid email").required("required"),

  
// });


export default StackHolderForm;
