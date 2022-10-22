import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Snackbar,
  Stack,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  Typography,
} from "@mui/material";
import { Form, Formik, Field, useFormik } from "formik";
import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
// import { useFormik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { useMediaQuery } from "@mui/material";


const SignUp = () => {
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [countriesId, setCountriesId] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState([]);
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [city, setCity] = useState([]);
  const [statesId, setStatesId] = useState("");
  const [state, setState] = useState([]);
  const [msg, setMsg] = useState("")

  

  const ref = useRef(null);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { registerUser, success, error, clearError, clearSuccess } = useContext(AuthContext);

  // console.log("hi", initialValues, "heyyo");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  useEffect(() =>{
    if (success) {
      setMsg(success)
      setOpen(true)
      clearSuccess();
    }
    else{
      setMsg(error)
      setOpen(true)
      clearError();

    }
  }, [error, success])

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
    if (statesId){
      console.log('hi i am inside states', statesId);
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

 
  const handleFormSubmit = (values, actions) => {
    console.log(values, "ation valeus");
    // values.preventDefault()
    [values].map((value) => {
      console.log(values, "jury values");
      registerUser({
        admin_email: value.adminEmail,
        admin_first_name: value.adminFirstName,
        address: value.address,
        password: value.password,
        phone_number: value.phoneNumber,
        company_email: value.companyEmail,
        company_name: value.companyName,
        country: value.country,
        state: value.state,
        gender: value.gender,
        admin_username: value.adminUsername,
        admin_last_name: value.adminLastName,
        city: value.city,
      });
    });
    actions.resetForm();
    console.log(values);
  };

   console.log('country id', statesId);
  // console.log(ref.current.values, 'lopghjnjk');

  return (
    <Box
      m="20px"
      display="flex"
      width="100%"
      justifyContent="center"
      alignItems="center"
      flexDirection="Column"
      color="#000"
      

    >
      <Snackbar
        
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        message={msg}
        key={'top_center'}
        color="#000"
        />
      <Header title="Registration" subtitle="Sign up a new user" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        innerRef={ref}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="190%"
              gap="30px"
              // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Box display="flex" mr="15px" justifyContent="space-between" width="100%" gap="20px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Admin First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adminFirstName}
                name="adminFirstName"
                error={!!touched.adminFirstName && !!errors.adminFirstName}
                helperText={touched.adminFirstName && errors.adminFirstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adminLastName}
                name="adminLastName"
                error={!!touched.adminLastName && !!errors.adminLastName}
                helperText={touched.adminLastName && errors.adminLastName}
                sx={{ gridColumn: "span 2" }}
              />
              </Box>
              <Box display="flex" mr="15px" justifyContent="space-between" width="100%" gap="20px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyEmail}
                name="companyEmail"
                error={!!touched.companyEmail && !!errors.companyEmail}
                helperText={touched.companyEmail && errors.companyEmail}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Company Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.companyName}
                name="companyName"
                error={!!touched.companyName && !!errors.companyName}
                helperText={touched.companyName && errors.companyName}
                sx={{ gridColumn: "span 2" }}
              />
              </Box>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Admin Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adminEmail}
                name="adminEmail"
                error={!!touched.adminEmail && !!errors.adminEmail}
                helperText={touched.adminEmail && errors.adminEmail}
                sx={{ gridColumn: "span 2" }}
              />
              <Box display="flex" mr="15px" justifyContent="space-between" width="100%" gap="20px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="admin Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.adminUsername}
                name="adminUsername"
                error={!!touched.adminUsername && !!errors.adminUsername}
                helperText={touched.adminUsername && errors.adminUsername}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                select
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="MALE">MALE</MenuItem>
                  <MenuItem value="FEMALE">FEMALE</MenuItem> 
              </TextField>
              </Box>
              <Box display="flex" mr="15px" justifyContent="space-between" width="100%" gap="20px">
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
              </Box>
              <Box display="flex" mr="15px" justifyContent="space-between" width="100%" gap="20px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={!!touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 4" }}
              />
              </Box>
              
              <Box
              display="flex"
              width="100%"
              gap="20px"
              >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                select
                label="Country"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name="country"
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: "span 2" }}
                onClick={setCountriesId(values.country)}
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name="state"
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: "span 2" }}
                onClick={setStatesId(values.state)}
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
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
                onClick={setCityId(values.city)}
              >
                {
                city.map((cit, index) => (
                  <MenuItem value={cit.pk} key={cit.pk}>
                    {cit.city}
                  </MenuItem>
                ))}
              </TextField>
              </Box>
            </Box>
            <Box display="flex" width="100%" mr="20px" justifyContent="space-between" mt="20px">
              <Button
                disabled={isSubmitting}
                type="submit"
                color="secondary"
                variant="contained"
                
              >
                Register
              </Button>
              <Typography>
                   or Already have an Account? 
                </Typography>
              <Link to="/login">
                 <Typography>
                   Sign in
                 </Typography>
              </Link>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const checkoutSchema = yup.object().shape({
  adminFirstName: yup.string().required("required"),
  adminLastName: yup.string().required("required"),
  adminEmail: yup.string().email("invalid email").required("required"),
  gender: yup.string().required("required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "please Create a Stronger Password" })
    .required("Required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  country: yup.string()
  .required("Required"),
  city: yup.string()
  .required("Required"),
  state: yup.string()
  .required("Required")
});
const initialValues = {
  adminFirstName: "",
  adminLastName: "",
  adminEmail: "",
  gender: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  country: "",
  address: "",
  // state : "",
  // city : ""
};

export default SignUp;
