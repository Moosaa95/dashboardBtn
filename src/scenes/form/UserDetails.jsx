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


  

export const UserDetail = () => {
  const [stakeholderVar, setStakeHolderVar] = useState([])
  const [isLoaded, setIsLoaded]= useState(true);

  const isNonMobile = useMediaQuery("(min-width:600px)");

    const { id } = useParams();

    const {authTokens} = useContext(AuthContext)
    

    // console.log('stake view page', id);


    let stakeHolders = async () => {
      if(authTokens){
      let response = await fetch(
        `https://nest-srm.up.railway.app/auth/user/profile/${id}`,
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
      color="#000"
      backgroundColor="#eee"
      >
        {/* <Grid item width="50%">
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={stakeholderVar.stakeholder_image} />
          </ButtonBase>
        </Grid> */}
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
                >Email:</span> {stakeholderVar.email}
              </Typography>
              <Typography textTransform="uppercase" gutterBottom variant="subtitle1" component="div">
                <span
                style={{
                  fontWeight:"bold",
                  textTransform:"uppercase"
                }}
                >Gender:</span> {stakeholderVar.gender}
              </Typography>
             
              </Grid>
            
          </Grid>
        </Grid>
      </Grid>
     ): (<Typography color="#000">Please wailt</Typography>)}
    </>
    
  )
}



