// src/layouts/DashboardLayout.jsx
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../../layouts/Sidebar";


export default function DashboardLayout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
