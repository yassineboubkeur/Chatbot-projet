// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from "./pages/dashboard/DashboardLayout"; 
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Clients from './pages/clients/Clients'
import Services from './pages/services/Services'
import AddService from './pages/services/Add_service'
import UpdateService from './pages/services/Update_service'
import Products from './pages/products/Products'
import UpdateProduct from './pages/products/Update_product'
import AddProduct from './pages/products/Add_product'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* الصفحات العامة */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />

        {/* روتات الـ Dashboard مع تنظيم Nested */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="clients" element={<Clients />} />
          <Route path="services" element={<Services />} />
          <Route path="services/add" element={<AddService />} />
          <Route path="services/edit/:id" element={<UpdateService />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<UpdateProduct />} />
        </Route>
      </Route>
    </Routes>
  )
}
