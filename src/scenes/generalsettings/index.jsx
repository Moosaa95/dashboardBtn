import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import EditCurrentUser from "./EditCurrentUser";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [stakeHolderVar, setStakeHolderVar] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("")

  const { authTokens } = useContext(AuthContext);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickModal = () => {
    setOpenModal(true);
  };
  // useEffect(() => {
  const handleUserEdit = () => {
    // param.preventDefault()
    //console.log('i am stake edit', param.id);
    // setRowId({ ...param });
    handleClickModal();
  };

  //   getUsers()

  //   }, [authTokens])

  useEffect(() => {
    if (authTokens) {
      let getUsers = async () => {
        // if(authTokens){
        let response = await fetch(
          "https://nest-srm.up.railway.app/auth/users/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + authTokens.token.access,
            },
          }
        );
        let data = await response.json();
        console.log("user", data, "nowowowo");
        setStakeHolderVar(data["data"]);
        if (response.ok) {
          setLoading(true);
          stakeHolderVar.map((deta) => {
            if (deta.email == email) {
              //   console.log(deta, "data 1", "trueer");

              setUsername(deta.username);
              setId(deta.id);
              setPhoneNumber(deta.phone_number);
              setGender(deta.gender);
            }
          });
        }
        // console.log(username, "user var");
        // }else{
        //     alert("something went wro")
        // }
      };
      getUsers();
      setFirstName(authTokens.user["first_name"]);
      setLastName(authTokens.user["last_name"]);
      setEmail(authTokens.user["email"]);
      //   setUsername(authTokens.user["username"])
    }
  }, [stakeHolderVar]);

  return (
    <Card
      sx={{
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography
          mb="30px"
          borderBottom="3px solid #eee"
          sx={{ fontSize: 20 }}
          textTransform="uppercase"
          fontWeight="600"
          textAlign="center"
          color="text.secondary"
          gutterBottom
        >
          Current User Details
        </Typography>
        {loading ? (
          <>
            <Typography variant="h3" component="div" textAlign="center">
              {firstName} {lastName}
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              textAlign="center"
            >
              {email}
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              textAlign="center"
            >
              {username}
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              textAlign="center"
            >
              {phoneNumber}
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              textAlign="center"
            >
              {gender}
            </Typography>
          </>
        ) : (
          <Typography variant="h5"  textAlign="center">
            Please wait while user details loads...
          </Typography>
        )}
        {/* <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button
          size="large"
          variant="contained"
          onClick={() => {
            // handleClickModal()
            handleUserEdit();
            // setRowId(params.id)
          }}
        >
          Edit
        </Button>
      </CardActions>
      <EditCurrentUser
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        rowId={id}
      />
    </Card>
  );
}
