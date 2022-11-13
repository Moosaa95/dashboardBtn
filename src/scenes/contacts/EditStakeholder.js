import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// import Select from 'react-select';
import {
  Snackbar,
  Box,
  TextField,
  Select,
  Chip,
  OutlinedInput,
  MenuItem,
  useMediaQuery,
  Typography,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText
} from "@mui/material";
// import Select from "react-select";
import AuthContext from "../context/AuthContext";
import { LoadingButton } from "@mui/lab";

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

export default function EditStakeholder({
  openModal,
  handleCloseModal,
  handleStakeEdit,
  rowId,
  stakeholders,
  setRowId,
  command
}) {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesId, setCountriesId] = useState("");
  const [statesId, setStatesId] = useState("");
  const [citiesId, setCitiesId] = useState("");
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
  const [jobTitle, setJobTitle] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stakeholderType, setStakeholderType] = useState("");
  const [businessCategory, setBusinessCategory] = useState([]);
  const [businessSectorId, setBusinessSectorId] = useState("");
  // const [jobTitle, setJobTitle] = useState("");
  const [businessSector, setBusinessSector] = useState([]);
  const [businessSectorName, setBusinessSectorName] = useState("");
  const [displayValue, getValue] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [stakeholderVar, setStakeHolderVar] = useState([]);
  const [stakeholderTypeId, setStakeholderTypeId] = useState("");
  const [stakeholderTypes, setStakeholderTypes] = useState([]);
  const [msg, setMsg] = useState("");
  const [personName, setPersonName] = useState([]);
  const [busyDay, setBusyDay] = useState([]);
  const [personList, setPersonList] = useState([])

  const [nRow, setNRow] = useState();

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    addStakeHolder,
    error,
    success,
    authTokens,
    clearError,
    clearSuccess,
  } = useContext(AuthContext);

  let getStakeHolders = async () => {
    // if(authTokens){
    let response = await fetch(
      `${process.env.REACT_APP_BASE_API_KEY}/stakeholder-type/list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens.token.access,
        },
      }
    );
    let data = await response.json();
    // console.log("user", data, 'nowowowo');
    setStakeholderTypes(data["data"]);
    if (response.ok) {
      setIsLoaded(false);
    }
    // console.log(data, 'data');
    // }else{
    //     alert("something went wro")
    // }
  };

  useEffect(() => {
    getStakeHolders();
  }, [authTokens]);

  const handleStakeholderType = (e) => {
    const getStakeId = e.target.value;
    // console.log('kfkkjdfjJHBHJF', getStakeId);
    return stakeholderTypes.map((target) => {
      // if (getStakeId == target["id"]) {
      //   setStakeholderTypeId({
      //     ...stakeholderType,
      //     stakeholdeType: target["id"],
      //   });
      // }
      if (getStakeId == target["id"]) {
        setStakeholderTypeId(target["id"]);
      }
    });
  };

  useEffect(() => {
    let stakeHolders = async () => {
      // // console.log('POPO BIG CODE', rowId);
      if (authTokens) {
        let response = await fetch(
          `${process.env.REACT_APP_BASE_API_KEY}/stakeholder/profile/${rowId.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens.token.access,
            },
          }
        );
        let data = await response.json();
        setFirstName(data["data"].first_name);
        setLastName(data["data"].last_name);
        setAddress(data["data"].address);
        setPhoneNumber(data["data"].phone);
        setBusinessCategory(data["data"].business_category);
        setPostalCode(data["data"].postal_code);
        setPersonName(data["data"].business_sectors.map(ind=>ind.name));

        setEmail(data["data"].email);
        // setCountry(data["data"].country);
        setCountriesId(data["data"].country);
        setStatesId(data["data"].state);
        setCityId(data["data"].city);
        setInterest(data["data"].interest);
        setJobTitle(data["data"].job_title);
        setStakeholderTypeId(data["data"].stakeholder_type);
        // setStakeholderTypeId(2)

        if (response.ok) {
          setIsLoaded(false);

          // console.log("DATA IS POWER", data);
          // setFirstName(stakeholderVar.first_name)
        }
        // // console.log(data, "data", 'BIG DATA NEX TITME ');
      } else {
        alert("something went wro");
      }
    };
    stakeHolders();

    // return () => {
    //   second
    // }
  }, [rowId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // // console.log('NROWERS', nRow);
    console.log(personName, 'i am form to handle', personList)
    setLoadingBtn(true);
    if (rowId) {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/stakeholder-update/${rowId.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            stakeholder_type: stakeholderTypeId,
            business_category: businessCategory,
            business_sector: peter,
            job_title: jobTitle,
            email: email,
            phone: phoneNumber,
            address: address,
            country: countriesId,
            state: statesId,
            postal_code: postalCode,
            city: cityId,
            interest: interest,
          }),
        }
      );
      let data = await response.json();

      // console.log(data, "take seripous");
      // setStakeHolderVar(data["data"])
      if (response.ok) {
        // // console.log(response, "erresponse", data);
        e.target.reset();
        setOpen(true);
        setLoadingBtn(false);

        setMsg(data.message);
        getStakeHolders();
        handleCloseModal()
        command()
        // window.location.reload();

        // setInterval(() => {
        //   setMsg(null)
        //   window.location.reload()
        // }, 3000);
      } else {
        setOpen(true);
        setLoadingBtn(false);
        setMsg(data.message);
        setInterval(() => {
          setMsg(null);
        }, 3000);
      }
      // // console.log(data, "data");
    }
  };

  useEffect(() => {
    const getCountry = async () => {
      try {
        const getCountryData = await fetch(
          `${process.env.REACT_APP_BASE_API_KEY}/location/apibundle`
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
    if (countriesId) {
      // console.log("hi i am inside", countriesId);
      const getState = async () => {
        try {
          const getState = await fetch(
            `${process.env.REACT_APP_BASE_API_KEY}/location/apibundle?country=${countriesId}`
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
            `${process.env.REACT_APP_BASE_API_KEY}/location/apibundle?country=${countriesId}&state=${statesId}`
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

  let busy = [];
  useEffect(() => {
    const getBusiness = async () => {
      try {
        const getBusinessData = await fetch(
          `${process.env.REACT_APP_BASE_API_KEY}/business-sector`,
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
          // setIsLoaded(true);
        }
      } catch (error) {
        setErrorMessage(error);
      }
    };
    getBusiness();
  }, []);

  // businessSector.map(ind=>{
  //   console.log("busy dat", ind.name);
  //   busy.push({value:ind.id, label:ind.name})
  // })

  // console.log(busy, 'busies');

  const handleCountry = (event) => {
    const getCountryId = event.target.value;
    // console.log(getCountryId, 'id');
    return countries.map((target, index) => {
      // console.log('targer', target["country_pk"] == getCountryId);
      if (getCountryId == target["country_pk"]) {
        // console.log('setter',target["country_pk"] );
        setCountriesId(target["country_pk"]);
        setCountryName(target["country_name"]);
        // setNRow((d) => ({ ...d, country: countryName }));
      }
    });
  };

  const handleState = (event) => {
    const getStateId = event.target.value;
    // console.log(getStateId, 'state id');
    return state.map((target, index) => {
      // console.log('state targer', target["name"] == getStateId);
      if (getStateId == target["pk"]) {
        // console.log('setter',target["pk"] );
        setStatesId(target["pk"]);
        setStateName(target["name"]);
        // setNRow((d) => ({ ...d, state: stateName }));
      }
    });
  };

  const handleCity = (event) => {
    const getCityId = event.target.value;
    // console.log(getCityId, 'id');
    return city.map((target, index) => {
      // console.log('targer', target["city"] == getCityId);
      if (getCityId == target["pk"]) {
        // console.log('setter',target["pk"], 'city id', cityId );
        setCityId(target["pk"]);
        setCityName(target["city"]);
        // setNRow((d) => ({ ...d, city: cityName }));
      }
    });
  };

  console.log(businessSector, "idname", personName);

  let peter = []
  const handleSelectChange = (event) => {
    console.log(businessSector, "business", event);
    console.log("==============++++=======");
    console.dir(event);

    console.log(personName, "pouytewson");
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    personName.map(ind=>{
      businessSector.map(obj=>{
        if (ind === obj.name){
          console.log(obj.id, 'the next id');
          peter.push(obj.id)
          console.log(peter, 'peter')
        }
      })
    })
  };
  // const handleSelectChange = (e) => {
  //   setPersonName(Array.isArray(e) ? e.map(x => x.value) : []);
  // }
  // console.log('person name', personName);
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={msg ? open : false}
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
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
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
                onChange={(e) => setLastName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setBusinessCategory(e.target.value)}
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
                onChange={(e) => setInterest(e.target.value)}
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
                onChange={(e) => handleStakeholderType(e)}
                value={stakeholderTypeId}
                name="stakeholder_type"
                // error={!!touched.country && !!errors.country}
                // helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 2" }}
                // onClick={setCountriesId(values.country)}
              >
                {stakeholderTypes.map((holder, index) => (
                  <MenuItem value={holder.id} key={holder.id}>
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
                onChange={(e) => setJobTitle(e.target.value)}
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
                onChange={(e) => setPostalCode(e.target.value)}
                value={postalCode}
                name="postalCode"
                // error={!!touched.postalCode && !!errors.postalCode}
                // helperText={touched.postalCode && errors.postalCode}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                // onBlur={handleBlur}
                onChange={(e) => setPhoneNumber(e.target.value)}
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

                onChange={(e) => setAddress(e.target.value)}
                value={address}
                name="address"
                // error={!!touched.address && !!errors.address}
                // helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              {/* <FormControl sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Business Sector
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  fullWidth
                  // itemID={personName}
                  // key={personName}
                  // name={personName}
                  onChange={(e) => handleSelectChange(e)}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.id} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {businessSector.map((name, index) => 
                    
                    (
                      <MenuItem
                        key={name}
                        value={name}
                        // id={name.id}
                        // name={name.id}
                        // style={getStyles(name, personName, theme)}
                      >
                        {name.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl> */}
               <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleSelectChange}
          input={<OutlinedInput label="Business Sector" />}
          renderValue={(selected) =>  selected.join(", ")}
          MenuProps={MenuProps}
        >
          {businessSector.map((name) => (
            <MenuItem key={name.id} value={name.name}>
              <Checkbox checked={personName.indexOf(name.name) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
              {/* <Select
              className="dropdown"
              placeholder="Select Option"
              value={busy.filter(obj => personName.includes(obj.value))} // set selected values
              options={busy} // set list of the data
              onChange={handleSelectChange} // assign onChange function
              isMulti
              isClearable
            >

            {personName && <div style={{ marginTop: 20, lineHeight: '25px' }}>
              <div><b>Selected Value: </b> {JSON.stringify(personName, null, 2)}</div>
            </div>}
            </Select> */}

              <TextField
                fullWidth
                variant="filled"
                type="text"
                select
                label="Country"
                onChange={(e) => handleCountry(e)}
                name="country"
                sx={{ gridColumn: "span 4" }}
                value={countriesId}
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
                value={statesId}
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
                value={cityId}
              >
                {city.map((cit, index) => (
                  <MenuItem value={cit.pk} key={cit.pk}>
                    {cit.city}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <LoadingButton
                type="submit"
                loading={loadingBtn}
                color="secondary"
                variant="contained"
                className="btn btn-large"
                onClose={handleCloseModal}
                // onClick={}
              >
                Edit Stakeholder
              </LoadingButton>
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
