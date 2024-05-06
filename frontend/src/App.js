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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationForm />} />

          {/* Authenticated Routes */}
          <Route
            path="/*"
            element={
              <AuthenticatedLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/settled" element={<Settled />} />
                  <Route path="/pending" element={<Pending />} />
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
