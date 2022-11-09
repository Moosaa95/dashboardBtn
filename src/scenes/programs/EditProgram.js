import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Snackbar,  Box,Stack,  TextField, MenuItem,useTheme, useMediaQuery } from "@mui/material";
import Select from "react-select";
import AuthContext from "../context/AuthContext";
import { tokens } from "../../theme";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';




export default function EditProgram({
  openModal,
  handleCloseModal,
  handleStakeEdit,
  rowId
}) {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [msg, setMsg] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [programDescription, setProgramDescription] = useState("")
    const [programName, setProgramName] = useState("")
    const [organizerSponsor, setOrganizerSponsor] = useState("")
    const [rolling, setRolling] = useState({...rowId});
    const [loadingBtn, setLoadingBtn] =  useState(false)
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {addProgram, success, error, clearSuccess, clearError} = useContext(AuthContext)

    const [value, setValue] = useState(dayjs('02-05-2019').format('dd/MM/YYYY'));

 
    const {authTokens} = useContext(AuthContext)
    const handleSubmit = async(e) => {
      console.log('pass');
      e.preventDefault()

      if (rowId) {
        let response = await fetch(
          `${process.env.REACT_APP_BASE_API_KEY}/program-update/${rowId.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens.token.access,
            },
            body: JSON.stringify({
              program_name: rolling.program_name,
              organizer_sponsor:  rolling.organizer_sponsor ,
              program_description: rolling.program_description,
              date_approved: rolling.date_approved,
              
            }),
          }
        );
       
        let data = await response.json();
        
        if (response.ok) {
          // console.log(response, "erresponse", data);
          // e.target.reset()
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
  

    // if (rowId){
    //   setRolling({...rowId})
    // }

    console.log('get row er ', rowId, rolling, 'pop')

  return (
    <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          // open={msg?open : false}
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
       
        <DialogTitle id="alert-dialog-title">{"Edit Program"}</DialogTitle>
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
                    onChange={e=>setRolling(d=>({...d, program_name:e.target.value}))}
                    value={rolling?.program_name}
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
                    onChange={e=>setRolling(d=>({...d, organizer_sponsor:e.target.value}))}
                    value={rolling?.organizer_sponsor}
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
                    onChange={e=>setRolling(d=>({...d, program_description:(e.target.value)}))}
                    value={rolling?.program_description}
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
                            // value={rolling?.date_approved}
                            value={value}
                            name="dateApproved"
                            onChange={(newValue) => {
                                setValue(newValue);

                            }}
                            // onChange={e=>setRolling(d=>({...d, date_approved:(e.target.value)}))}
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
                    update Programs
                </LoadingButton>
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
