import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, {useContext, useState, useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import EditStakeholder from "./EditStakeholder";

export const Stakeholders = ({ params, handleDelete, handleClickModal, handleStakeEdit }) => {
  const [rowId, setRowId] = useState();
  // const [canAddStakeholder, setCanAddStakeholder] = useState(false);
  const [canEditStakeholder, setCanEditStakeholder] = useState(false);
  const [canDeleteStakeholder, setCanDeleteStakeholder] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false)
  const handleViewClick = (param) => {
    // console.log('hey', param);
    <Link to={`/stakeholder-detail/${param.id}`}/>
      
  }
  const { authTokens} = useContext(AuthContext)


  // console.log(authTokens, 'nice')

  useEffect(() => {
    if (authTokens){
      if (authTokens.user.get_user_permissions_list.includes("admin") || authTokens.user.get_user_permissions_list.includes("global_admin")){
        setIsAdmin(true)
        setIsGlobalAdmin(true)
        setCanDeleteStakeholder(true)
        setCanEditStakeholder(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_update_stakeholder")){
        setCanEditStakeholder(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_delete_stakeholder")){
        setCanDeleteStakeholder(true)
      }
    }
  }, [authTokens])


  console.log(isAdmin)







  
// console.log(authTokens.user)

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
      {(isAdmin || canEditStakeholder || isGlobalAdmin) && <Tooltip title="edit stakeholder" sx={{
        color:"#000"
      }}>
        <IconButton onClick={()=>{
          // handleClickModal()
          handleStakeEdit(params.row)
          // setRowId(params.id)
        }}>
          <Edit />
        </IconButton>
      </Tooltip>}
      {((isAdmin || canDeleteStakeholder || isGlobalAdmin)) && <Tooltip title="delete Stakeholer" sx={{color:"#000"}}>
        <IconButton onClick={()=> handleDelete(params)}>
          <Delete />
        </IconButton>
      </Tooltip>}
      {/* <EditStakeholder rowId={rowId} /> */}
    </Box>
  );
};
