import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
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
// import Engagements from ".";
import { useNavigate } from "react-router-dom";

const UpdateEngagement = ({ handleCloseModal, openModal, rowId }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [stakeholders, setStakeholders] = useState([]);
  const [stakeholderId, setStakeholderId] = useState("");
  const [engagementRate, setengagementRate] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [engagementDiary, setEngagementDiary] = useState("");
  const [stakeholderIssues, setStakeholderIssues] = useState("");
  const [stakeholderAssignedTask, setStakeholderAssignedTask] = useState("");
  const [engagementConclusion, setEngagementConclusion] = useState("");
  const [project, setProject] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [stakeholderName, setStakeholderName] = useState([]);
  const [projects, setProjects] = useState([]);
  const [msg, setMsg] = useState("");
  const [isLoaded, setIsLoaded] = useState("");
  const [engagementsList, setEngagementsList] = useState([]);
  const [stakeholderVar, setStakeHolderVar]  = useState([])

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { addEngagement, authTokens, success, error, clearError, clearSuccess } =
    useContext(AuthContext);

    const navigate = useNavigate();

  // console.log('engagement ENGAGEMENT');

  
  

  useEffect(() => {
    let stakeHolders = async () => {
      // // console.log('POPO BIG CODE', rowId);
      if (authTokens) {
        let response = await fetch(
          `${process.env.REACT_APP_BASE_API_KEY}/stakeholder/engagement/profile/${rowId.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens.token.access,
            },
          }
        );
        let data = await response.json();
        setEngagementConclusion(data["data"].engagement_conclusion);
        setEngagementDiary(data["data"].engagement_diary);
        setengagementRate(data["data"].engagement_rate);
        setProjectId(data["data"].project);
        setStakeholderId(data["data"].stakeholder["stakeholder_fullname"]);
        setStakeholderIssues(data["data"].stakeholder_issues);
        setStakeholderAssignedTask(data["data"].stakeholder_assigned_task);
      
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
  const getProject = async () => {
    try {
      const getProjectData = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/project-list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
        }
      );
      const projectJson = await getProjectData.json();
      // //console.log(projectJson, "jrtfnhjkrn");
      // setStakeholder(await stakeholderJson["stakeholder"]);
      if (getProjectData.ok) {
        setProjects(await projectJson["data"]);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };
  // console.log(projectId, 'porp id');

  useEffect(() => {
   
    getProject();
  }, []);

  

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  

  const handleProjects = (e) => {
    const getProjectId = e.target.value;
    // console.log('kfkkjdfjJHBHJF', getProjectId);
    return projects.map((target) => {
      if (getProjectId == target["id"]) {
        setProjectId(target["id"]);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    if (rowId) {
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/stakeholder-engagement-update/${rowId.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authTokens.token.access,
          },
          body: JSON.stringify({
            engagement_conclusion: engagementConclusion,
            engagement_diary: engagementDiary,
            engagement_rate: engagementRate,
            project: projectId,
            stakeholder_issues: stakeholderIssues,
            stakeholder_assigned_task: stakeholderAssignedTask,
          }),
        }
      );
      let data = await response.json();

      // console.log(data, "take seripous");
      // setStakeHolderVar(data["data"])
      if (response.ok) {
        setOpen(true);
        setLoadingBtn(false);
        setMsg(data.message);
        clearSuccess()
        // handleCloseModal()
        getProject()
        // setInterval(() => {
        //   setMsg(null)
        window.location.reload() 
          
        // }, 3000);
      } else {
        setOpen(true);
        setLoadingBtn(false);
        setMsg(data.message);
        // setInterval(() => {
        //   setMsg(null);
        // }, 3000);
      }
      // // console.log(data, "data");
    }
    else{
      setMsg("does not match")
    }
  };

  // //console.log('i m a stake ', stakeholders);
  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Edit  Engagement`}
        <Typography textTransform="uppercase" fontSize="14px" textAlign="center" fontWeight="500" mt={3}>Stakeholder Name: {stakeholderId}</Typography>
        
        </DialogTitle>
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
                  select
                  label="Engagement Rate"
                  // onBlur={handleBlur}
                  onChange={e=>setengagementRate(e.target.value)}
                  value={engagementRate}
                  name="engagementRate"
                  // error={!!touched.engagementRate && !!errors.engagementRate}
                  // helperText={touched.stakeholderName && errors.engagementRate}
                  sx={{ gridColumn: "span 2" }}
                  // onClick={setengagementRate(values.engagementRate)}
                >
                  <MenuItem value={1}>1 Poor Performance</MenuItem>
                  <MenuItem value={2}>2 Fair Performance</MenuItem>
                  <MenuItem value={3}>3 Good Performance</MenuItem>
                  <MenuItem value={4}>4 Very Good Performance</MenuItem>
                  <MenuItem value={5}>5 Excellent Performance</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  select
                  label="Project"
                  // onBlur={handleBlur}
                  onChange={e=>handleProjects(e)}
                  value={projectId}
                  name="project"
                  // error={!!touched.project && !!errors.project}
                  // helperText={touched.project && errors.project}
                  sx={{ gridColumn: "span 2" }}
                >
                  {projects &&
                    projects.map((proj, index) => (
                      <MenuItem value={proj.id} key={proj.id}>
                        {proj.project_name}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  multiline
                  // maxRows={3}
                  label="Engagement Diary"
                  // onBlur={handleBlur}
                  onChange={e=>setEngagementDiary(e.target.value)}
                  value={engagementDiary}
                  name="engagementDiary"
                  // error={!!touched.engagementDiary && !!errors.engagementDiary}
                  // helperText={touched.engagementDiary && errors.engagementDiary}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Engagement Conclusion"
                  // onBlur={handleBlur}
                  onChange={e=>setEngagementConclusion(e.target.value)}
                  value={engagementConclusion}
                  name="engagementConclusion"
                  multiline
                  maxRows={3}

                  // error={!!touched.engagementConclusion && !!errors.engagementConclusion}
                  // helperText={touched.engagementConclusion && errors.engagementConclusion}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Stakeholder Issues"
                  // onBlur=/e={handleChange}
                  onChange={e=>setStakeholderIssues(e.target.value)}
                  value={stakeholderIssues}
                  name="stakeholderIssues"
                  multiline
                  maxRows={3}
                  // error={!!touched.stakeholderIssues && !!errors.stakeholderIssues}
                  // helperText={touched.stakeholderIssues && errors.stakeholderIssues}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Stakeholder Assigned Task"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  onChange={e=>setStakeholderAssignedTask(e.target.value)}
                  value={stakeholderAssignedTask}
                  name="stakeholderAssignedTask"
                  // error={!!touched.stakeholderAssignedTask && !!errors.stakeholderAssignedTask}
                  // helperText={touched.stakeholderAssignedTask && errors.stakeholderAssignedTask}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <LoadingButton
                  loading={loadingBtn}
                  type="submit"
                  color="secondary"
                  variant="contained"
                >
                  Update Engagememt
                </LoadingButton>
                {/* <Button onClick={handleClose}>Disagree</Button> */}
              </Box>
            </form>
            {/* )}
        </Formik> */}
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateEngagement;

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
//   stakeholderAssignedTask: "",
// };
