import { createContext, useContext, useEffect, useState } from 'react'
import { loginUser, signupUser } from '../api/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('task-manager-user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const login = async ({ email, password }) => {
    if (!email || !password) {
      return { ok: false, error: 'Email and password are required.' }
    }

    try {
      const data = await loginUser({ email, password })
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        token: data.token,
      }
      localStorage.setItem('task-manager-user', JSON.stringify(userData))
      setUser(userData)
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  const signup = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      return { ok: false, error: 'Name, email, and password are required.' }
    }

    try {
      const data = await signupUser({ name, email, password })
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        token: data.token,
      }
      localStorage.setItem('task-manager-user', JSON.stringify(userData))
      setUser(userData)
      return { ok: true }
    } catch (error) {
      return { ok: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('task-manager-user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
