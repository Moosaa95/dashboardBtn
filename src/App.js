// import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
import Project from "./scenes/project";
// import Bar from "./scenes/bar";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import StackHolderForm from "./scenes/StackHoldersForm";
import Login from "./scenes/login";
import PrivateRoutes from "./scenes/utils/PrivateRoute";
import SignUp from "./scenes/signup";
import ForgotPassword from "./forgotPassword/forgotPassword";
import Sectors from "./scenes/sectors";
import BusinessSector from "./scenes/sectors/add-sector";
import AddStakeholderType from "./scenes/stakeholder-type/add-stakeholder-type";
import StakeholderType from "./scenes/stakeholder-type/";
import UserList from "./scenes/form/user-list";
import AddProgram from "./scenes/programs/add-programs";
import Programs from "./scenes/programs";
import AddEngagement from "./scenes/engagement/add-engagement";
import Engagements from "./scenes/engagement";
import StakeHolders from "./scenes/contacts";
import { EmailVerify } from "./scenes/EmailVerify";
import { CheckMail } from "./scenes/EmailVerify/CheckMail";
import { StakeHoldeDetail } from "./scenes/contacts/StakeHoldeDetail";
import AddProject from "./scenes/project/AddProject";
import { UserDetail } from "./scenes/form/UserDetails";
import { ResetPassword } from "./forgotPassword/ResetPassword";
import Settings from "./scenes/generalsettings";
import { EngagementDetail } from "./scenes/engagement/EngagementDetail";
import { ProjectDetail } from "./scenes/project/ProjectDetails";
import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./scenes/context/AuthContext";
import "./index.css";
import "../src/index.css";

// import { AuthProvider } from "./scenes/context/AuthContext";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const { authTokens } = useContext(AuthContext);
  // const navigate  = useNavigate()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {loggedIn ? (
            <Sidebar isSidebar={isSidebar} setLoggedIn={setLoggedIn} />
          ) : (
            <></>
          )}
          <main className="content">
            {/* <Topbar setIsSidebar={setIsSidebar} /> */}
            <Routes>
              <Route
                element={<PrivateRoutes setLoggedIn={setLoggedIn} />}
              ></Route>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/users" element={<Team />} />
              <Route path="/stakeholders" element={<StakeHolders />} />
              <Route
                path="/stakeholder-detail/:id"
                element={<StakeHoldeDetail />}
              />
              <Route path="/project" element={<Project />} />
              <Route path="/add-project" element={<AddProject />} />
              {/* <Route path="/invoices" element={<Invoices />} /> */}
              <Route path="/add-user" element={<Form />} />
              <Route path="/add-stakeholder" element={<StackHolderForm />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/sectors" element={<Sectors />} />
              <Route path="/add-sector" element={<BusinessSector />} />
              <Route path="/settings" element={<Settings />} />
              <Route
                path="/add-stakeholder-type"
                element={<AddStakeholderType />}
              />
              <Route path="/stakeholder-types" element={<StakeholderType />} />
              <Route path="/user-list" element={<UserList />} />
              <Route path="/user-profile/:id" element={<UserDetail />} />
              <Route
                path="/engagement-detail/:id"
                element={<EngagementDetail />}
              />
              <Route path="/project-detail/:id" element={<ProjectDetail />} />
              <Route path="/add-program" element={<AddProgram />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/add-engagement" element={<AddEngagement />} />
              <Route path="/engagements" element={<Engagements />} />
              {/* <Route path="/geography" element={<Geography />} /> */}
              <Route
                path="/login"
                element={
                  authTokens ? (
                    <Navigate to="/" />
                  ) : (
                    <Login setLoggedIn={setLoggedIn} />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  authTokens ? (
                    <Navigate to="/" />
                  ) : (
                    <SignUp setLoggedIn={setLoggedIn} />
                  )
                }
              />
              <Route
                path="/forgot-password"
                element={authTokens ? <Navigate to="/" /> : <ForgotPassword />}
              />
              <Route
                path="/auth/user/:uuid64/verify/:token"
                element={
                  authTokens ? (
                    <Navigate to="/" />
                  ) : (
                    <EmailVerify setLoggedIn={setLoggedIn} />
                  )
                }
              />
              <Route
                path="/auth/check-mail"
                element={authTokens ? <Navigate to="/" /> : <CheckMail />}
              />
              <Route
                path="/auth/reset-password/:uuid64/:token"
                element={
                  authTokens ? (
                    <Navigate to="/" />
                  ) : (
                    <ResetPassword setLoggedIn={setLoggedIn} />
                  )
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
