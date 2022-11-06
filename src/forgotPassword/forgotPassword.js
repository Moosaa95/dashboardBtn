import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Snackbar,
} from "@mui/material";
// import { tokens } from "../../theme";
import { tokens } from "../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../scenes/context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../components/Header";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [msg, setMsg] = useState("")
  const [open, setOpen] = useState(false);

  const { forgotPassword, success, clearSuccess, error, clearError } =
    useContext(AuthContext);

    // console.log('SUCCESS', success, 'ERROR', error);

    useEffect(() => {
      if (success){
        // console.log('insider');
          setLoadingBtn(false)
        setMsg(success)
        setOpen(true)
        setInterval(() => {
          clearSuccess()
          
        }, 7000);
      }else{
        setLoadingBtn(false)
        // setMsg(error)
        setMsg(error)
        setOpen(true)
      }
    }, [error, success])


  const handleFormSubmit = (e) => {
    setLoadingBtn(true)
    e.preventDefault()
    // console.log(values, '=============');
    console.log('MESSAGE', msg);
    forgotPassword({
        usernameoremail: username,
      });
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
   
  return (
    <Box m="20px"
    backgroundColor="#292929"
      width="100%"
      height="100%"
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box mb="30px">
      <Typography
        variant="h2"
        color="#fff"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Password Reset
      </Typography>
      <Typography variant="h5" color="#eee">
        forgot password
      </Typography>
    </Box>
      </Box>
      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg?open:false}
          onClose={handleClose}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />

      <Box sx={{ width: "600px", margin: "auto", marginTop: "70px" }}>
        
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
                  label="email or username"
                  // onBlur={handleBlur}
                  onChange={e=>setUsername(e.target.value)}
                  value={username}
                  name="name"
                  // error={!!touched.name && !!errors.name}
                  // helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" mt="20px" mr="30px">
                <LoadingButton
                  loading={loadingBtn}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Submit
                </LoadingButton>
                <Link to="/login"
                  // color="#fff"
                  // variant="contained"
                >
                  Login
                </Link>
              </Box>
            </form>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

// const checkoutSchema = yup.object().shape({
//   name: yup.string().required("required"),
// });
// const initialValues = {
//   name: "",
// };
