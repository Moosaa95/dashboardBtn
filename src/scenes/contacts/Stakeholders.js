import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import EditStakeholder from "./EditStakeholder";

export const Stakeholders = ({ params, handleDelete, handleClickModal, handleStakeEdit }) => {
  const [rowId, setRowId] = useState();

  const handleViewClick = (param) => {
    // console.log('hey', param);
    <Link to={`/stakeholder-detail/${param.id}`}/>
      
  }

  // // console.log(params, "pooiuiui");
  return (
    <Box>
      <Tooltip title="view stakeholder details">
        <IconButton onClick={()=> handleViewClick(params)}>
          <Link to={`/stakeholder-detail/${params.id}`} >
          <Preview />
          </Link>
        </IconButton>
      </Tooltip>
      <Tooltip title="edit stakeholder" sx={{
        color:"#000"
      }}>
        <IconButton onClick={()=>{
          // handleClickModal()
          handleStakeEdit(params.row)
          // setRowId(params.id)
        }}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="delete Stakeholer" sx={{color:"#000"}}>
        <IconButton onClick={()=> handleDelete(params)}>
          <Delete />
        </IconButton>
      </Tooltip>
      {/* <EditStakeholder rowId={rowId} /> */}
    </Box>
  );
};
