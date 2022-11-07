import { Box, Snackbar, Button, IconButton, Typography, useTheme, TextField} from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Add, Download } from "@mui/icons-material";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import SaveIcon from '@mui/icons-material/Save';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { ProgramDialog } from "./ProgramDialog";
import EditProgram from  "./EditProgram";

const styles = (theme) => ({
  Headercolor: {
    color: "122582",
  },
})

const Programs = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [stakeHolderVar, setStakeHolderVar] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)
    const [msg, setMsg] = useState("")
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [programDescription, setProgramDescription] = useState("")
    const [programName, setProgramName] = useState("")
    const [organizerSponsor, setOrganizerSponsor] = useState("")
    const [pageSize, setPageSize] = useState(50);
    const [value, setValue] = useState(dayjs('02-05-2019').format('dd/MM/YYYY'));
    const [rowId, setRowId] = useState()
    const [canAddProgram, setCanAddProgram] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {authTokens, addProgram, success, error, clearError, clearSuccess} = useContext(AuthContext)



    useEffect(() => {
      if(success) {
        setMsg(success)
        setOpen(true);
        setInterval(() => {
          clearSuccess()
          
        }, 6000);
      }
      else  {
        setMsg(error)
        setOpen(true);
        setInterval(() => {
          clearError()
          
        }, 6000);
               
        

      }
    }, [success, error])



    const handleClickModal = () => {
      setOpenModal(true);
    };
  
  const handleCloseModal = () => {
      setOpenModal(false);
    };
 
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(programName, value);
      // [values].map(value => {
      addProgram({
          program_name : programName,
          organizer_sponsor : organizerSponsor,
          program_description : programDescription,
          date_approved : value.format('MM/DD/YYYY'),
      })
      // })
      // console.log(values);
  };

    console.log('lol', stakeHolderVar);

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5, hide:true },
        // { field: "registrarId", headerName: "Registrar ID" },
        {
          field: "index",
          headerName: "S/N",
          renderCell: (index) => index.api.getRowIndex(index.row.id) + 1
        },
        {
          field: "organizer_sponsor",
          headerName: "Organizer Sponsor",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
            field: "program_description",
            headerName: "Program Description",
            flex: 1,
            cellClassName: "name-column--cell",
            headerClassName: ""
          },
          {
            field: "date_approved",
            headerName: "Date Approved",
            flex: 1,
            cellClassName: "name-column--cell",
            valueFormatter: params => 
            moment(params?.value).format("DD-MM-YYYY"),
          },
         
          {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            width: 150,
            renderCell: (params) => <ProgramDialog {...{ params, handleDelete, handleProgramEdit }}  />,
          },
      ];
      const handleProgramEdit = async (param) => {
        // param.preventDefault()
        console.log('i am program edit', param);
        setRowId(param)
        handleClickModal()
        
      }
      let program = async () => {
        // if(authTokens){
            let response = await fetch('https://nest-srm.up.railway.app/program-list', {
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

      if (authTokens){
        if (authTokens.user.get_user_permissions_list.includes("admin") || authTokens.user.get_user_permissions_list.includes("global_admin") || authTokens.user.get_user_permissions_list.includes("can_add_program") ){
          setIsAdmin(true)
          setIsGlobalAdmin(true)
          setCanAddProgram(true)
          
        }
        
      }

        
      program()
    
      }, [authTokens])

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const handleDelete = async (param) => {
        // console.log(param.id, "this is the time");
        // setRowId(param.id)
        if (param) {
          let response = await fetch(
            `https://nest-srm.up.railway.app/program-delete/${param.id}`,
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
            // console.log(response, "erresponse");
            program();
            // setIsLoaded(false);
            setMsg(data["message"]);
            setOpen(true);
          } else {
            setMsg(data["message"]);
          }
          // console.log(data, "data");
        }
      };

      
    
  return (
    <>
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg?open : false}
          onClose={handleClose}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />
        <Header title="All Programs" subtitle="All your stakeholder programs" />

        {
          (isAdmin || isGlobalAdmin || canAddProgram) && <Box>
          <Link to="/add-program">
            <Button color="secondary" variant="contained" sx={{ padding: "10px 20px", }}>
            <Add sx={{ mr: "10px" }} />
              Add Program
            </Button>
        </Link>
        </Box>
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
      <EditProgram openModal={openModal} handleCloseModal={handleCloseModal} rowId={rowId} />
    </Box>
    </>
  )
}
export default Programs
