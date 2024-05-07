import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegistrationForm from "./RegistrationForm";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Settled from "./scenes/Settled";
import Pending from "./scenes/pending";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ComplaintForm from "./scenes/complaint/userindex";
import EmployeePending from "./scenes/pending/employeeIndex";
import EmployeeSettled from "./scenes/Settled/employeeIndex";

function AuthenticatedLayout({ children }) {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <div className="inner-content">{children}</div>
      </main>
    </div>
  );
}


function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Unauthenticated Routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationForm />} />

          {/* Authenticated Routes */}
          <Route
            path="/*"
            element={
              <AuthenticatedLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/employer/settled" element={<Settled employerID="EMPLOYER002" />} />
                  <Route path="/employee/settled" element={<EmployeeSettled empID="EMP002"/>} />
                  <Route path="/employer/pending" element={<Pending employerID="EMPLOYER001" />} />
                  <Route path="/employee/pending" element={<EmployeePending empID="EMP002"/>} />
                  <Route path="/form" element={<Form />} />
                  <Route path="/complaint" element={<ComplaintForm />} />
                </Routes>
              </AuthenticatedLayout>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
