import {
  Box,
  Button,
  Snackbar,
  Snack,
  Alert,
  Modal,
  Typography,
  Stack,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataStackholders } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Stakeholders } from "./Stakeholders";
import EditStakeholder from "./EditStakeholder";
import { useMediaQuery } from "@mui/material";
import { Add, Download } from "@mui/icons-material";

const Modals = ({ open, handleClose, setOpener, onUploadFiles }) => {
  // const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [close, setClose] = useState(true);

  const {authTokens} = useContext(AuthContext)
  //console.log("hey", fileList);

  // const onDragEnter = () => wrapperRef.current.classList.add('dragover')

  // const onDragLeave = () => wrapperRef.current.classList.Remove('dragover')

  // const onDrop = () => wrapperRef.current.classList.remove('dragover')

  async function onFileDropHandle(e) {
    setFileList(e.target.files[0]);
    const formData = new FormData();

    formData.append("file", e.target.files[0]);
    // console.log("FORMDATA", formData);

    
    try{
      const response = await fetch(`${process.env.REACT_APP_BASE_API_KEY}/stakeholder-bulk-upload`, {
        method: "POST",
        // mode: "cors",
        headers: {
          Authorization: "Bearer " + authTokens.token.access,
        },
        body: formData,
      });

      if (response.ok) {
        window.location.reload(true);
      }
      const data = await response.json();
    } catch (err) {
      console.error("error", err);
    }
    // .then(res => res.json())
    // .then(data => {
    //   setIsLoaded(true);

    // })
    // .catch(err=>console.error('error', err))
  }

  // const onFile

  const style = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Stack sx={style}>
        <Box
          className="drop-file-input"
          sx={{
            position: "relative",
            width: "400px",
            height: "200px",
            border: "2px solid grey",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "0 auto",
          }}
          // onDragEnter={onDragEnter}
          // onDragLeave={onDragLeave}
          // onDrop={onDrop}
        >
          <Box
            className="drop-file-input__label"
            sx={{
              // margin:'0 auto',
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              fontWeight: 600,
              color: "gray",
              // padding:'600px',
            }}
          >
            <Download
              sx={{
                width: "100%",
              }}
            />
            <Typography>Drag and Drop your files here</Typography>
          </Box>
          <input
            type="file"
            value=""
            name="file"
            style={{
              opacity: 0,
              top: 0,
              left: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
            onChange={onFileDropHandle}
          />
        </Box>
      </Stack>
    </Modal>
  );
};

const StakeHolders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stakeHolderVar, setStakeHolderVar] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [rowId, setRowId] = useState({});
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [pageSize, setPageSize] = useState(100);
  const [stakeHolderVarCopy, setStakeHolderVarCopy] = useState([]);
  const [openUploadModal, setopenUploadModal] = useState(false);
  const [canAddStakeholder, setCanAddStakeholder] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [isAdminAssistant, setIsAdminAssistant] = useState(false);
  const [reloadData, setReloadData] = useState(false)
  
  

  const { authTokens, addProgram, success, error, clearError, clearSuccess } =
    useContext(AuthContext);

  const handleOpenUploadModal = () => setopenUploadModal(true);
  const handleCloseUploadModal = () => setopenUploadModal(false);

  const handleClickModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    stakeHolders();
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };


  // console.log(authTokens.user.get_user_permissions_list.includes("admin"), 'im user')
 
  let command = () => {
    setReloadData(true)
  }

  useEffect(() => {
    if (reloadData){
      stakeHolders()
      setReloadData(false)
    }
  }, [reloadData])

  let stakeHolders = async () => {
    // if(authTokens){
    let response = await fetch(
      `${process.env.REACT_APP_BASE_API_KEY}/stakeholder-list`,
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
    // //console.log(data, "data");
    // }else{
    //     alert("something went wro")
    // }
  };
  useEffect(() => {
    if (success) {
      setMsg(success);
      setOpen(true);
      setInterval(() => {
        clearSuccess();
      }, 6000);
    } else {
      setMsg(error);
      setOpen(true);
      // setInterval(() => {
      //   clearError()

      // }, 6000);
    }
  }, [success, error]);

  useEffect(() => {
    if (authTokens){
      if (authTokens.user.get_user_permissions_list.includes("admin") || authTokens.user.get_user_permissions_list.includes("global_admin") || authTokens.user.get_user_permissions_list.includes("can_add_stakeholder") || authTokens.user.get_user_permissions_list.includes("admin_assistant") ){
        setIsAdmin(true)
        setIsGlobalAdmin(true)
        setCanAddStakeholder(true)
        setIsAdminAssistant(true)
        
      }
      
    }
    stakeHolders();
  }, [authTokens]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, hide: true },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "index",
      headerName: "S/N",
      renderCell: (index) => index.api.getRowIndex(index.row.id) + 1,
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
      minWidth:400,
      // renderCell: (params) => (
      //   <Tooltip title={params.row.email} >
      //          <span className="csutable-cell-trucate">{params.row.email}</span>
      //   </Tooltip>
      // )
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
      renderCell: (params) => (
        <Stakeholders
          {...{
            params,
            handleDelete,
            handleClickModal,
            stakeHolders,
            handleStakeEdit,
            
          }}
        />
      ),
    },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];

  const handleDelete = async (param) => {
    // //console.log(param.id, "this is the time");
    // setRowId({...param}.id)
    if (param) {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/stakeholder-delete/${param.id}`,
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
        stakeHolders();
        // setIsLoaded(false);
        setMsg(data["message"]);
        setOpen(true);
      } else {
        setMsg(data["message"]);
      }
      // //console.log(data, "data");
    }
  };

  const handleStakeEdit = async (param) => {
    // param.preventDefault()
    //console.log('i am stake edit', param.id);
    setRowId({ ...param });
    handleClickModal();
  };

  //console.log(rowId, 'I AM SETTING ROW ID')

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg ? open : false}
          onClose={handleClose}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />
        <Header title="STAKEHOLDERS" subtitle="List of StakeHolders" />
        {
          (isAdmin || isGlobalAdmin || canAddStakeholder || isAdminAssistant)  && 
          (
          <>
          {/* <Button
          variant="contained"
          component="label"
          startIcon={<Add />}
          onClick={handleOpenUploadModal}
          color="secondary"
          sx={{ padding: "10px 20px", }}
        > */}
          {/* Bulk Upload */}
          {/* <input hidden accept="image/*" multiple type="file" /> */}
        {/* </Button> */}
          <Link to="/add-stakeholder">
            <Button color="secondary" variant="contained" sx={{ padding: "10px 20px", }}>
              <Add sx={{ mr: "10px" }} />
                Add Stakeholder
            </Button>
          </Link>
          </>
          )
        }
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
      <EditStakeholder
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        rowId={rowId}
        setRowId={setRowId}
        stakeholders={stakeHolders}
        command={command}
      />
      <Modals open={openUploadModal} handleClose={handleCloseUploadModal} />
    </Box>
  );
};

export default StakeHolders;
