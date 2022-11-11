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
        `${process.env.REACT_APP_BASE_API_KEY}/stakeholder/engagement/profile/${id}`,
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
            height="700px"
            
  
            >

              <Grid item xs={5}>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                <Typography
                  variant="h3"
                  textAlign="left"
                  fontWeight="medium"
                  mb="20px"
                  color="#5E5873"
                  >
                    Engagememt Details
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    fontWeight="Bold"
                    marginTop="10px"
                    marginBottom="10px"

                    
                    >
                  Stakeholder:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    fontWeight="medium"
                    marginTop="10px"
                    marginBottom="10px"
                    >
                    {stakeholderFristName} {stakeholderFirstName}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    fontWeight="Bold"
                    marginTop="10px"
                    marginBottom="10px"
                    
                    >
                  Project Name:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    marginTop="10px"
                    marginBottom="10px"
                    >
                      {projectName}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    fontWeight="Bold"
                    marginTop="10px"
                    marginBottom="10px"
                    
                    >
                  Engagememt Diary:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    marginTop="10px"
                    marginBottom="10px"
                    >
                      {stakeholderVar.engagement_diary}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    fontWeight="Bold"
                    marginTop="10px"
                    marginBottom="10px"
                    
                    >
                  Engagememt Rate:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    marginTop="10px"
                    marginBottom="10px"
                    >
                      {stakeholderVar.engagement_rate}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    fontWeight="Bold"
                    marginTop="10px"
                    marginBottom="10px"
                    
                    >
                  Engagememt Conclusion:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    marginTop="10px"
                    marginBottom="10px"

                    >
                      {`conclusions : ${stakeholderVar.engagement_conclusion}`}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    fontWeight="Bold"
                    marginTop="10px"
                    marginBottom="10px"
                    
                    >
                  StakeHolder Issues:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    marginTop="10px"
                    marginBottom="10px"

                    >
                      {stakeholderVar.stakeholder_issues}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    fontWeight="Bold"
                    marginTop="10px"
                    marginBottom="10px"
                    
                    >
                  Assigned Task:
                    </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography 
                    variant='h5'
                    textAlign="left"
                    marginTop="10px"
                    marginBottom="10px"

                    >
                      {stakeholderVar.stakeholder_assigned_task}
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

