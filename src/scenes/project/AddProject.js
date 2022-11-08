
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  TextField,
  Snackbar,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import React, { useState, useEffect, useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";

import Stack from "@mui/material/Stack";

const AddProject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [programVar, setProgramVar] = useState([])
  const [msg, setMsg] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [endValue, setEndValue] = useState(dayjs("02-05-2019"));
  const [startValue, setStartValue] = useState(dayjs("02-05-2019"));
  const [program, setProgram] = useState("");
  //   const [projectCode, setProjectCode] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [projectManagerEmail, setProjectManagerEmail] = useState("");
  const [notifyManager, setNotifyManager] = useState(true);
  const [projectDescription, setProjectDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoaded, setIsLoaded] = useState(true);
  const [programName, setProgramName] = useState("")
  
  const { addProject, success, error, authTokens, clearSuccess, clearError } =
  useContext(AuthContext);
  
console.log(error, 'the new error', 'success to check', success);
useEffect(() => {
  const getProgram = async () => {
    try {
      const getProgramData = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/program-list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
        }
      );
      const programJson = await getProgramData.json();
      console.log(programJson, "jrtfnhjkrn");
      // setStakeholder(await stakeholderJson["stakeholder"]);
      if (getProgramData.ok) {
        setProgramVar(await programJson["data"])
        setIsLoaded(false);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };
  getProgram();
}, [authTokens]);
  useEffect(() => {
    if (success) {
      // setMsg(success)
      // setOpen(true);
      setLoadingBtn(false);

      // setInterval(() => {
      //   clearSuccess()

      // }, 6000);
    }
    else if (error) {
      setMsg(error);
      setOpen(true);
      setLoadingBtn(false);
      setInterval(() => {
        clearError();
      }, 6000);
    }
  }, [success, error]);

  const handleClick = () => {
    setOpen(true);
  };
  const handleProgram =  (e) => {
    const getProjectId = e.target.value;
    setProgramName(getProjectId)
    // console.log(getProjectId, 'id project');

  }
  console.log(startValue.format("MM/DD/YYYY"), 'start value')
// console.log('enter the place ', programName);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // [values].map(value => {
    setLoadingBtn(true);
    addProject({
      project_name: projectName,
      program: programName,
      project_description: projectDescription,
      end_date: endValue.format("MM/DD/YYYY"),
      start_date: startValue.format("MM/DD/YYYY"),
      is_active: isActive,
      project_manager: projectManager,
      project_manager_email: projectManagerEmail,
      notify_project_manager: notifyManager,
    });
    // })
    // console.log(values);
  };
  return (
    <Box m="20px"
    backgroundColor="#fff"
    width="100%"
    height="100%"
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Add Project"
          subtitle="Add your Project"
        />
      </Box>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        open={open ? open : false}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />

      <Box sx={{ width: "800px", margin: "auto", marginTop: "20px",  padding: "50px", boxShadow: "rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem"  }}>
        <form onSubmit={(e) => handleSubmit(e)}>
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
                    select
                    label="Program"
                    // onBlur={handleBlur}
                    onChange={e=>handleProgram(e)}
                    value={programName}
                    name="program"
                    // error={!!touched.country && !!errors.country}
                    // helperText={touched.country && errors.country}
                    sx={{ gridColumn: "span 2" }}
                    // onClick={setCountriesId(values.country)}
                  >
                    {programVar.map((prog, index) => (
                      <MenuItem
                        value={prog.id}
                        key={prog.id}
                      >
                        {prog.program_name}
                      </MenuItem>
                    ))}
                  </TextField>
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Program"
              // onBlur={handleBlur}
              onChange={(e) => setProgram(e.target.value)}
              value={program}
              // value={values.programName}
              name="program"
              // error={!!touched.programName && !!errors.programName}
              // helperText={touched.programName && errors.programName}
              sx={{ gridColumn: "span 4" }}
            /> */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Project Name"
              // onBlur={handleBlur}
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
              // value={values.programName}
              name="project_name"
              // error={!!touched.programName && !!errors.programName}
              // helperText={touched.programName && errors.programName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Project Description"
              // onBlur={handleBlur}
              onChange={(e) => setProjectDescription(e.target.value)}
              value={projectDescription}
              // value={values.programName}
              name="project_description"
              // error={!!touched.programName && !!errors.programName}
              // helperText={touched.programName && errors.programName}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Project Manager"
              // onBlur={handleBlur}
              onChange={(e) => setProjectManager(e.target.value)}
              value={projectManager}
              // value={values.programName}
              name="project_manager"
              // error={!!touched.programName && !!errors.programName}
              // helperText={touched.programName && errors.programName}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Project Manager Email"
              // onBlur={handleBlur}
              onChange={(e) => setProjectManagerEmail(e.target.value)}
              value={projectManagerEmail}
              // value={values.programName}
              name="project_manager_email"
              // error={!!touched.programName && !!errors.programName}
              // helperText={touched.programName && errors.programName}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Notify Project Manager"
              // onBlur={handleBlur}
              onChange={(e) => setNotifyManager(e.target.value)}
              value={notifyManager}
              // value={values.programName}
              name="notify_project_manager"
              // error={!!touched.programName && !!errors.programName}
              // helperText={touched.programName && errors.programName}
              sx={{ gridColumn: "span 4" }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={10}>
                <DesktopDatePicker
                  fullWidth
                  label="Start Date"
                  value={startValue}
                  name="start_date"
                  onChange={(newValue) => {
                    // console.log('change event', newValue);
                    setStartValue(newValue);
                  }}
                  // error={!!touched.programDescription && !!errors.programDescription}
                  // helperText={touched.programDescription && errors.programDescription}
                  sx={{ gridColumn: "span 4" }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={10}>
                <DesktopDatePicker
                  fullWidth
                  label="End Date"
                  value={endValue}
                  name="end_date"
                  onChange={(newValue) => {
                    setEndValue(newValue);
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
            <LoadingButton
              loading={loadingBtn}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Add Programs
            </LoadingButton>
          </Box>
        </form>
        {/* )}
        </Formik> */}
      </Box>
    </Box>
  );
};

export default AddProject;

// const checkoutSchema = yup.object().shape({
//   organizerSponsor: yup.string().required("Organizer Sponsor is required"),
//   programDescription: yup.string().required("Description is required"),
//   // dateApproved: yup.string().required("Invalid Date required"),
//   programName: yup.string().required("Program name is required"),
// });
// const initialValues = {
//   organizerSponsor: "",
//   programDescription: "",
//   // dateApproved: "",
//   programName: "",
// };
