import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import RegisterCoordinator from "./pages/coordinator/RegisterCoordinator"
import './App.css'
import LoginCoordinator from './pages/coordinator/LoginCoordinator'
import CoordinatorDashboard from './pages/coordinator/CoordinatorDashboard'
import AddEvent from './pages/coordinator/AddEvent'
import RegisterAdmin from "./pages/Admin/RegisterAdmin";
import LoginAdmin from "./pages/Admin/LoginAdmin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageCoordinators from "./pages/Admin/ManageCoordinators";
import AdminProtectedRoute from "./components/AdminProtectedRoute";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>

 

      <Route  path='/' element={<RegisterAdmin/>}/>
      <Route path='/admin-login' element={<LoginAdmin/>} />
      <Route path='/coordinator/dashboard' element={<CoordinatorDashboard/>} />
      <Route path='/add-event' element={<AddEvent/>} />

      <Route path="/admin/dashboard" 
              element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />

        <Route path="/admin/manage-coordinators"
             element={<AdminProtectedRoute> <ManageCoordinators /></AdminProtectedRoute> } />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
  