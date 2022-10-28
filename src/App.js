import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import { StakeHoldeDetail } from "./scenes/contacts/StakeHoldeDetail";
import AddProject from "./scenes/project/AddProject"

// import { AuthProvider } from "./scenes/context/AuthContext";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

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
              <Route element={<PrivateRoutes setLoggedIn={setLoggedIn} />}>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/users" element={<Team />} />
                <Route path="/stakeholders" element={<StakeHolders />} />
                <Route path="/stakeholder-detail/:stakeholderId" element={<StakeHoldeDetail />} />
                <Route path="/project" element={<Project />} />
                <Route path="/add-project" element={<AddProject />} />
                {/* <Route path="/invoices" element={<Invoices />} /> */}
                <Route path="/add-user" element={<Form />} />
                <Route path="/add-stakeholder" element={<StackHolderForm />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/sectors" element={<Sectors />} />
                <Route path="/add-sector" element={<BusinessSector />} />
                <Route
                  path="/add-stakeholder-type"
                  element={<AddStakeholderType />}
                />
                <Route
                  path="/stakeholder-types"
                  element={<StakeholderType />}
                />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/add-program" element={<AddProgram />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/add-engagement" element={<AddEngagement />} />
                <Route path="/engagements" element={<Engagements />} />
                {/* <Route path="/geography" element={<Geography />} /> */}
              </Route>
              <Route
                path="/login"
                element={<Login setLoggedIn={setLoggedIn} />}
              />
              <Route
                path="/register"
                element={<SignUp setLoggedIn={setLoggedIn} />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/auth/user/:uuid64/verify/:token"
                element={<EmailVerify setLoggedIn={setLoggedIn} />}
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;