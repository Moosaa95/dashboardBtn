import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams} from "react-router-dom";
import Header from '../../components/Header';
import AuthContext from "../context/AuthContext";
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
  

export const EngagementDetail = () => {
  const [stakeholderVar, setStakeHolderVar] = useState([])
  const [isLoaded, setIsLoaded]= useState(true);
  const [projectName, setProjectName] = useState("")
  const [stakeholderFristName, setStakeholderFirstName] = useState("")
  const [stakeholderFirstName ,setStakeholderLastName] = useState("")

  const isNonMobile = useMediaQuery("(min-width:600px)");

    const { id } = useParams();

    const {authTokens} = useContext(AuthContext)

    // console.log('stake view page', id);


    let stakeHolders = async () => {
      if(authTokens){
      let response = await fetch(
        `https://nest-srm.up.railway.app/stakeholder/engagement/profile/${id}`,
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
        setProjectName(data["data"].projects["project_name"])
        setStakeholderFirstName(data["data"].stakeholder["first_name"])
        setStakeholderLastName(data["data"].stakeholder["last_name"])
      }
    //   console.log(data, "data", data["data"].projects);
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
      {!isLoaded? (
        <Stack 
        color="#000"
          backgroundColor="#eee"
          width="100%"
          height="100%"
        >
          <Header title="ENGAGEMENT" subtitle="Engagement Profile Page"/>
            <Stack
            display="flex"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            m="100px"
            boxShadow="-18px 9px 17px 9px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1)"
            border="none"
            width="90%"
            borderRadius="20px"
            height="50%"
  
            >
              {/* <Box>
              <Grid item width="50%">
             <ButtonBase sx={{ width: 128, height: 128 }}>
               <Img alt="complex" src={stakeholderVar.stakeholder_image} />
             </ButtonBase>
           </Grid>
              </Box> */}
              <Box 
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              >
              <Typography
                variant="h3"
                textAlign="center"
                textTransform="uppercase"
                fontWeight="bold"
                mb="20px"
                color="#e99592"
                >
                  Engagement Detail
                </Typography>
                <Typography 
                variant='h4'
                 textTransform="uppercase" 
                 fontWeight="bold"
                 color="#70d8bd"
  
                
                >
                {`conclusions : ${stakeholderVar.engagement_conclusion}`}
                </Typography>
                <Typography
                textAlign="center"
                variant="h5"
                >
                Engagement Diary  : {stakeholderVar.engagement_diary}
                </Typography>
                
                <Typography
                textAlign="center"
                variant="h5"
                >Rating : 
                {stakeholderVar.engagement_rate}
                </Typography>
               
                <Typography
                textAlign="center"
                variant="h5"
                >
                  StakeHolder Assigned Task
                {stakeholderVar.stakeholder_assigned_task}
                </Typography>
                <Typography
                 textAlign="center"
                 variant="h5"
                >
                    Project Name : 
                {projectName}
                </Typography>
                <Typography
                 textAlign="center"
                 variant="h5"
                >
                    StakeHolder Issue: 
                {stakeholderVar.stakeholder_issues}
                </Typography>
                

              </Box>
              {/* <Box
               display="flex"
               flexDirection="column"
               alignItems="center"
               justifyContent="start"
              >
                <Typography
                variant="h3"
                textAlign="center"
                textTransform="uppercase"
                fontWeight="bold"
                mb="20px"
                color="#e99592"
                >
                  Stakeholder More Info
                </Typography>
                <Typography 
                 textAlign="left"
                 variant="h5"
                >
                {stakeholderVar.country}
                </Typography>
               
               
                
                <Typography>
                {stakeholderVar.state}
                </Typography>
                <Typography>
                {stakeholderVar.city}
                </Typography>
                <Typography>
                {stakeholderVar.phone}
                </Typography>
                <Typography
                >
                {stakeholderVar.email}
                </Typography>
                <Typography>
                {stakeholderVar.postal_code}
                </Typography>
              </Box> */}
            </Stack>
        </Stack>
      ): (
        <Typography variant="h2" color="#000" justifyContent="center" textAlign="center">Please Wait....</Typography>
      )
      }
    </>
    
  )
}

