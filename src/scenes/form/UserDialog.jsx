import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import EditUser from "./EditUser";

const Users = ({ params, handleDelete, handleClickModal, handleUserEdit }) => {
  const [rowId, setRowId] = useState();

  const handleViewClick = (param) => {
    // console.log('hey', param);
    <Link to={`/user-profile/${param.id}`}/>
      
  }

  // // console.log(params, "pooiuiui");
  return (
    <Box>
      <Tooltip title="view User Profile" sx={{ color: "#122582 !important" }}>
        <IconButton onClick={()=> handleViewClick(params)}>
          <Link to={`/user-profile/${params.id}`} >
          <Preview />
          </Link>
        </IconButton>
      </Tooltip>
      <Tooltip title="edit User" sx={{
        color:"#000"
      }}>
        <IconButton onClick={()=>{
          // handleClickModal()
          handleUserEdit(params.row)
          // setRowId(params.id)
        }}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete User" sx={{color:"#000"}}>
        <IconButton onClick={()=> handleDelete(params)}>
          <Delete />
        </IconButton>
      </Tooltip>
      {/* <EditStakeholder rowId={rowId} /> */}
    </Box>
  );
};

export default Users
