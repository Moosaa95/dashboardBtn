import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import StackHolderForm from "./scenes/StackHoldersForm";
import Login from "./scenes/login";
import PrivateRoutes from "./scenes/utils/PrivateRoute";
import SignUp from "./scenes/signup";
import ForgotPassword from "./forgotPassword/forgotPassword";
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
                <Route path="/contacts" element={<Contacts />} />
                {/* <Route path="/invoices" element={<Invoices />} /> */}
                <Route path="/add-user" element={<Form />} />
                <Route path="/add-stakeholder" element={<StackHolderForm />} />
                <Route path="/calendar" element={<Calendar />} />
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
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
