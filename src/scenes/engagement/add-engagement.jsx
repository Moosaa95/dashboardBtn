import { Box, Button, IconButton, Typography, useTheme, TextField, Snackbar, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";

const AddEngagement = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [stakeholders, setStakeholder] = useState([]);
    const [stakeholderId, setStakeholderId] = useState("");
    const [msg, setMsg] = useState("")

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {addEngagement, success} = useContext(AuthContext)


    useEffect(() => {
      if(success) {
        // setMsg(success)
        alert(success)
      }
    }, [success])

    useEffect(() => {
        const getStakeholder = async () => {
          try {
            const getStakeholderData = await fetch(
              "https://nest-srm.up.railway.app/stakeholder-list"
            );
            const stakeholderJson = await getStakeholderData.json();
            console.log(stakeholderJson["stakeholder"], "ppp");
            setStakeholder(await stakeholderJson["stakeholder"]);
            if (getStakeholderData.ok) {
            }
          } catch (error) {
            setErrorMessage(error);
          }
        };
        getStakeholder();
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
        console.log(values);
    };
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ALl Business Sector" subtitle="Add your stakeholder business sector" />

      </Box>
      <Button onClick={handleClick}>Open simple snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        
      />

      <Box 
        sx={{ width: "600px", margin: "auto", marginTop: "70px" }}
        >
              <Formik
            onSubmit={handleFormSubmit}
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
                    label="Country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.stakeholderName}
                    name="stakeholderName"
                    error={!!touched.stakeholderName && !!errors.stakeholderName}
                    helperText={touched.stakeholderName && errors.stakeholderName}
                    sx={{ gridColumn: "span 4" }}
                    onClick={setStakeholderId(values.stakeholderName)}
                >
                    {stakeholders.map((stakeholder, index) => (
                    <MenuItem value={stakeholder.stakeholder_pk} key={stakeholder.stakeholder_pk}>
                        {stakeholder.stakeholder_name}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                    Add Business Sector
                </Button>
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
    engagement_rate: yup.string().required("required"),
    project: yup.string().required("required"),
    engagement_diary: yup.string().required("required"),
    engagement_conclusion: yup.string().required("required"),
    stakeholder_issues: yup.string().required("required"),
    stakeholder_assigned_task: yup.string().required("required"),
    
  });
  const initialValues = {
    stakeholderName: "",
    engagement_rate: "",
    project: "",
    engagement_diary: "",
    engagement_conclusion: "",
    stakeholder_issues: "",
    stakeholder_assigned_task: "",
  };