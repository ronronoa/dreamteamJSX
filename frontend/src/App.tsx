import {  useAuth } from "./context/AuthContext"
import { BrowserRouter, Route, Routes } from "react-router"

import { ROUTES } from "./routes"

import ProtectedRoute from "./components/ProtectRoute"
import PublicRoute from "./components/PublicRoute"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ChooseForm from "./pages/ChooseForm"
import CreateForm from "./pages/CreateForm"
import AdminDashBoard from "./pages/AdminDashboard"

import TestComponent from "./pages/TestComponent"
import LoadingScreen from "./components/common/LoadingScreen"


function App() {
  const { loading } = useAuth();
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
          <PublicRoute>
            <ChooseForm/>
          </PublicRoute>
        }/>

        <Route path={ROUTES.CREATE_FORM} element={<CreateForm/>}/>


        <Route path={ROUTES.ADMIN_DASHBOARD} element={
          <ProtectedRoute skip={ false }>
            <AdminDashBoard/>
          </ProtectedRoute>
        }/>


        {/* http://localhost:5173/test-components */}
        {/* remove after development */}
        <Route path="/test-components" element={<TestComponent/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
