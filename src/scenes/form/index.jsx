import {
  Box,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  FormControl,
  Select,
  InputLabel,
  OutlinedInput,
  Chip, 

} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

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

const Form = () => {
  const [userPermission, setUserPermission] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [open, setOpen] = useState(true);
  const [msg, setMsg] = useState("");
  const [personName, setPersonName] = useState([]);
  const [lastName, setLastName] = useState("")
  const [firstName, setFirsName] = useState("")
  const [gender, setGender] = useState("")
  const [email, setEmail] = useState("")
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();

  const { addUser, success, error, clearSuccess, clearError, authTokens } =
    useContext(AuthContext);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const getPermissionData = await fetch(
          "https://nest-srm.up.railway.app/auth/sys/permission",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens.token.access,
            },
          }
        );
        const permissionJson = await getPermissionData.json();
        console.log(permissionJson, "ppp");
        setUserPermission(await permissionJson["data"]);
        if (getPermissionData.ok) {
        }
      } catch (error) {
        // setErrorMessage(error);
      }
    };
    getPermission();
  }, []);

  useEffect(() => {
    if (success) {
      // // console.log('hihhh', success)
      // setMsg(success);
      setLoadingBtn(false);
      // setOpen(true);
      // clearSuccess();
      // navigate("/user-list");
    } else {
      setMsg(error);
      setLoadingBtn(false);
      // setLoadingBtn(false);
      setOpen(true);
      // clearError();
      setInterval(() => {
        clearError();
      }, 6000);
    }
  }, [error, success]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = (values) => {
    values.preventDefault()
    setLoadingBtn(true)
    // [values].map((value) => {
      addUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        gender: gender,
        user_permissions:personName.map(ind=>ind)
      });
    // });
    // console.log(personName, 'USER VALUES');
  };

  const handleSelectChange = (event) => {
    // // console.log(businessSector);
    // console.log(event, 'i ama an event', event, 'EVENET');
    
    const {
      target: { value },
    } = event;
    
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
      );
     
    }
  

  return (
    <Box m="20px" backgroundColor="#fff" width="100%" height="100%">
      {msg && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          message={msg}
          key={"top_center"}
        />
      )}
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Box sx={{ width: "800px", margin: "auto", marginTop: "70px", padding: "50px", boxShadow: "rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem" }}>
        {/* <Formik
          onSubmit={e=>handleFormSubmit(e)}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => ( */}
            <form onSubmit={e=>handleFormSubmit(e)}>
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
                  onChange={e=>setFirsName(e.target.value)}
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
                  name="lastName"
                  // error={!!touched.lastName && !!errors.lastName}
                  // helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  // onBlur={handleBlur}
                  onChange={e=>setEmail(e.target.value)}
                  value={email}
                  name="email"
                  // error={!!touched.email && !!errors.email}
                  // helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  select
                  label="Gender"
                  // onBlur={handleBlur}
                  onChange={e=>setGender(e.target.value)}
                  value={gender}
                  name="gender"
                  // error={!!touched.gender && !!errors.gender}
                  // helperText={touched.gender && errors.gender}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="MALE">MALE</MenuItem>
                  <MenuItem value="FEMALE">FEMALE</MenuItem>
                </TextField>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-chip-label">
                    User Permission
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    // itemID={personName}
                    // key={personName}
                    // name={personName}
                    onChange={e=>handleSelectChange(e)}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        {selected.map((value, index) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {userPermission.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        // id={name.id}
                        // name={name.id}
                        // style={getStyles(name, personName, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <LoadingButton
                  loading={loadingBtn}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Create User
                </LoadingButton>
              </Box>
            </form>
          {/* )}
        </Formik> */}
      </Box>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  gender: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
};

export default Form;
