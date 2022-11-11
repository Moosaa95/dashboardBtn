import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams} from "react-router-dom";
import Header from '../../components/Header';
import AuthContext from "../context/AuthContext";
import moment from "moment"
import { useMediaQuery, Box, Typography, styled, Stack,
  Grid,
  Paper,
  ButtonBase } from "@mui/material";


  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  

export const ProjectDetail = () => {
  const [stakeholderVar, setStakeHolderVar] = useState([])
  const [isLoaded, setIsLoaded]= useState(true);
  const [projectName, setProjectName] = useState("")
  const [programName, setProgramName] = useState("")
  const [projectManager, setProjectManager] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [notifyManager, setNotifyManager] = useState(false)
  const [projectManagerEmail, setProjectManagerEmail] = useState("")
  const [isActive, setIsActive] = useState("")
  const [endValue, setEndValue] = useState("")
  const [startValue, setStartValue] = useState("")



  const isNonMobile = useMediaQuery("(min-width:600px)");

    const { id } = useParams();

    const {authTokens} = useContext(AuthContext)

    // console.log('stake view page', id);


    let stakeHolders = async () => {
      if(authTokens){
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/project/profile/${id}`,
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
      console.log(stakeholderVar, 'popppooppp')
      if (response.ok) {
        setIsLoaded(false);
        setProjectName(data["data"].project_name)
        setProgramName(data["data"].program)
        setProjectManager(data["data"].project_manager)
        setProjectManagerEmail(data["data"].project_manager_email)
        setNotifyManager(data["data"].notify_project_manager)
        setIsActive(data["data"].is_active)
        setStartValue(moment.utc(data["data"].start_date).format('MM/DD/YY'))
        setEndValue(moment.utc(data["data"].end_date).format('MM/DD/YY'))
        setProjectDescription(data["data"].project_description)


      }
    //   console.log(data, "data", data["data"].projects, notifyManager);
      }else{
          alert("something went wro")
      }
    };
    useEffect(() => {
      stakeHolders()
    
      // return () => {
      //   second
      // }
    }, [id])

    // console.log("SKATE", stakeholderVar)
    

  return (
    <>
    <Box m="20px">
    {!isLoaded? (
       <Stack 
       color="#6E6B7B"
         backgroundColor="#fff"
         width="100%"
         height="100%"
       >
         <Header title="STAKEHOLDER DETAILS" subtitle="Stakeholder Profile Page"/>
           <Stack
           display="flex"
           justifyContent="space-between"
           flexDirection="row"
           // alignItems="center"
           m="50px"
           boxShadow="rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem"
           border="none"
           width="90%"
           borderRadius="10px"
           padding="50px 20px"
           height="500px"
           
 
           >
             
             <Grid item xs={5}>
             <Grid container spacing={3}>
             <Grid item xs={12}>
             <Typography
               variant="h3"
               textAlign="left"
               fontWeight="medium"
               mb="20px"
               color="#5E5873"
               >
                 Project Details
               </Typography>
             </Grid>
             <Grid item xs={4}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 
                 >
               Project Name:
                 </Typography>
             </Grid>
             <Grid item xs={8}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 fontWeight="medium"
                 >
               {projectName}
                 </Typography>
             </Grid>
             <Grid item xs={4}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 
                 >
               Program:
                 </Typography>
             </Grid>
             <Grid item xs={8}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 >
                   {programName}
                 </Typography>
             </Grid>
             <Grid item xs={4}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 
                 >
               Project Description:
                 </Typography>
             </Grid>
             <Grid item xs={8}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 >
                   {projectDescription}
                 </Typography>
             </Grid>
             <Grid item xs={4}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 
                 >
               Project Manager Email:
                 </Typography>
             </Grid>
             <Grid item xs={8}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 >
                   {projectManagerEmail}
                 </Typography>
             </Grid>
             <Grid item xs={4}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 
                 >
               Notify Manager:
                 </Typography>
             </Grid>
             <Grid item xs={8}>
               <Typography 
                 variant='h5'
                 textAlign="left"

                 >
                   {notifyManager}
                 </Typography>
             </Grid>
             <Grid item xs={4}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 
                 >
               Start Date:
                 </Typography>
             </Grid>
             <Grid item xs={8}>
               <Typography 
                 variant='h5'
                 textAlign="left"

                 >
                   {startValue}
                 </Typography>
             </Grid>
             <Grid item xs={4}>
               <Typography 
                 variant='h5'
                 textAlign="left"
                 
                 >
               End Date:
                 </Typography>
             </Grid>
             <Grid item xs={8}>
               <Typography 
                 variant='h5'
                 textAlign="left"

                 >
                   {endValue}
                 </Typography>
             </Grid>
             </Grid>
             </Grid>
           </Stack>
       </Stack>
     ): (
       <Typography variant="h2" color="#000" justifyContent="center" textAlign="center">Please Wait....</Typography>
     )
     }
    </Box>
   </>
    
  )
}

