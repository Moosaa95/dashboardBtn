import { useContext, useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { Bookmark } from "@mui/icons-material";
import AuthContext from "../context/AuthContext";
import SettingsIcon from '@mui/icons-material/Settings';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGlobalAdmin, setIsGlobalAdmin] = useState(false);
  const [isAdminAssistant, setIsAdminAssistant] = useState(false);


  const { user, authTokens, logoutUser } = useContext(AuthContext);

  // console.log('USER BIG MAN', user);
  // useEffect(() => {
  //   if (user){
  //     setFirstName(user?.user["first_name"])
  //     setLastName(user?.user["last_name"])
  //   }
  // }, [user])

  useEffect(() => {
    if (authTokens){
      if (authTokens.user.get_user_permissions_list.includes("admin") || authTokens.user.get_user_permissions_list.includes("global_admin") ||  authTokens.user.get_user_permissions_list.includes("admin_assistant")){
        setIsAdmin(true)
        setIsGlobalAdmin(true)
        setIsAdminAssistant(true)
        
      }
      setFirstName(authTokens.user["first_name"])
      setLastName(authTokens.user["last_name"])
    }
  }, [authTokens])


  
  

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "#E2ECFC",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#122582 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square" sx={{ color: "#122582 !important", }}>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            sx={{ color: "#122582 !important", }}
            style={{
              margin: "10px 0 20px 0",
              color: "#122582 !important",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  alt="profile-user"
                  width="104px"
                  height="48px"
                  src={`../../assets/nest-logo.png`}
                  // style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} sx={{ color: "#122582 !important", }}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px" */}
                  {/* // src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {`${firstName} ${lastName}`}
                  
                </Typography>
                <Typography variant="h5" color={colors.primary[500]}>
        
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Stakeholder
            </Typography>
            {/* <Item
              title="Add Stackholder"
              to="/add-stakeholder"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="StakeHolders"
              to="/stakeholders"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}

              />
             <Item
              title="Engagements"
              to="/engagements"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Programs"
              to="/programs"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Invoices Balances"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Settings
            </Typography>
           {
             (isAdmin || isGlobalAdmin  ) && (
              <Item
              title="Users"
              to="/user-list"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             )
           }
            <Item
              title="Project"
              to="/project"
              icon={<Bookmark />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Business Sector"
              to="/sectors"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {
              (isAdmin || isGlobalAdmin  || isAdminAssistant) && 
              <Item
              title="Stakeholder Type"
              to="/stakeholder-types"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />}
            <Item
              title="General Settings"
              to="/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {authTokens ? (
              <Button variant="contained" onClick={logoutUser}>Logout</Button>
            ) : (
              <Item
              title="Login"
              to="/login"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            )
            } 

            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
