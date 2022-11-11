import { Box, Button, IconButton, Snackbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";


const Dashboard = () => {
  const [stakeHolderVar, setStakeHolderVar] = useState([]);
  const [open, setOpen] = useState(true)
  const [stakeLength, setStakeLength] = useState(0);
  const [msg, setMsg] = useState("");
  const [userHolder, setUserHolder] =  useState([]);
  const [userLength, setUserLength] = useState(0)
  const [businessLength, setBusinessLength] = useState(0);
  const [businessVar, setBusinessVar] = useState([])
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const {success, error, clearSuccess, authTokens} = useContext(AuthContext)


  const handleClose = () => {
    setOpen(false)
  }
  // setMsg(success?success:error)
  useEffect(()=>{
    if(success){
      setMsg(success)
      setInterval(() => {
        clearSuccess()
      }, 6000);

    }
    else{
      setMsg(error)
    }
  }, [success, error])

    // console.log(success);

    

    

    



    
    
    useEffect(() => {

      let getUserHolders = async () => {
        // if(authTokens){
            let response = await fetch(`${process.env.REACT_APP_BASE_API_KEY}/auth/users/`, {
                method:"GET", 
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : 'Bearer ' + authTokens.token.access
                },
  
            })
            let data = await response.json()
            console.log("user", data, 'nowowowo');
            setUserHolder(data["data"])
            
            if (response.ok){
              // setIsLoaded(false)
              setUserLength(data.count)
            }
            // console.log(data, 'data');
        // }else{
        //     alert("something went wro")
        // }
        
    }
    getUserHolders()

    let stakeHolders = async () => {
      // if(authTokens){
      let response = await fetch(
        `${process.env.REACT_APP_BASE_API_KEY}/stakeholder-list`,
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
      // console.log(stakeHolderVar.length, 'count');
      if (response.ok) {
        setStakeLength(data.count)
        // setIsLoaded(false);
      }
      // console.log(data, "stake");
      // }else{
      //     alert("something went wro")
      // }
    };
    
    stakeHolders();

    let getBusinessSector = async () => {
      // if(authTokens){
          let response = await fetch(`${process.env.REACT_APP_BASE_API_KEY}/business-sector`, {
              method:"GET", 
              headers: {
                  'Content-Type' : 'application/json',
                  'Authorization' : 'Bearer ' + authTokens.token.access
              },

          })
          let data = await response.json()
          // console.log("user", data, 'nowowowo');
          setBusinessVar(data["data"])
          if (response.ok){
            // setIsLoaded(false)
            setBusinessLength(data.count)
          }
          // console.log(data, 'data');
      // }else{
      //     alert("something went wro")
      // }
      
  }
  getBusinessSector()




      
  }, [stakeLength, userLength, businessLength]);


  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {
          msg && 
          <Snackbar
          
          anchorOrigin={{ vertical:"top", horizontal:"center" }}
          open={open}
          onClose={handleClose}
          autoHideDuration={6000}
          message={msg}
          key={'top_center'}
          color="#000"
          />}
        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        height="400px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor="#fff"
          borderRadius="15px"
          boxShadow="rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <Box
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />

            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[500]}
                borderBottom={`4px solid ${colors.primary[500]}`}
                width="100%"
                alignItems="center"
              >
                Total No. of Stakeholders
              </Typography>
              <Typography
                variant="h2"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                textAlign="center"

              >
                {stakeLength}
              </Typography>
            </Box>

        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="#fff"
          borderRadius="15px"
          boxShadow="rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <Box
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />

            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[500]}
                borderBottom={`4px solid ${colors.primary[500]}`}
                width="100%"
                alignItems="center"
              >
                Total No. Business Sector
              </Typography>
              <Typography
                variant="h2"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                textAlign="center"

              >
                {businessLength}
              </Typography>
            </Box>

        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor="#fff"
          borderRadius="15px"
          boxShadow="rgb(0 0 0 / 16%) 0px 0.1875rem 0.375rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <Box
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />

            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[500]}
                borderBottom={`4px solid ${colors.primary[500]}`}
                width="100%"
                alignItems="center"
              >
                Total No. Users
              </Typography>
              <Typography
                variant="h2"
                fontWeight="bold"
                color={colors.greenAccent[500]}
                textAlign="center"

              >
                {userLength}
              </Typography>
            </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
