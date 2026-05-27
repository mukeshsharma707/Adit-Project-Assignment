import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import './AuthPage.css'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [working, setWorking] = useState(false)
  const navigate = useNavigate()
  const { signup } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please enter name, email, and password.')
      return
    }

    setWorking(true)
    const response = await signup({ name, email, password })
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
          <h1>Create an account</h1>
          <p>Start managing tasks with a simple signup flow.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
            />
          </label>
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
              placeholder="Create a password"
            />
          </label>
          <button type="submit" className="button submit-button" disabled={working}>
            {working ? 'Creating account...' : 'Signup'}
          </button>
        </form>
      </section>
    </main>
  )
}
