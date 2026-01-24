import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import RegisterCoordinator from "./pages/coordinator/RegisterCoordinator"
import './App.css'
import LoginCoordinator from './pages/coordinator/LoginCoordinator'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<RegisterCoordinator/>}/>
      <Route path='/coordinator-login' element={<LoginCoordinator/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
