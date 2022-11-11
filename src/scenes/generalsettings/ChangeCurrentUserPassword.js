import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {Snackbar, Box, TextField, MenuItem, useMediaQuery, Typography, 
    Select,
    OutlinedInput,
  InputLabel,
  FormControl,
  Chip,

} from "@mui/material";
// import Select from "react-select";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom"
import { LoadingButton } from '@mui/lab';



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


export default function ChangeCurrentUserPassword({
  passwordOpenModal,
  handlePasswordCloseModal,
  handleStakeEdit,
  rowId,
}) {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [msg, setMsg] = useState("");
  
//   const [nRow, setNRow] = useState() 
  
const [loadingBtn, setLoadingBtn] = useState(false);

const navigate  = useNavigate()

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const {
    addStakeHolder,
    error, 
    success,
    authTokens,
    clearError,
    clearSuccess,
  } = useContext(AuthContext);


 

  // // console.log('HIGHEER ID IN THE MAKEING ', nRow)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // // console.log('NROWERS', nRow);
      // // console.log(e, 'i am form to handle')
      setLoadingBtn(true)
    if (rowId) {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/auth/users/change-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
          body: JSON.stringify({
            old_password:currentPassword,
            new_password1:newPassword,
            new_password2 : confirmPassword
            
            
          }),
        }
      );
     

      let data = await response.json();
      
      // // console.log(data, "take seripous");
      // setStakeHolderVar(data["data"])
      if (response.ok) {
        // stakeHolders()
        // console.log(success, 'succeess');

        setOpen(true);
        setLoadingBtn(false)
        setMsg(data.message);
        handlePasswordCloseModal()
        window.location.reload();
        
        // navigate('/user-list')
      } else {
        //   console.log(data);
        setOpen(true);
        setLoadingBtn(false)
        setMsg(data.message);
      }
    }
  };

  

  return (
    <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg?open : false}
          onClose={handlePasswordCloseModal}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />
    
        <Dialog
        open={passwordOpenModal}
        onClose={handlePasswordCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogTitle id="alert-dialog-title">{"Change User Password"}</DialogTitle>
        
        <DialogContent>
        
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
                  type="password"
                  label="Current Password"
                  // onBlur={handleBlur}
                  onChange={e=>setCurrentPassword(e.target.value)}
                  value={currentPassword}
                  name="current_password"
                  // error={!!touched.firstName && !!errors.firstName}
                  // helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="New Password"
                  // onBlur={handleBlur}
                  onChange={e=>setNewPassword(e.target.value)}
                  value={newPassword}
                  name="new_password"
                  // error={!!touched.lastName && !!errors.lastName}
                  // helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="Password"
                  label="confirm password"
                  // onBlur={handleBlur}
                  onChange={e=>setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  name="confirm_password"
                  // error={!!touched.email && !!errors.email}
                  // helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                
              
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <LoadingButton
                  loading={loadingBtn}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Change Password
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
