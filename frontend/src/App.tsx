import {  useAuth } from "./context/AuthContext"
import {  BrowserRouter, Route, Routes } from "react-router"

import { ROUTES } from "./routes"

import ProtectedRoute from "./components/ProtectRoute"
import PublicRoute from "./components/PublicRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ChooseForm from "./pages/ChooseForm"

import OperationLogForm from "./pages/reportForms/OperationLogForm"
import PatientLogForm from "./pages/reportForms/PatientLogForm"

import TestComponent from "./pages/TestComponent"
import LoadingScreen from "./components/common/LoadingScreen"
import { useEffect } from "react"
import NotFound from "./pages/NotFound"
import DashboardLayout from "./pages/DashboardLayout"
import Dashboard from "./modules/adminDashboard/content/Dashboard"
import Operations from "./modules/adminDashboard/content/Operations"
import Patients from "./modules/adminDashboard/content/Patients"
import Vehicles from "./modules/adminDashboard/content/Vehicles"
import Inventory from "./modules/adminDashboard/content/Inventory"
import Archives from "./modules/adminDashboard/content/Archives"
import ManagerUsers from "./modules/adminDashboard/content/ManageUsers"
import UserProfile from "./modules/adminDashboard/content/UsersProfile"
import Reports from "./modules/adminDashboard/content/Reports"
import SettingsPage from "./modules/adminDashboard/content/SettingsPage"


function App() {
  const { loading } = useAuth();

useEffect(() => {
  function preventFileDrop(event: DragEvent) {
    if (event.dataTransfer?.types.includes("Files")) {
      event.preventDefault();
    }
  }

  window.addEventListener("dragover", preventFileDrop);
  window.addEventListener("drop", preventFileDrop);

  return () => {
    window.removeEventListener("dragover", preventFileDrop);
    window.removeEventListener("drop", preventFileDrop);
  };
}, []);

  return (
    <BrowserRouter>
      {loading && <LoadingScreen />}
      <Routes>

        <Route path={ROUTES.ROOT} element={
          <Home/>
        }/>

        <Route path={ROUTES.LOGIN} element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>

        <Route path={ROUTES.CHOOSE_FORM} element={
          <ChooseForm/>
        }/>

        <Route path={ROUTES.OPERATIONLOG_FORM} element={<OperationLogForm/>}/>
        <Route path={ROUTES.PATIENTLOG_FORM} element={<PatientLogForm/>}/>
        <Route path={ROUTES.VEHICULARDISPATCH_FORM} />


        <Route
          path={ROUTES.DASHBOARD.ROOT}
          element={
            <ProtectedRoute skip={false}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard/>} />
          <Route path="operations" element={<Operations />} />
          <Route path="patients" element={<Patients />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="archives" element={<Archives />} />
          <Route path="users" element={<ManagerUsers />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<SettingsPage />} />

        </Route>

        <Route path="*" element={<NotFound />} />


        {/* http://localhost:5173/test-components */}
        {/* remove after development */}
        <Route path="/test-components" element={<TestComponent/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
