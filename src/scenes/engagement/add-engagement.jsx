import { Box, Button, IconButton, Typography, useTheme, TextField, Snackbar, MenuItem } from "@mui/material";
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


const AddEngagement = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [stakeholders, setStakeholders] = useState([]);
    const [stakeholderId, setStakeholderId] = useState("");
    const [engagementRate, setengagementRate] = useState([]);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [projects, setProjects] = useState([])
    const [msg, setMsg] = useState("")

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {addEngagement, authTokens, success, error, clearError} = useContext(AuthContext)


    useEffect(() => {
      if(success) {
        // setMsg(success)
        setLoadingBtn(false);
      }
      else if (error) {
        setMsg(error);
        setOpen(true);
        setLoadingBtn(false);
        setInterval(() => {
          clearError();
        }, 6000);
      }
    }, [success, error])

    useEffect(() => {
        const getStakeholder = async () => {
          try {
            const getStakeholderData = await fetch(
              "https://nest-srm.up.railway.app/stakeholder-list",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + authTokens.token.access,
                },
              }
            );
            const stakeholderJson = await getStakeholderData.json();
            console.log(stakeholderJson["data"], "ppp");
            // setStakeholder(await stakeholderJson["stakeholder"]);
            if (getStakeholderData.ok) {
              setStakeholders(await stakeholderJson["data"])
            }
          } catch (error) {
            setErrorMessage(error);
          }
        };
        getStakeholder();
      }, []);

      useEffect(() => {
        const getProject = async () => {
          try {
            const getProjectData = await fetch(
              "https://nest-srm.up.railway.app/project-list",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + authTokens.token.access,
                },
              }
            );
            const projectJson = await getProjectData.json();
            console.log(projectJson, "jrtfnhjkrn");
            // setStakeholder(await stakeholderJson["stakeholder"]);
            if (getProjectData.ok) {
              setProjects(await projectJson["data"])
            }
          } catch (error) {
            setErrorMessage(error);
          }
        };
        getProject();
      }, []);

      
    

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const handleFormSubmit = (values) => {
        // values.preventDefault()
        setLoadingBtn(true);
        [values].map(value => {
        addEngagement({
            stakeholder_name : value.stakeholderName,
            engagement_rate : value.engagementRate,
            project : value.project,
            engagement_diary : value.engagementDiary,
            engagement_conclusion : value.engagementConclusion,
            stakeholder_issues : value.stakeholderIssues,
            stakeholder_assigned_task : value.stakeholderAssignedTask,
        })
        })
        // console.log(values);
    };

    // console.log('i m a stake ', stakeholders);
  return (
    <Box m="20px"
    backgroundColor="#fff"
    width="100%"
    height="100%"
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Add Stakeholder Engagement" subtitle="Add your stakeholder business sector" />

      </Box>
     
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        
      />

      <Box 
         sx={{ width: "800px", margin: "auto", marginTop: "70px", padding: "50px", boxShadow: "rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem", BackgroundColor: "red !important" }}
        >
              <Formik
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
            }) => (
            <form onSubmit={handleSubmit}>
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
                    label="Select Stakeholder"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stakeholderName}
                    name="stakeholderName"
                    error={!!touched.stakeholderName && !!errors.stakeholderName}
                    helperText={touched.stakeholderName && errors.stakeholderName}
                    sx={{ gridColumn: "span 4", borderBottom: "1px solid #6E6B7B" }}
                    onClick={setStakeholderId(values.stakeholderName)}
                >
                    {stakeholders && stakeholders.map((stakeholder, index) => (
                    <MenuItem value={stakeholder.id} key={stakeholder.id}>
                        {`${stakeholder.first_name} ${stakeholder.last_name}`}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    select
                    label="Engagement Rate"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.engagementRate}
                    name="engagementRate"
                    error={!!touched.engagementRate && !!errors.engagementRate}
                    helperText={touched.stakeholderName && errors.engagementRate}
                    sx={{ gridColumn: "span 2", borderBottom: "1px solid #6E6B7B" }}
                    onClick={setengagementRate(values.engagementRate)}
                >
                    <MenuItem value={1}>1  Poor Performance</MenuItem>
                    <MenuItem value={2}>2  Fair Performance</MenuItem>
                    <MenuItem value={3}>3  Good Performance</MenuItem>
                    <MenuItem value={4}>4  Very Good Performance</MenuItem>
                    <MenuItem value={5}>5  Excellent Performance</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    select
                    label="Project"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.project}
                    name="project"
                    error={!!touched.project && !!errors.project}
                    helperText={touched.project && errors.project}
                    sx={{ gridColumn: "span 2", borderBottom: "1px solid #6E6B7B" }}
                >
                 {projects && projects.map((proj, index) => (
                    <MenuItem value={proj.id} key={proj.id}>
                        {proj.project_name}
                    </MenuItem>
                    ))}
                    </TextField>
                <TextField
                    fullWidth
                    variant="filled"
                    multiline
                    maxRows={3}
                    label="Engagement Diary"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.engagementDiary}
                    name="engagementDiary"
                    error={!!touched.engagementDiary && !!errors.engagementDiary}
                    helperText={touched.engagementDiary && errors.engagementDiary}
                    sx={{ gridColumn: "span 4", borderBottom: "1px solid #6E6B7B" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Engagement Conclusion"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.engagementConclusion}
                    name="engagementConclusion"
                    error={!!touched.engagementConclusion && !!errors.engagementConclusion}
                    helperText={touched.engagementConclusion && errors.engagementConclusion}
                    sx={{ gridColumn: "span 4", borderBottom: "1px solid #6E6B7B" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Stakeholder Issues"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stakeholderIssues}
                    name="stakeholderIssues"
                    error={!!touched.stakeholderIssues && !!errors.stakeholderIssues}
                    helperText={touched.stakeholderIssues && errors.stakeholderIssues}
                    sx={{ gridColumn: "span 4", borderBottom: "1px solid #6E6B7B" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Stakeholder Assigned Task"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stakeholderAssignedTask}
                    name="stakeholderAssignedTask"
                    error={!!touched.stakeholderAssignedTask && !!errors.stakeholderAssignedTask}
                    helperText={touched.stakeholderAssignedTask && errors.stakeholderAssignedTask}
                    sx={{ gridColumn: "span 4", borderBottom: "1px solid #6E6B7B" }}
                />
                </Box>
                <Box display="flex" justifyContent="center" mt="20px">
                <LoadingButton
              loading={loadingBtn}
              type="submit"
              color="secondary"
              variant="contained"
            >
              Add Engagememt 
            </LoadingButton>
                </Box>
            </form>
            )}
        </Formik>
      </Box>
    </Box>
    )
}

export default AddEngagement

const checkoutSchema = yup.object().shape({
    stakeholderName: yup.string().required("required"),
    engagementRate: yup.number().positive().integer().required("required"),
    project: yup.string().required("required"),
    engagementDiary: yup.string().required("required"),
    engagementConclusion: yup.string().required("required"),
    stakeholderIssues: yup.string().required("required"),
    stakeholderAssignedTask: yup.string().required("required"),
    
  });
  const initialValues = {
    stakeholderName: "",
    engagementRate: "",
    project: "",
    engagementDiary: "",
    engagementConclusion: "",
    stakeholderIssues: "",
    stakeholderAssignedTask: "",
  };