import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Dashboard from '../pages/user/Dashboard'
import Home from '../pages/user/Home'
import VerifyOTP from '../pages/auth/VerifyOTP'
import ProtectedRoute from './ProtectedRoute'
import Books from '../pages/user/Books'
import Catalog from '../pages/user/Catalog'
import Users from '../pages/user/Users'
import AddNewAdmin from '../pages/user/AddNewAdmin'
import { AuthContext } from '../context/AuthContext'
import Profile from '../pages/user/Profile'
import ChangePassword from '../pages/user/ChangePassword'

const AppRoutes = () => {
  const {user, isAdmin} = useContext(AuthContext);
  return (
    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register/verify' element={<VerifyOTP />} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/books' element={<ProtectedRoute><Books /></ProtectedRoute>} />
      <Route path='/catalog' element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
      {isAdmin(user) && <Route path='/users' element={<ProtectedRoute><Users /></ProtectedRoute>} />}
      <Route path='/add-new-admin' element={<ProtectedRoute><AddNewAdmin /></ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/change-password' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
    </Routes>
  )
}

export default AppRoutes