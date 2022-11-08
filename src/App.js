import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Secret from './components/Secret'
import Register from './components/Register'
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Secret/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </BrowserRouter>
  )
}

