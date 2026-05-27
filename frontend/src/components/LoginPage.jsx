import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import './AuthPage.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [working, setWorking] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    setWorking(true)
    const response = await login({ email, password })
    setWorking(false)

    if (!response.ok) {
      setError(response.error)
      return
    }

    navigate('/dashboard')
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <div className="auth-header">
          <h1>Welcome back</h1>
          <p>Sign in to manage your tasks and stay productive.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>
          <button type="submit" className="button submit-button" disabled={working}>
            {working ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </section>
    </main>
  )
}
