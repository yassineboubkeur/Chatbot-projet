import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ResetPassword() {
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    }
  }, [location])

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Password for ${email} has been reset to: ${newPassword}`)
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h3 className="text-center mb-4">Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" className="form-control" value={email} readOnly />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="New password"
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <button className="btn btn-success w-100" type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  )
}
