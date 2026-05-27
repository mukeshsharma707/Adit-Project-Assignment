import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export default function GuestRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <p className="page-loading">Checking authentication...</p>
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
