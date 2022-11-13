import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, {useState, useEffect, useContext} from "react";
import { Link, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const  ProjectDialog = ({ params, handleDelete, handleClickModal, handleProjectEdit }) => {
  const [rowId, setRowId] = useState();
  const [canEditProject, setCanEditProject] = useState(false);
  const [canDeleteProject, setCanDeleteProject] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false)



  const handleViewClick = (param) => {
    // console.log('hey', param);
    <Link to={`/stakeholder-detail/${param.value}`}/>
      
  }

  // console.log(params, "pooiuiui");
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
      if (authTokens.user.get_user_permissions_list.includes("can_update_project")){
        setCanEditProject(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_delete_project")){
        setCanDeleteProject(true)
      }
    }
  }, [authTokens])

  return (
    <Box>
      <Tooltip title="View Project Details">
        <IconButton onClick={()=> handleViewClick(params)}>
        <Link to={`/project-detail/${params.id}`} >
          <Preview />
        </Link>
        </IconButton>
      </Tooltip>
      {
        (isAdmin || canEditProject || isGlobalAdmin) &&
        <Tooltip title="Edit Project">
        <IconButton onClick={()=>{
          // handleClickModal()
          handleProjectEdit(params.row)
          // setRowId(params.id)
        }}>
          <Edit />
        </IconButton>
      </Tooltip>
      }
      {
        (isAdmin || canDeleteProject || isGlobalAdmin) &&
        <Tooltip title="Delete Project" sx={{color:"red"}}>
        <IconButton onClick={()=> handleDelete(params)}>
          <Delete />
        </IconButton>
      </Tooltip>}
      {/* <EditStakeholder rowId={rowId} /> */}
    </Box>
  );
};

export default ProjectDialog
