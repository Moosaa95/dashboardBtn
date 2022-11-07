import { Box, Button, Snackbar } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataStackholders } from "../../data/mockData";
import { Link } from "react-router-dom";
import { SaveOutlined } from "@mui/icons-material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ProjectDialog from "./ProjectDialog";
import moment from "moment/moment";
import dayjs from "dayjs";
import { Add, Download } from "@mui/icons-material";
import UpdateProject from "./UpdateProject";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [projectVar, setProjectVar] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [msg, setMsg] = useState("")
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [rowId, setRowId] = useState();

  // console.log("ikloio");

  const { authTokens, success, clearSuccess } = useContext(AuthContext);

  // console.log('lol', stakeHolderVar);

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


  let project = async () => {
    // if(authTokens){
    let response = await fetch(
      "https://nest-srm.up.railway.app/project-list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens.token.access,
        },
      }
    );
    let data = await response.json();
    setProjectVar(data["data"]);
    if (response.ok) {
      setIsLoaded(false)
      
    }
    console.log(data, "data");
    // }else{
    //     alert("something went wro")
    // }
  };

  useEffect(() => {
    
  project();
}, [authTokens]);


const handleClose = (event, reason) => {
  // if (reason === "clickaway") {
  //   return;
  // }

  setOpen(false);
};

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, hide: true },
    {
      field: "index",
      headerName: "S/N",
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "program",
      headerName: "Program",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "project_code",
      headerName: "Project Code",
      type: "text",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "project_name",
      headerName: "Project Name",
      flex: 1,
    },
    {
      field: "project_manager_email",
      headerName: "Project Manager Eamil",
      flex: 1,
    },
    {
      field: "project_manager",
      headerName: "Project Manager",
      flex: 1,
    },
    {
      field: "notify_project_manager",
      headerName: "Notify Project Manager",
      flex: 1,
    },
    // {
    //   field: "name",
    //   headerName: "Tenant",
    //   flex: 1,
    // },
    // {
    //   field: "start_date",
    //   headerName: "Start Date",
    //   flex: 1,
    //   cellClassName: "name-column--cell1",
    //   valueFormatter: (params) => (
    //     console.log(params, 'date params')
    //     // moment(params?.value).format("DD-MM-YYYY"),
    //   )
    // },

    {
      field: "end_date",
      headerName: "End Date",
      flex: 1,
      cellClassName: "name-column--cell",
      valueFormatter: (params) => moment(params?.value).format("DD-MM-YYYY"),
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      renderCell: (params) => (
        <ProjectDialog {...{ params, handleDelete, handleProjectEdit }} />
      ),
    },
  ];

  const handleDelete = async (param) => {
    // console.log(param.id, "this is the time");
    // setRowId(param.id)
    if (param) {
      let response = await fetch(
        `https://nest-srm.up.railway.app/project-delete/${param.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
        }
      );
      let data = await response.json();
      // console.log(data, "take seripous");
      // setStakeHolderVar(data["data"])
      if (response.ok) {
        // console.log(response, "erresponse");
        project();
        // setIsLoaded(false);
        setMsg(data["message"]);
        setOpen(true);
      } else {
        setMsg(data["message"]);
      }
      // console.log(data, "data");
    }
  };
  const handleClickModal = () => {
    setOpenModal(true);
  };

  const handleProjectEdit = async (param) => {
    // console.log("ENGAGEMENT, ", param)
    setRowId(param);
    handleClickModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
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
        <Header title="All Projects" subtitle="All your Project" />

        <Box>
          <Link to="/add-project">
            <Button color="secondary" variant="contained" sx={{ padding: "10px 20px", }}>
            <Add sx={{ mr: "10px" }} />
              Add Project
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
          rows={projectVar}
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
      <UpdateProject 
      openModal={openModal}
      handleCloseModal={handleCloseModal}
      rowId={rowId}
      />
    </Box>
  );
};

export default Contacts;
