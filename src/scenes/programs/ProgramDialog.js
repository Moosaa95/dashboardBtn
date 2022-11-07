import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, {useState, useEffect, useContext} from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const ProgramDialog = ({ params, handleDelete, handleClickModal, handleProgramEdit }) => {
  const [rowId, setRowId] = useState();
  const [canEditProgram, setCanEditProgram] = useState(false);
  const [canDeleteProgram, setcanDeleteProgram] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false)

  const handleViewClick = (param) => {
    console.log('hey', param);
    <Link to={`/stakeholder-detail/${param.value}`}/>
      
  }
  const { authTokens} = useContext(AuthContext)

  useEffect(() => {
    if (authTokens){
      if (authTokens.user.get_user_permissions_list.includes("admin") || authTokens.user.get_user_permissions_list.includes("global_admin")){
        setIsAdmin(true)
        setIsGlobalAdmin(true)
        // setcanDeleteProgram(true)
        // setCanEditProgram(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_update_program")){
        setCanEditProgram(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_delete_program")){
        setcanDeleteProgram(true)
      }
    }
  }, [authTokens])

  // console.log(canEditProgram, "YHHHHHpooiuiui");
  return (
    <Box>
      {/* <Tooltip title="view Program details" sx={{color:"#122582" }} >
        <IconButton onClick={()=> handleViewClick(params)}>
          <Preview />
        </IconButton>
      </Tooltip> */}
     {
       (isAdmin || canEditProgram || isGlobalAdmin ) &&  <Tooltip title="edit Program" sx={{
        color:"#122582"
      }}>
        <IconButton onClick={()=>{
          // handleClickModal()
          handleProgramEdit(params.row)
          // setRowId(params.id)
        }}>
          <Edit />
        </IconButton>
      </Tooltip>
     }
     {
       (isAdmin || canDeleteProgram || isGlobalAdmin ) &&  <Tooltip title="delete Program" sx={{
        color:"red"
      }}>
        <IconButton onClick={()=> handleDelete(params)} >
          <Delete />
        </IconButton>
      </Tooltip>
     }
      {/* <EditStakeholder rowId={rowId} /> */}
    </Box>
  );
};
