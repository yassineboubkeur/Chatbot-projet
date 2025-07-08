import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaTachometerAlt, FaUserFriends, FaUsers, FaCog } from 'react-icons/fa'
import '../components/css/Sidebar.css'

export default function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Clients', path: '/clients', icon: <FaUserFriends /> },
    { name: 'Team', path: '/team', icon: <FaUsers /> },
    { name: 'Settings', path: '/settings', icon: <FaCog /> },
  ]

  return (
    <nav
      className="bg-light p-3 border rounded"
      style={{ width: '250px', minHeight: 'calc(100vh - 120px)', position: 'sticky', top: '80px' }}
    >
      <ul className="nav flex-column">
        {menuItems.map(({ name, path, icon }) => (
          <li key={name} className="nav-item mb-2">
            <Link
              to={path}
              className={`nav-link d-flex align-items-center gap-2 ${
                location.pathname === path ? 'active fw-bold text-primary' : 'text-dark'
              }`}
              style={{ borderRadius: '4px' }}
            >
              <span style={{ fontSize: '1.2rem' }}>{icon}</span> {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
