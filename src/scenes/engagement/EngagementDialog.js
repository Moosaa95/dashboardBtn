import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, {useState, useEffect, useContext} from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const EngagementDialog = ({ params, handleDelete, handleClickModal, handleEngagementUpdate }) => {
  const [rowId, setRowId] = useState();
  const [canEditEngagement, setCanEditEngagement] = useState(false);
  const [canDeleteEngagement, setCanDeleteEngagement] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false)

  const handleViewClick = (param) => {
    // console.log('hey', param);
    <Link to={`/stakeholder-detail/${param.value}`}/>
      
  }

  const { authTokens} = useContext(AuthContext)


  // console.log(authTokens, 'nice')

  useEffect(() => {
    if (authTokens){
      if (authTokens.user.get_user_permissions_list.includes("admin") || authTokens.user.get_user_permissions_list.includes("global_admin")){
        setIsAdmin(true)
        setIsGlobalAdmin(true)
        // setCanDeleteStakeholder(true)
        // setCanEditStakeholder(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_update_engagement")){
        setCanEditEngagement(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_delete_engagement")){
        setCanDeleteEngagement(true)
      }
    }
  }, [authTokens])



  // console.log(params, "pooiuiui");
  return (
    <Box>
      <Tooltip title="view project details">
        <IconButton onClick={()=> handleViewClick(params)}>
          <Link to={`/engagement-detail/${params.id}`} >

          <Preview />
          </Link>
        </IconButton>
      </Tooltip>
      {
        (isAdmin || canEditEngagement || isGlobalAdmin) &&
        <Tooltip title="edit project" sx={{color:"#000"}}>
        <IconButton onClick={()=>{
          // handleClickModal()
          handleEngagementUpdate(params.row)
          // setRowId(params.id)
        }}>
          <Edit />
        </IconButton>
      </Tooltip>}
     { 
     (isAdmin || canDeleteEngagement || isGlobalAdmin) &&
     
     <Tooltip title="delete project" sx={{color:"#000"}}>
        <IconButton onClick={()=> handleDelete(params)}>
          <Delete />
        </IconButton>
      </Tooltip>}
      {/* <EditStakeholder rowId={rowId} /> */}
    </Box>
  );
};
