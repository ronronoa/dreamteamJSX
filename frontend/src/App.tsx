import {  useAuth } from "./context/AuthContext"
import {  HashRouter, Route, Routes } from "react-router"

import { ROUTES } from "./routes"

import ProtectedRoute from "./components/ProtectRoute"
import PublicRoute from "./components/PublicRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ChooseForm from "./pages/ChooseForm"
import AdminDashBoard from "./pages/AdminDashboard"

import OperationLogForm from "./pages/reportForms/OperationLogForm"
import NewPatientLogForm from "./pages/reportForms/NewPatientLogForm"

import TestComponent from "./pages/TestComponent"
import LoadingScreen from "./components/common/LoadingScreen"
import { useEffect } from "react"


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
    <HashRouter>
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
        <Route path={ROUTES.NEWPATIENTLOG_FORM} element={<NewPatientLogForm/>}/>


        <Route path={ROUTES.ADMIN_DASHBOARD} element={
          <ProtectedRoute skip={ false }>
            <AdminDashBoard/>
          </ProtectedRoute>
        }/>


        {/* http://localhost:5173/test-components */}
        {/* remove after development */}
        <Route path="/test-components" element={<TestComponent/>}/>

      </Routes>
    </HashRouter>
  )
}

export default App
