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
import moment from "moment/moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { ProgramDialog } from "./ProgramDialog";

const Programs = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [stakeHolderVar, setStakeHolderVar] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)
    const [msg, setMsg] = useState("")

    const [programDescription, setProgramDescription] = useState("")
    const [programName, setProgramName] = useState("")
    const [organizerSponsor, setOrganizerSponsor] = useState("")
    const [pageSize, setPageSize] = useState(5);
    const [value, setValue] = useState(dayjs('02-05-2019').format('dd/MM/YYYY'));

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {authTokens, addProgram, success} = useContext(AuthContext)

    // useEffect(()=> {
    //     if(success){
    //         // setMsg(success)
    //         alert(success)

    //     }else{
    //         setMsg(null)
    //     }
    // }, [success])

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
          },
          {
            field: "date_approved",
            headerName: "Date Approved",
            flex: 1,
            cellClassName: "name-column--cell",
            valueFormatter: params => 
            moment(params?.value).format("DD-MM-YYYY"),
          },
          // {
          //   field: "action",
          //   headerName: "Action",
          //   renderCell: (params) => {
          //       return (
          //         <div className="cellAction">
          //           <Link to="" style={{ textDecoration: "none" }}>
          //               <Button data-toggle="modal" data-target="#exampleModalCenter" variant="outlined" size="small" style={{ borderColor: "#fff", color: "#fff" }}>View</Button>
          //           </Link>
          //         </div>
          //       );
          //     },
          // },
          {
            field: "actions",
            headerName: "Actions",
            type: "actions",
            width: 150,
            renderCell: (params) => <ProgramDialog {...{ params }} />,
          },
      ];

    useEffect(() => {

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
      program()
    
      }, [authTokens])

    
  return (
    <><Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
      {/* <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg?open : false}
          onClose={handleClose}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        /> */}
        <Header title="All Programs" subtitle="All your stakeholder programs" />

        <Box>
          <Link to="/add-program">
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
              Add Program
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
    </Box><>

      {/* Preview form */}
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">

            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Program Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <ul class="list-group">
                <li class="list-group-item"><b>Organizer Sponsor: </b> insert organizer sponsor here</li>
                <li class="list-group-item"><b>Program Description: </b> insert program description here</li>
                <li class="list-group-item"><b>Date Approved: </b> insert date approved here</li>
              </ul>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" justifyContent="start" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenterEdit">Edit</button>
              </div>
            </div>
          </div>
        </div>


        {/* Edit Form */}

        <div class="modal fade" id="exampleModalCenterEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
              <form onSubmit={e=>handleSubmit(e)}>
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
                    label="Program Name"
                    // onBlur={handleBlur}
                    onChange={e=>setProgramName(e.target.value)}
                    value={programName}
                    // value={values.programName}
                    name="programName"
                    // error={!!touched.programName && !!errors.programName}
                    // helperText={touched.programName && errors.programName}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Organizer Sponsor"
                    // onBlur={handleBlur}
                    onChange={e=>setOrganizerSponsor(e.target.value)}
                    value={organizerSponsor}
                    name="organizerSponsor"
                    // error={!!touched.organizerSponsor && !!errors.organizerSponsor}
                    // helperText={touched.organizerSponsor && errors.organizerSponsor}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    id="filled-multiline-flexible"
                    multiline
                    maxRows={3}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description"
                    // onBlur={handleBlur}
                    onChange={e=>setProgramDescription(e.target.value)}
                    value={programDescription}
                    name="programDescription"
                    // error={!!touched.programDescription && !!errors.programDescription}
                    // helperText={touched.programDescription && errors.programDescription}
                    sx={{ gridColumn: "span 4" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={10}>
                        <DesktopDatePicker
                            fullWidth
                            label="Date desktop"
                            value={value}
                            name="dateApproved"
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            // error={!!touched.programDescription && !!errors.programDescription}
                            // helperText={touched.programDescription && errors.programDescription}
                            sx={{ gridColumn: "span 4" }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                    Add Program
                </Button>
                </Box>
            </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </></>
      
    )
}

export default Programs
