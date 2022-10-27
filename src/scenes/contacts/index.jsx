import { Box, Button, Snackbar, Snack, Alert } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataStackholders } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Stakeholders } from "./Stakeholders";
import EditStakeholder from "./EditStakeholder";
import { useMediaQuery } from "@mui/material";



const StakeHolders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stakeHolderVar, setStakeHolderVar] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [rowId, setRowId] = useState({});
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [ openModal, setOpenModal ] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [stakeHolderVarCopy, setStakeHolderVarCopy] = useState([])

  


const handleClickModal = () => {
    setOpenModal(true);
  };

const handleCloseModal = () => {
    setOpenModal(false);
    stakeHolders()
  };
const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    
  };
  console.log("ikloio");

  const { authTokens } = useContext(AuthContext);

  let stakeHolders = async () => {
    // if(authTokens){
    let response = await fetch(
      "https://nest-srm.up.railway.app/stakeholder-list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens.token.access,
        },
      }
    );
    let data = await response.json();
    setStakeHolderVar(data["data"]);
    if (response.ok) {
      setIsLoaded(false);
    }
    console.log(data, "data");
    // }else{
    //     alert("something went wro")
    // }
  };

  useEffect(() => {
    stakeHolders();
  }, [authTokens]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, hide: true },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "index",
      headerName: "S/N",
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1
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
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      renderCell: (params) => <Stakeholders {...{ params, handleDelete, handleClickModal, stakeHolders, handleStakeEdit}} />,
    },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];

  const handleDelete = async (param) => {
    // console.log(param.id, "this is the time");
    // setRowId(param.id)
    if (param) {
      let response = await fetch(
        `https://nest-srm.up.railway.app/stakeholder-delete/${param.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
        }
      );
      let data = await response.json();
      console.log(data, "take seripous");
      // setStakeHolderVar(data["data"])
      if (response.ok) {
        console.log(response, "erresponse");
        stakeHolders();
        // setIsLoaded(false);
        setMsg(data["message"]);
        setOpen(true);
      } else {
        setMsg(data["message"]);
      }
      console.log(data, "data");
    }
  };

  const handleStakeEdit = async (param) => {
    // param.preventDefault()
    console.log('i am stake edit', param);
    setRowId(param)
    handleClickModal()
    
  }

  

  



  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg?open : false}
          onClose={handleClose}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />
        <Header title="STAKEHOLDERS" subtitle="List of StakeHolders" />
        <Link to="/add-stakeholder">
          <Button color="secondary" variant="contained">
            Add Stakeholder
          </Button>
        </Link>
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
      <EditStakeholder openModal={openModal} handleCloseModal={handleCloseModal} rowId={rowId} stakeholders={stakeHolders} />
    </Box>
  );
};

export default StakeHolders;
