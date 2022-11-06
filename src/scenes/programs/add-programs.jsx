import * as React from 'react';
import { Box, Button, IconButton, Typography, useTheme, TextField, Snackbar, TextareaAutosize } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';

import Stack from '@mui/material/Stack';
import { red } from '@mui/material/colors';


const AddProgram = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("")

    const [programDescription, setProgramDescription] = useState("")
    const [programName, setProgramName] = useState("")
    const [organizerSponsor, setOrganizerSponsor] = useState("")
    const [loadingBtn, setLoadingBtn] =  useState(false)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {addProgram, success, error, clearSuccess, clearError} = useContext(AuthContext)

    const [value, setValue] = useState(dayjs('02-05-2019').format('dd/MM/YYYY'));

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };


    // console.log('longest', success, error);


    useEffect(() => {
      if(success) {
        // setMsg(success)
        // setOpen(true);
        setLoadingBtn(false)

        // setInterval(() => {
        //   clearSuccess()
          
        // }, 6000);
      }
      if (error)  {
        setMsg(error)
        setOpen(true);
        setLoadingBtn(false)
        setInterval(() => {
          clearError()
          
        }, 6000);
               
        

      }
    }, [success, error])

    

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const handleSubmit = (e) => {
        e.preventDefault()
        // // console.log(programName, value);
        // [values].map(value => {
          setLoadingBtn(true)
        addProgram({
            program_name : programName,
            organizer_sponsor : organizerSponsor,
            program_description : programDescription,
            date_approved : value.format('MM/DD/YYYY'),
        })
        // })
        // // console.log(values);
    };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Add Program" subtitle="Add your stakeholders to a program" />

      </Box>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={open? open : false}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        anchorOrigin= {{ vertical: 'top', horizontal: 'center' }}
      />

      <Box 
        sx={{ width: "600px", margin: "auto", marginTop: "70px", padding: "50px", boxShadow: "rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem" }}
        >
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
                    sx={{ gridColumn: "span 4", borderBottom: "1px solid #122582", color: "#000 !important" }}
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
                    sx={{ gridColumn: "span 4", color: red, }}
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
                <LoadingButton loading={loadingBtn} type="submit" color="secondary" variant="contained">
                    Add Programs
                </LoadingButton>
                </Box>
            </form>
            {/* )}
        </Formik> */}
      </Box>
    </Box>
    )
}

export default AddProgram

const checkoutSchema = yup.object().shape({
    organizerSponsor: yup.string().required("Organizer Sponsor is required"),
    programDescription: yup.string().required("Description is required"),
    // dateApproved: yup.string().required("Invalid Date required"),
    programName: yup.string().required("Program name is required"),
    
  });
  const initialValues = {
    organizerSponsor: "",
    programDescription: "",
    // dateApproved: "",
    programName: "",
  };