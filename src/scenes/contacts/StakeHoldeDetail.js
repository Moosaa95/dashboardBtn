import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams} from "react-router-dom";
import Header from '../../components/Header';
import AuthContext from "../context/AuthContext";
import { useMediaQuery, Box, Typography, styled,
  Grid,
  Paper,
  ButtonBase } from "@mui/material";


  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  

export const StakeHoldeDetail = () => {
  const [stakeholderVar, setStakeHolderVar] = useState([])
  const [isLoaded, setIsLoaded]= useState(true);

  const isNonMobile = useMediaQuery("(min-width:600px)");

    const { id } = useParams();

    const {authTokens} = useContext(AuthContext)

    // console.log('stake view page', id);


    let stakeHolders = async () => {
      if(authTokens){
      let response = await fetch(
        `https://nest-srm.up.railway.app/stakeholder/profile/${id}`,
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
      // console.log(data, "data");
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
     {!isLoaded ? (
      <Grid container spacing={2}
      justifyContent="center"
      // alignItems="center"
      p={15}
      display="flex"
      width="100%"
      height="100%"
      >
        <Grid item width="50%">
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={stakeholderVar.stakeholder_image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography 
              fontWeight='bold'
              fontSize='20px'
              textTransform='uppercase'
              variant="h3"
              gutterBottom component="div">
                Name: {`${stakeholderVar.first_name} ${stakeholderVar.last_name}`}
              </Typography>

              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Address:</span> {stakeholderVar.address}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >State:</span> {stakeholderVar.state}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Country:</span> {stakeholderVar.country}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >City:</span> {stakeholderVar.city}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Business Sector:</span> {stakeholderVar.business_sector}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Business Category:</span> {stakeholderVar.business_category}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Email:</span> {stakeholderVar.email}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Interest:</span> {stakeholderVar.interest}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Postal Code:</span> {stakeholderVar.postal_code}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Phone:</span> {stakeholderVar.phone}
              </Typography>
              </Grid>
            
          </Grid>
        </Grid>
      </Grid>
     ): (<Typography>Please wailt</Typography>)}
    </>
    
  )
}



// : 
// "945321215084"
// postal_code
// : 
// "900110"
// projects
// : 
// []
// stakeholder_image
// : 
// null
// stakeholder_image_height
// : 
// null
// stakeholder_image_width
// : 
// null
// stakeholder_type
// : 
// 2
// state
// : 
// "Katsina State"
// tenant
// : 
// 6
// updated
// : 
// "2022-10-27T06:30:47.612779+01:00"
// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import ButtonBase from '@mui/material/ButtonBase';

