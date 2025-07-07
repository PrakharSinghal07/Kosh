import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/user/Dashboard'
import Home from '../pages/user/Home'
import VerifyOTP from '../pages/auth/VerifyOTP'
import ProtectedRoute from './ProtectedRoute'

const AppRoutes = () => {
  return (
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register/verify' element={<VerifyOTP />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default AppRoutes