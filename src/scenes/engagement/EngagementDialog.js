import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";

export const EngagementDialog = ({ params, handleDelete, handleClickModal, handleEngagementUpdate }) => {
  const [rowId, setRowId] = useState();

  const handleViewClick = (param) => {
    console.log('hey', param);
    <Link to={`/stakeholder-detail/${param.value}`}/>
      
  }

  console.log(params, "pooiuiui");
  return (
    <Box>
      {/* <Tooltip title="view project details">
        <IconButton onClick={()=> handleViewClick(params)}>
          <Link to={`/engagement-detail/${params.id}`} >

          <Preview />
          </Link>
        </IconButton>
      </Tooltip>
      <Tooltip title="edit project" sx={{color:"#000"}}>
        <IconButton onClick={()=>{
          // handleClickModal()
          handleEngagementUpdate(params.row)
          // setRowId(params.id)
        }}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete project" sx={{color:"#000"}}>
        <IconButton onClick={()=> handleDelete(params)}>
          <Delete />
        </IconButton>
      </Tooltip> */}
      {/* <EditStakeholder rowId={rowId} /> */}
    </Box>
  );
};