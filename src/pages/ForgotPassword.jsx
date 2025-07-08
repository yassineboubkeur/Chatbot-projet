import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Verification email sent to: ${email}`)
    navigate('/reset', { state: { email } })
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h3 className="text-center mb-4">Forgot Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button className="btn btn-warning w-100" type="submit">Send Verification</button>
          </form>
        </div>
      </div>
    </div>
  )
}
