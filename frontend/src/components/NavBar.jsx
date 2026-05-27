import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import './NavBar.css'

export default function NavBar() {
  const { user, logout } = useAuth()

  return (
    <nav className="app-nav">
      <div className="nav-brand">
        <Link to="/">Task Manager</Link>
      </div>
      <div className="nav-actions">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link className="nav-primary" to="/dashboard">
              Dashboard
            </Link>
            <button className="nav-logout" type="button" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link className="nav-primary" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
