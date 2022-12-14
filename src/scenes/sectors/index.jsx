import { Box, Button, IconButton, Typography, useTheme, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Add, Download } from "@mui/icons-material";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Sectors = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [stakeHolderVar, setStakeHolderVar] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)
    const [msg, setMsg] = useState("")

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [pageSize, setPageSize] = useState(100);
    const {authTokens, success} = useContext(AuthContext)

    useEffect(()=> {
        if(success){
            // setMsg(success)
            alert(success)

        }else{
            setMsg(null)
        }
    }, [success])

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
          field: "name",
          headerName: "Business Sector Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
      ];

    useEffect(() => {

        let stakeHolders = async () => {
          // if(authTokens){
              let response = await fetch(`${process.env.REACT_APP_BASE_API_KEY}/business-sector`, {
                  method:"GET", 
                  headers: {
                      'Content-Type' : 'application/json',
                      'Authorization' : 'Bearer ' + authTokens.token.access
                  },
    
              })
              let data = await response.json()
              // console.log("user", data, 'nowowowo');
              setStakeHolderVar(data["data"])
              if (response.ok){
                setIsLoaded(false)
              }
              // console.log(data, 'data');
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
        <Header title="All Business Sector" subtitle="Stakeholder Business Sector" />

        <Box>
          <Link to="/add-sector">
            <Button color="secondary" variant="contained" sx={{ padding: "10px 20px", }}>
            <Add sx={{ mr: "10px" }} />
              Add Business Sector
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
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          loading={isLoaded}
          rows={stakeHolderVar}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={pageSize}
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
    </Box>
    )
}

export default Sectors

const checkoutSchema = yup.object().shape({
    name: yup.string().required("Business sector is required"),
    
  });
  const initialValues = {
    name: "",
  };