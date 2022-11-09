import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Stack,
  TextField,
  Snackbar,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import Engagements from ".";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";


const UpdateProject = ({ handleCloseModal, openModal, rowId }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [programVar, setProgramVar] = useState([])
  const [msg, setMsg] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [endValue, setEndValue] = useState(dayjs("02-05-2019"));
  const [startValue, setStartValue] = useState(dayjs("02-05-2019"));
  const [program, setProgram] = useState([]);
  const [programId, setProgramId] = useState("");
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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { addEngagement, authTokens, success, error, clearError } =
    useContext(AuthContext);

  // console.log('engagement ENGAGEMENT');

  
  useEffect(() => {
    if (success) {
      // setMsg(success)
      setLoadingBtn(false);
    } else if (error) {
      setMsg(error);
      setOpen(true);
      setLoadingBtn(false);
      setInterval(() => {
        clearError();
      }, 6000);
    }
  }, [success, error]);

  useEffect(() => {
    let stakeHolders = async () => {
      // // console.log('POPO BIG CODE', rowId);
      if (authTokens) {
        let response = await fetch(
          `${process.env.REACT_APP_BASE_API_KEY}/project/profile/${rowId.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens.token.access,
            },
          }
        );
        let data = await response.json();
        setProgramId(data["data"].program)
        setProjectDescription(data["data"].project_description)
        setProjectManager(data["data"].project_manager)
        setProjectManagerEmail(data["data"].project_manager_email)
        setNotifyManager(data["data"].notify_project_manager)
        setProjectName(data["data"].project_name)
        
        // setFirstName(data["data"].first_name);
        // setLastName(data["data"].last_name);
        // setGender(data["data"].gender);
        // setEmail(data["data"].email);
        // setPersonName(data["data"].user_permission2)
        // setEmail(data["data"].email);
        if (response.ok) {
          setIsLoaded(false);
          // // console.log("DATA IS POWER", stakeholderVar);
          // setFirstName(stakeholderVar.first_name)
        }
        // // console.log(data, "data", 'BIG DATA NEX TITME ');
      } else {
        alert("something went wro");
      }
    };
    stakeHolders();

    // return () => {
    //   second
    // }
  }, [rowId]);

  // useEffect(() => {
  //   const getProject = async () => {
  //     try {
  //       const getProjectData = await fetch(
  //         "https://nest-srm.up.railway.app/project-list",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + authTokens.token.access,
  //           },
  //         }
  //       );
  //       const projectJson = await getProjectData.json();
  //       // //console.log(projectJson, "jrtfnhjkrn");
  //       // setStakeholder(await stakeholderJson["stakeholder"]);
  //       if (getProjectData.ok) {
  //         setProjects(await projectJson["data"]);
  //       }
  //     } catch (error) {
  //       setErrorMessage(error);
  //     }
  //   };
  //   getProject();
  // }, []);

  // useEffect(() => {
  //   // let stakeHolders = async () => {
  //   //   // if(authTokens){
  //   //   let response = await fetch(
  //   //     "https://nest-srm.up.railway.app/stakeholder-list",
  //   //     {
  //   //       method: "GET",
  //   //       headers: {
  //   //         "Content-Type": "application/json",
  //   //         Authorization: "Bearer " + authTokens.token.access,
  //   //       },
  //   //     }
  //   //   );
  //   //   let data = await response.json();
  //   //   setStakeHolderVar(data["data"]);
  //   //   if (response.ok) {
  //   //     setIsLoaded(false);
  //   //   }
  //   //   // //console.log(data, "data");
  //   //   // }else{
  //   //   //     alert("something went wro")
  //   //   // }
  //   // };
  //   // stakeHolders();
  // }, [authTokens]);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // const handleStakeholderName = (e) => {
  //   const getStakeId = e.target.value;
  //   // console.log('kfkkjdfjJHBHJF', getStakeId);
  //   return stakeholderVar.map((target) => {
  //     // if (getStakeId == target["id"]) {
  //     //   setStakeholderTypeId({
  //     //     ...stakeholderType,
  //     //     stakeholdeType: target["id"],
  //     //   });
  //     // }
  //     if (getStakeId == target["id"]) {
  //       setStakeholderId(target["id"]);
  //     }
  //   });
  // };

  // const handleProjects = (e) => {
  //   const getProjectId = e.target.value;
  //   // console.log('kfkkjdfjJHBHJF', getProjectId);
  //   return projects.map((target) => {
  //     // if (getProjectId == target["id"]) {
  //     //   setStakeholderTypeId({
  //     //     ...stakeholderType,
  //     //     stakeholdeType: target["id"],
  //     //   });
  //     // }
  //     if (getProjectId == target["id"]) {
  //       setProjectId(target["id"]);
  //     }
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoadingBtn(true);
  //   if (rowId) {
  //     let response = await fetch(
  //       `https://nest-srm.up.railway.app/stakeholder-engagement-update/${rowId.id}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + authTokens.token.access,
  //         },
  //         body: JSON.stringify({
  //           // engagement_conclusion: engagementConclusion,
  //           // engagement_diary: engagementDiary,
  //           // engagement_rate: engagementRate,
  //           // project: projectId,
  //           // stakeholder_name: stakeholderId,
  //           // stakeholder_issues: stakeholderIssues,
  //           // stakeholder_assigned_task: stakeholderAssignedTask,
  //         }),
  //       }
  //     );
  //     let data = await response.json();

  //     // console.log(data, "take seripous");
  //     // setStakeHolderVar(data["data"])
  //     if (response.ok) {
  //       // // console.log(response, "erresponse", data);
  //       // e.target.reset();
  //       setOpen(true);
  //       setLoadingBtn(false);

  //       setMsg(data);

  //       setInterval(() => {
  //         setMsg(null);
  //         window.location.reload();
  //       }, 6000);
  //     } else {
  //       setOpen(true);
  //       setLoadingBtn(false);
  //       setMsg(data);
  //       setInterval(() => {
  //         setMsg(null);
  //       }, 3000);
  //     }
  //     // // console.log(data, "data");
  //   }
  // };

  // //console.log('i m a stake ', stakeholders);
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Engagement"}</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "400px", margin: "auto", marginTop: "70px" }}>
          <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={msg ? open : false}
          onClose={handleClose}
          message={msg}
          autoHideDuration={6000}
          // key={vertical + horizontal}
        />
            {/* <Formik
            onSubmit={e=>handleFormSubmit(e)}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
            sx={{padding: "50px",}}
        >
            {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            }) => ( */}
            {/* <Box sx={{ width: "800px", margin: "auto", marginTop: "20px",  padding: "50px", boxShadow: "rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem"  }}>
        <form> */}
          {/* <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          > */}
              {/* <TextField
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
                  </TextField> */}
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
            {/* <TextField
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
            /> */}
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
          {/* </Box>
        </form> */}
        {/* )}
        </Formik> */}
      {/* </Box> */}
            {/* )}
        </Formik> */}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProject;

// const checkoutSchema = yup.object().shape({
//   stakeholderName: yup.string().required("required"),
//   engagementRate: yup.number().positive().integer().required("required"),
//   project: yup.string().required("required"),
//   engagementDiary: yup.string().required("required"),
//   engagementConclusion: yup.string().required("required"),
//   stakeholderIssues: yup.string().required("required"),
//   stakeholderAssignedTask: yup.string().required("required"),
// });
// const initialValues = {
//   stakeholderName: "",
//   engagementRate: "",
//   project: "",
//   engagementDiary: "",
//   engagementConclusion: "",
//   stakeholderIssues: "",
// //   stakeholderAssignedTask: "",
// };