import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Secret from './components/Secret'
import Register from './components/Register'
import 'react-toastify/dist/ReactToastify.css';
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import Deletion from './components/Deletion'

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Secret/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/terms-of-service' element={<TermsOfService/>}/>
          <Route path='/account-deletion' element={<Deletion/>}/>
        </Routes>
    </BrowserRouter>
  )
}

