import { Box, Button, IconButton, Typography, useTheme, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const UserList = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [stakeHolderVar, setStakeHolderVar] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)
    const [msg, setMsg] = useState("")

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {authTokens, success} = useContext(AuthContext)

    useEffect(()=> {
        if(success){
            // setMsg(success)
            alert(success)

        }else{
            setMsg(null)
        }
    }, [success])

    console.log('lol', stakeHolderVar);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
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
      ];

    useEffect(() => {

        let stakeHolders = async () => {
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
      stakeHolders()
    
      }, [authTokens])

    
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="All Admin User" subtitle="all system admin" />

        <Box>
          <Link to="/add-user">
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
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
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoaded}
          rows={stakeHolderVar}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
    )
}

export default UserList