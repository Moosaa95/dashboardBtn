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
        <form onSubmit={e=>handleSubmit(e)}>
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
                    label="Program Name"
                    // onBlur={handleBlur}
                    onChange={e=>setProgramName(e.target.value)}
                    value={programName}
                    // value={values.programName}
                    name="programName"
                    // error={!!touched.programName && !!errors.programName}
                    // helperText={touched.programName && errors.programName}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Organizer Sponsor"
                    // onBlur={handleBlur}
                    onChange={e=>setOrganizerSponsor(e.target.value)}
                    value={organizerSponsor}
                    name="organizerSponsor"
                    // error={!!touched.organizerSponsor && !!errors.organizerSponsor}
                    // helperText={touched.organizerSponsor && errors.organizerSponsor}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    id="filled-multiline-flexible"
                    multiline
                    maxRows={3}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description"
                    // onBlur={handleBlur}
                    onChange={e=>setProgramDescription(e.target.value)}
                    value={programDescription}
                    name="programDescription"
                    // error={!!touched.programDescription && !!errors.programDescription}
                    // helperText={touched.programDescription && errors.programDescription}
                    sx={{ gridColumn: "span 4" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={10}>
                        <DesktopDatePicker
                            fullWidth
                            label="Date desktop"
                            value={value}
                            name="dateApproved"
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            // error={!!touched.programDescription && !!errors.programDescription}
                            // helperText={touched.programDescription && errors.programDescription}
                            sx={{ gridColumn: "span 4" }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                    Update Program
                </Button>
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
