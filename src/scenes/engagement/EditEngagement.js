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
import Engagements from ".";

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
          `https://nest-srm.up.railway.app/stakeholder/engagement/profile/${rowId.id}`,
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
        setStakeholderId(data["data"].stakeholder_name);
        setStakeholderIssues(data["data"].stakeholder_issues);
        setStakeholderAssignedTask(data["data"].stakeholder_assigned_task);
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
        // //console.log(projectJson, "jrtfnhjkrn");
        // setStakeholder(await stakeholderJson["stakeholder"]);
        if (getProjectData.ok) {
          setProjects(await projectJson["data"]);
        }
      } catch (error) {
        setErrorMessage(error);
      }
    };
    getProject();
  }, []);

  useEffect(() => {
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
      // //console.log(data, "data");
      // }else{
      //     alert("something went wro")
      // }
    };
    stakeHolders();
  }, [authTokens]);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleStakeholderName = (e) => {
    const getStakeId = e.target.value;
    // console.log('kfkkjdfjJHBHJF', getStakeId);
    return stakeholderVar.map((target) => {
      // if (getStakeId == target["id"]) {
      //   setStakeholderTypeId({
      //     ...stakeholderType,
      //     stakeholdeType: target["id"],
      //   });
      // }
      if (getStakeId == target["id"]) {
        setStakeholderId(target["id"]);
      }
    });
  };

  const handleProjects = (e) => {
    const getProjectId = e.target.value;
    // console.log('kfkkjdfjJHBHJF', getProjectId);
    return projects.map((target) => {
      // if (getProjectId == target["id"]) {
      //   setStakeholderTypeId({
      //     ...stakeholderType,
      //     stakeholdeType: target["id"],
      //   });
      // }
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
        `https://nest-srm.up.railway.app/stakeholder-engagement-update/${rowId.id}`,
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
            stakeholder_name: stakeholderId,
            stakeholder_issues: stakeholderIssues,
            stakeholder_assigned_task: stakeholderAssignedTask,
          }),
        }
      );
      let data = await response.json();

      // console.log(data, "take seripous");
      // setStakeHolderVar(data["data"])
      if (response.ok) {
        // // console.log(response, "erresponse", data);
        // e.target.reset();
        setOpen(true);
        setLoadingBtn(false);

        setMsg(data);

        setInterval(() => {
          setMsg(null);
          window.location.reload();
        }, 6000);
      } else {
        setOpen(true);
        setLoadingBtn(false);
        setMsg(data);
        setInterval(() => {
          setMsg(null);
        }, 3000);
      }
      // // console.log(data, "data");
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
                  onChange={(e) => handleStakeholderName(e)}
                  value={stakeholderId}
                  name="stakeholderName"
                  // error={!!touched.stakeholderName && !!errors.stakeholderName}
                  // helperText={touched.stakeholderName && errors.stakeholderName}
                  sx={{ gridColumn: "span 4" }}
                  // onClick={setStakeholderId(values.stakeholderName)}
                >
                  {stakeholderVar &&
                    stakeholderVar.map((stakeholder, index) => (
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
                  // onBlur={handleBlur}
                  // onChange={handleChange}
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
                        {proj.program}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  multiline
                  maxRows={3}
                  label="Engagement Diary"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
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
                  // onChange={handleChange}
                  value={engagementConclusion}
                  name="engagementConclusion"
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
                  value={stakeholderIssues}
                  name="stakeholderIssues"
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
