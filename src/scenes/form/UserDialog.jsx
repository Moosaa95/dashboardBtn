import { Delete, Edit, Preview } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import React, {useState, useContext, useEffect} from "react";
import { Link, Navigate } from "react-router-dom";
import EditUser from "./EditUser";
import AuthContext from "../context/AuthContext";

const Users = ({ params, handleDelete, handleClickModal, handleUserEdit }) => {
  const [rowId, setRowId] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [canEditUser, setCanEditUser] = useState(false);
  const [canDeactivateUser, setCanDeactivateUser] = useState(false);

  const handleViewClick = (param) => {
    // console.log('hey', param);
    <Link to={`/user-profile/${param.id}`}/>
      
  }

  const { authTokens} = useContext(AuthContext);


  // console.log(authTokens, 'nice')

  useEffect(() => {
    if (authTokens){
      if (authTokens.user.get_user_permissions_list.includes("admin") || authTokens.user.get_user_permissions_list.includes("global_admin")){
        setIsAdmin(true)
        setIsGlobalAdmin(true)
        // setCanDeleteStakeholder(true)
        // setCanEditStakeholder(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_update_user")){
        setCanEditUser(true)
      }
      if (authTokens.user.get_user_permissions_list.includes("can_deactivate_user")){
        setCanDeactivateUser(true)
      }
    }
  }, [authTokens])


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
      {(isAdmin ||  isGlobalAdmin || canEditUser) && <Tooltip title="edit User" sx={{
        color:"#000"
      }}>
        <IconButton onClick={()=>{
          // handleClickModal()
          handleUserEdit(params.row)
          // setRowId(params.id)
        }}>
          <Edit />
        </IconButton>
      </Tooltip>}
      {/* {(isAdmin ||  isGlobalAdmin || canDeactivateUser) && <Tooltip title="delete User" sx={{color:"#000"}}>
        <IconButton onClick={()=> handleDelete(params)}>
          <Delete />
        </IconButton>
      </Tooltip>} */}
      {/* <EditStakeholder rowId={rowId} /> */}
    </Box>
  );
};

export default Users
