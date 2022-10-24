import * as React from 'react';
import { Box, Button, IconButton, Typography, useTheme, TextField, Snackbar, TextareaAutosize } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
<<<<<<< Updated upstream
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
=======
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
>>>>>>> Stashed changes
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';

const AddProgram = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("")
<<<<<<< Updated upstream
=======

    const [programDescription, setProgramDescription] = useState("")
    const [programName, setProgramName] = useState("")
    const [organizerSponsor, setOrganizerSponsor] = useState("")
>>>>>>> Stashed changes

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {addProgram, success} = useContext(AuthContext)

<<<<<<< Updated upstream
    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
=======
    const [value, setValue] = useState(dayjs('02-05-2019').format('dd/MM/YYYY'));

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };

    console.log('longest');
>>>>>>> Stashed changes


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

<<<<<<< Updated upstream
    const handleFormSubmit = (values) => {
        // values.preventDefault()
        [values].map(value => {
        addProgram({
            program_name : value.programName,
            organizer_sponsor : value.organizerSponsor,
            program_description : value.programDescription,
            date_approved : value.dateApproved,
        })
        })
        console.log(values);
=======
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(programName, value);
        // [values].map(value => {
        addProgram({
            program_name : programName,
            organizer_sponsor : organizerSponsor,
            program_description : programDescription,
            date_approved : value.format('MM/DD/YYYY'),
        })
        // })
        // console.log(values);
>>>>>>> Stashed changes
    };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Add Program" subtitle="Add your stakeholders to a program" />

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
<<<<<<< Updated upstream
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
=======

            <form onSubmit={e=>handleSubmit(e)}>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.programName}
                    name="programName"
                    error={!!touched.programName && !!errors.programName}
                    helperText={touched.programName && errors.programName}
=======
                    // onBlur={handleBlur}
                    onChange={e=>setProgramName(e.target.value)}
                    value={programName}
                    // value={values.programName}
                    name="programName"
                    // error={!!touched.programName && !!errors.programName}
                    // helperText={touched.programName && errors.programName}
>>>>>>> Stashed changes
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Organizer Sponsor"
<<<<<<< Updated upstream
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.organizerSponsor}
                    name="organizerSponsor"
                    error={!!touched.organizerSponsor && !!errors.organizerSponsor}
                    helperText={touched.organizerSponsor && errors.organizerSponsor}
=======
                    // onBlur={handleBlur}
                    onChange={e=>setOrganizerSponsor(e.target.value)}
                    value={organizerSponsor}
                    name="organizerSponsor"
                    // error={!!touched.organizerSponsor && !!errors.organizerSponsor}
                    // helperText={touched.organizerSponsor && errors.organizerSponsor}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.programDescription}
                    name="programDescription"
                    error={!!touched.programDescription && !!errors.programDescription}
                    helperText={touched.programDescription && errors.programDescription}
=======
                    // onBlur={handleBlur}
                    onChange={e=>setProgramDescription(e.target.value)}
                    value={programDescription}
                    name="programDescription"
                    // error={!!touched.programDescription && !!errors.programDescription}
                    // helperText={touched.programDescription && errors.programDescription}
>>>>>>> Stashed changes
                    sx={{ gridColumn: "span 4" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={10}>
                        <DesktopDatePicker
                            fullWidth
                            label="Date desktop"
                            value={value}
                            inputFormat="MM/DD/YYYY"
                            name="dateApproved"
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
<<<<<<< Updated upstream
                            error={!!touched.programDescription && !!errors.programDescription}
                            helperText={touched.programDescription && errors.programDescription}
=======
                            // error={!!touched.programDescription && !!errors.programDescription}
                            // helperText={touched.programDescription && errors.programDescription}
>>>>>>> Stashed changes
                            sx={{ gridColumn: "span 4" }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                    Add Program
                </Button>
                </Box>
            </form>
<<<<<<< Updated upstream
            )}
        </Formik>
=======
            {/* )}
        </Formik> */}
>>>>>>> Stashed changes
      </Box>
    </Box>
    )
}

export default AddProgram

const checkoutSchema = yup.object().shape({
    organizerSponsor: yup.string().required("Organizer Sponsor is required"),
    programDescription: yup.string().required("Description is required"),
<<<<<<< Updated upstream
    dateApproved: yup.string().required("Invalid Date required"),
=======
    // dateApproved: yup.string().required("Invalid Date required"),
>>>>>>> Stashed changes
    programName: yup.string().required("Program name is required"),
    
  });
  const initialValues = {
    organizerSponsor: "",
    programDescription: "",
<<<<<<< Updated upstream
    dateApproved: "",
=======
    // dateApproved: "",
>>>>>>> Stashed changes
    programName: "",
  };