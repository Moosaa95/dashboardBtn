import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataStackholders } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stakeHolderVar, setStakeHolderVar] = useState([])
  const [isLoaded, setIsLoaded] = useState(true)


  console.log('ikloio');

  const {authTokens} = useContext(AuthContext)



  console.log('lol', stakeHolderVar);

  useEffect(() => {

    let stakeHolders = async () => {
      // if(authTokens){
          let response = await fetch('https://nest-srm.up.railway.app/stakeholder-list?stakeholder_create_from=10/19/2022&stakeholder_created_to=10/20/2022', {
              method:"GET", 
              headers: {
                  'Content-Type' : 'application/json',
                  'Authorization' : 'Bearer ' + authTokens.token.access
              },

          })
          let data = await response.json()
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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "first_name",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      type: "text",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of StakeHolders"
      />
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
  );
};

export default Contacts;
