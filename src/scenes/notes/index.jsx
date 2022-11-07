import { Box, Button, IconButton, Typography, useTheme, TextField, Snackbar } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import UserDialog from "./UserDialog";
import EditUser from "./EditUser";

const UserList = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [note, setNote] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)
    const [pageSize, setPageSize] = useState(50);
    const [msg, setMsg] = useState("")
    const [rowId, setRowId] = useState({});
const [open, setOpen] = useState(false);
const [openModal, setOpenModal] = useState(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {authTokens, success, clearSuccess} = useContext(AuthContext)

    // useEffect(()=> {
    //     if(success){
    //         // setMsg(success)
    //         // alert(success)

    //     }else{
    //         setMsg(null)
    //     }
    // }, [success])

    const handleClickModal = () => {
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  
    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpen(false);
    };
  


  useEffect(() => {
    if (success) {
      setMsg(success);
      setOpen(true);
      setInterval(() => {
        clearSuccess();
      }, 6000);
      // alert(success)
    }
    // else{
    //     setMsg(null)
    // }
  }, [success]);

  const handleDelete = async (param) => {
    // //console.log(param.id, "this is the time");
    // setRowId({...param}.id)
    if (param) {
      let response = await fetch(
        `https://nest-srm.up.railway.app/user-delete/${param.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
        }
      );
      let data = await response.json();
      //console.log(data, "take seripous");
      // setStakeHolderVar(data["data"])
      if (response.ok) {
        // //console.log(response, "erresponse");
        stakeHolders()
        ();
        // setIsLoaded(false);
        setMsg(data["message"]);
        setOpen(true);
      } else {
        setMsg(data["message"]);
      }
      // //console.log(data, "data");
    }
  };

  const handleUserEdit = async (param) => {
    // param.preventDefault()
    //console.log('i am stake edit', param.id);
    setRowId({ ...param });
    handleClickModal();
  };


    // console.log('lol', stakeHolderVar);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5, hide:true },
        {
          field: "index",
          headerName: "S/N",
          renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
        },
        // { field: "registrarId", headerName: "Registrar ID" },
        {
          field: "username",
          headerName: "Username",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
            field: "first_name",
            headerName: "First Name",
            flex: 1,
            cellClassName: "name-column--cell",
          },
          {
            field: "last_name",
            headerName: "Last Name",
            flex: 1,
            cellClassName: "name-column--cell",
          },
          {
            field: "email",
            headerName: "Email",
            flex: 1,
            cellClassName: "name-column--cell",
          },
          {
          field: "actions",
          headerName: "Actions",
          type: "actions",
          width: 150,
          renderCell: (params) => (
            <UserDialog
              {...{
                params,
                handleDelete,
                handleUserEdit,
                handleClickModal,
                // stakeHolders,
                // handleStakeEdit,
              }}
            />
          ),
        },
      ];

      let noteStake = async () => {
        // if(authTokens){
            let response = await fetch('https://nest-srm.up.railway.app/auth/users/', {
                method:"GET", 
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + authTokens.token.access
                },
  
            })
            let data = await response.json()
            console.log("user", data, 'nowowowo');
            setStakeHolderVar(data["data"])
            if (response.ok){
              setIsLoaded(false)
            }
            console.log(data, 'data');
        // }else{
        //     alert("something went wro")
        // }
        
    }

    useEffect(() => {

        
      noteStake()
    
      }, [authTokens])

    

      
  return (
    <Box m="20px">

<Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg ? open : false}
          onClose={handleClose}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="All Admin User" subtitle="all system admin" />

        <Box>
          <Link to="/add-user">
            <Button color="secondary" variant="contained" sx={{ padding: "10px 20px", }}>
              <PersonAddIcon sx={{ mr: "10px" }} />
              Add User
            </Button>
          </Link>
        </Box>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"

        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: "#6E6B7B",
            fontWeight: "edium",
          },
          "& .name-column--cell": {
            color: "#6E6B7B",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            color: "#5E5873",
            borderBottom: "none",
            fontSize: "16px",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#5B5B5B",
            color: "#5E5873",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.12)",
          padding: "30px 20px 30px 20px",
          borderRadius: "10px",
          backgroundColor: "#F6F7F8"
        }}
      >
        <DataGrid
          loading={isLoaded}
          rows={stakeHolderVar}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          
        />
      </Box>
      <EditUser 
      openModal={openModal}
      handleCloseModal={handleCloseModal}
      rowId={rowId}
      />
    </Box>
    )
}

export default UserList
