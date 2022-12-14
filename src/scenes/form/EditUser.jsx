import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Snackbar, Box, TextField, MenuItem, useMediaQuery, Typography, 
    Select,
    OutlinedInput,
  InputLabel,
  FormControl,
  Input, 
  Chip,

} from "@mui/material";
// import Select from "react-select";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom"
import { LoadingButton } from '@mui/lab';


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };


export default function EditStakeholder({
  openModal,
  handleCloseModal,
  handleStakeEdit,
  rowId,
}) {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [userPermission, setUserPermission] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [msg, setMsg] = useState("");
  const [personName, setPersonName] = useState([]);
  const [permList, setPermList] = useState([])

  const classes = useStyles();
  const theme = useTheme();
  
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


  // useEffect(()=> {

    // userPermission.map(perm=> {
  //     personName.map(name=> {
  //       if ((name in perm) ) {
  //         permList.push(perm)
  //       }
  //     })
  //   })
    
  // }, [permList])
  
  // console.log('halo', permList);

  useEffect(() => {
    const getPermission = async () => {
      try {
        const getPermissionData = await fetch(
          `${process.env.REACT_APP_BASE_API_KEY}/auth/sys/permission`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens.token.access,
            },
          }
        );
        const permissionJson = await getPermissionData.json();
        // console.log(permissionJson, "ppp");
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
    let stakeHolders = async () => {
      // // console.log('POPO BIG CODE', rowId);
      if(authTokens){
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/auth/user/profile/${rowId.id}`,
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
      setGender(data["data"].gender);
      setEmail(data["data"].email);
      setPersonName(data["data"].user_permission2.map(ind=>ind.codename))
    
      if (response.ok) {
        setIsLoaded(false);
        // // console.log("DATA IS POWER", stakeholderVar);
        // setFirstName(stakeholderVar.first_name)
      }
      // // console.log(data, "data", 'BIG DATA NEX TITME ');
      }else{
          alert("something went wro")
      }
    };
    stakeHolders()
  
    // return () => {
    //   second
    // }
  }, [rowId])

  const handleSelectChange = (event) => {
    // setPersonName(event.target.value);
  
    // setPersonName(value);
    
    
    
    const {
      target: { value },
    } = event;
    console.log(personName, 'PERSON NAME ', event.target.value);
    // console.log(value, 'edit user', typeof value, value.map(ind=>ind.name));
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
      );
    //   console.log(event.target.value, 'targeter value', personName);
     
    // const { options } = event.target;
    // const value = [];
    // for (let i = 0, l = options.length; i < l; i += 1) {
    //   if (options[i].selected) {
    //     value.push(options[i].value);
    //   }
    // }
    // setPersonName(value);
    }



  

 

  // // console.log('HIGHEER ID IN THE MAKEING ', nRow)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // // console.log('NROWERS', nRow);
      // // console.log(e, 'i am form to handle')
      setLoadingBtn(true)
    if (rowId) {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/auth/users/update/${rowId.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name:  lastName ,
            gender: gender,
            user_permissions: personName.map((ind) => ind),
            email: email,
            
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
        handleCloseModal()
        window.location.reload(true);
        
        // navigate('/user-list')
      } else {
        //   console.log(data);
        setOpen(true);
        setLoadingBtn(false)
        setMsg(data.message);
        // setInterval(() => {
        //   clearError()
        // }, 3000);
      }
    }
  };
  // console.log('datetetewtersgt', personName);

  

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
       
        <DialogTitle id="alert-dialog-title">{"Edit User"}</DialogTitle>
        
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
                  type="text"
                  label="First Name"
                  // onBlur={handleBlur}
                  onChange={e=>setFirstName(e.target.value)}
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
                  disabled
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
                  disabled
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
                {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                <Select
                  multiple
                  value={personName}
                  onChange={handleSelectChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip key={value.id} label={value.name} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {userPermission.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
                {/* <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple">User Permission</InputLabel>
                <Select
                  multiple
                  value={personName}
                  onChange={e=>handleSelectChange(e)}
                  input={<Input id="select-multiple" />}
                  MenuProps={MenuProps}
                >
                  {userPermission.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
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
                  Update User
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
