import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Snackbar,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { EngagementDialog } from "./EngagementDialog";
import UpdateEngagement from "./EditEngagement";

const Engagements = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [stakeHolderVar, setStakeHolderVar] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const theme = useTheme();
  const [rowId, setRowId] = useState();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const { authTokens, success, clearSuccess } = useContext(AuthContext);
  // // console.log("I AM A SUCCESS", success, 'index');

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

  // // console.log('lol', stakeHolderVar);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

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
      field: "stakeholder_name",
      headerName: "Stakeholder",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "project",
      headerName: "Project",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "stakeholder_issues",
      headerName: "Stakeholder Issue",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "engagement_rate",
      headerName: "Stakeholder Rating",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 150,
      renderCell: (params) => (
        <EngagementDialog
          {...{ params, handleDelete, handleEngagementUpdate }}
        />
      ),
    },
  ];

  const handleClickModal = () => {
    setOpenModal(true);
  };

  const handleEngagementUpdate = async (param) => {
    // console.log("ENGAGEMENT, ", param)
    setRowId(param);
    handleClickModal();
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  let engagememt = async () => {
    // if(authTokens){
    let response = await fetch(
      "https://nest-srm.up.railway.app/stakeholder-engagement/list",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authTokens.token.access,
        },
      }
    );
    let data = await response.json();
    // console.log("user", data, 'nowowowo');
    setStakeHolderVar(data["data"]);
    if (response.ok) {
      setIsLoaded(false);
    }
    // console.log(data, 'data');
    // }else{
    //     alert("something went wro")
    // }
  };

  const handleDelete = async (param) => {
    // console.log(param.id, "this is the time");
    // setRowId(param.id)
    if (param) {
      let response = await fetch(
        `https://nest-srm.up.railway.app/engagement-delete/${param.id}`,
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
        engagememt();
        // setIsLoaded(false);
        setMsg(data["message"]);
        setOpen(true);
      } else {
        setMsg(data["message"]);
      }
      // console.log(data, "data");
    }
  };

  useEffect(() => {
    engagememt();
  }, [authTokens]);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg ? open : false}
          onClose={handleClose}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />
        <Header
          title="All Engagement"
          subtitle="All your stakeholder engagement"
        />

        <Box>
          <Link to="/add-engagement">
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
              Add Engagememt
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
            color: "#000",
            fontWeight: "bold",
            fontSize: "15px",
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
      <UpdateEngagement
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        rowId={rowId}
      />
    </Box>
  );
};

export default Engagements;
