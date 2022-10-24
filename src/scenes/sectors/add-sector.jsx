import { Box, Button, IconButton, Typography, useTheme, TextField, Snackbar } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";

const BusinessSector = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("")

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {addSector, success} = useContext(AuthContext)


    useEffect(() => {
      if(success) {
        // setMsg(success)
        alert(success)
      }
    }, [success])

    

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const handleFormSubmit = (values) => {
        // values.preventDefault()
        [values].map(value => {
        addSector({
            name : value.name,
        })
        })
        console.log(values);
    };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ALl Business Sector" subtitle="Add your stakeholder business sector" />

      </Box>
      <Button onClick={handleClick}>Open simple snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        
      />

      <Box 
        sx={{ width: "600px", margin: "auto", marginTop: "70px" }}
        >
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            sx={{padding: "50px",}}
        >
            {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            }) => (
            <form onSubmit={handleSubmit}>
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
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                />
                </Box>
<<<<<<< Updated upstream
                <Box display="flex" justifyContent="end" mt="20px">
=======
                <Box display="flex" justifyContent="center" mt="20px">
>>>>>>> Stashed changes
                <Button type="submit" color="secondary" variant="contained">
                    Add Business Sector
                </Button>
                </Box>
            </form>
            )}
        </Formik>
      </Box>
    </Box>
    )
}

export default BusinessSector

const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    
  });
  const initialValues = {
    name: "",
  };