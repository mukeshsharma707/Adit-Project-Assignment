import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createTask, deleteTask, fetchTasks, updateTask } from '../api/api.js'
import './AuthPage.css'

export default function DashboardPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(6)
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit, totalPages: 1 })
  const [counts, setCounts] = useState({ completed: 0, pending: 0 })
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  useEffect(() => {
    if (!user) return

    const loadTasks = async () => {
      setLoading(true)
      setError('')
      try {
        const payload = await fetchTasks({
          status: statusFilter === 'all' ? '' : statusFilter,
          search,
          page,
          limit,
          token: user.token,
        })
        setTasks(payload.tasks)
        setPagination(payload.pagination)
        setCounts(payload.counts || { completed: 0, pending: 0 })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [user, statusFilter, search, page, limit])

  const handleSaveTask = async (event) => {
    event.preventDefault()
    setError('')
    if (!title.trim()) {
      setError('Please enter a title for the task.')
      return
    }

    setSaving(true)
    try {
      const newTask = await createTask({ title, description, token: user.token })
      setTasks((current) => [newTask, ...current])
      setTitle('')
      setDescription('')
      setPage(1)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleToggleComplete = async (task) => {
    try {
      const updated = await updateTask({
        id: task._id,
        data: { completed: !task.completed },
        token: user.token,
      })
      setTasks((current) => current.map((item) => (item._id === updated._id ? updated : item)))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask({ id, token: user.token })
      setTasks((current) => current.filter((task) => task._id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (task) => {
    setEditingTaskId(task._id)
    setEditTitle(task.title)
    setEditDescription(task.description)
  }

  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditTitle('')
    setEditDescription('')
  }

  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setError('Task title cannot be blank.')
      return
    }
    try {
      const updated = await updateTask({
        id: editingTaskId,
        data: { title: editTitle, description: editDescription },
        token: user.token,
      })
      setTasks((current) => current.map((task) => (task._id === updated._id ? updated : task)))
      cancelEdit()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearch(searchTerm.trim())
    setPage(1)
  }

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return
    setPage(newPage)
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <main className="auth-page dashboard-page">
      <section className="auth-panel">
        <div className="auth-header">
          <h1>Task dashboard</h1>
          <p>Search tasks, filter status, and manage your work with pagination support.</p>
        </div>

        <div className="dashboard-summary">
          <span>{counts.pending} pending</span>
          <span>{counts.completed} completed</span>
          <span>{pagination.total} total</span>
        </div>

        <form className="search-form" onSubmit={handleSearchSubmit}>
          <label>
            Search tasks
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title or description"
            />
          </label>
          <button type="submit" className="button secondary">
            Search
          </button>
        </form>

        <form className="auth-form" onSubmit={handleSaveTask}>
          {error && <div className="auth-error">{error}</div>}
          <label>
            New task title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
            />
          </label>
          <label>
            Description (optional)
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe the task"
            />
          </label>
          <button type="submit" className="button submit-button" disabled={saving}>
            {saving ? 'Saving task...' : 'Add Task'}
          </button>
        </form>

        <div className="task-controls">
          <button
            type="button"
            className={statusFilter === 'all' ? 'filter active' : 'filter'}
            onClick={() => {
              setStatusFilter('all')
              setPage(1)
            }}
          >
            All
          </button>
          <button
            type="button"
            className={statusFilter === 'pending' ? 'filter active' : 'filter'}
            onClick={() => {
              setStatusFilter('pending')
              setPage(1)
            }}
          >
            Pending
          </button>
          <button
            type="button"
            className={statusFilter === 'completed' ? 'filter active' : 'filter'}
            onClick={() => {
              setStatusFilter('completed')
              setPage(1)
            }}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <>
            <div className="task-list">
              {tasks.length === 0 ? (
                <p className="empty-state">No tasks found. Try a different search or add a new task.</p>
              ) : (
                tasks.map((task) => (
                  <article key={task._id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                    <div className="task-card__main">
                      <div>
                        <h3>{task.title}</h3>
                        <p>{task.description || 'No description provided.'}</p>
                      </div>
                      <div className="task-card__actions">
                        <button type="button" className="secondary" onClick={() => handleToggleComplete(task)}>
                          {task.completed ? 'Mark pending' : 'Mark complete'}
                        </button>
                        <button type="button" className="secondary" onClick={() => startEdit(task)}>
                          Edit
                        </button>
                        <button type="button" className="secondary danger" onClick={() => handleDelete(task._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                    {editingTaskId === task._id && (
                      <div className="task-edit-panel">
                        <label>
                          Title
                          <input value={editTitle} onChange={(event) => setEditTitle(event.target.value)} />
                        </label>
                        <label>
                          Description
                          <input value={editDescription} onChange={(event) => setEditDescription(event.target.value)} />
                        </label>
                        <div className="task-edit-actions">
                          <button type="button" className="button" onClick={saveEdit}>
                            Save
                          </button>
                          <button type="button" className="button secondary" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>

            {pagination.totalPages > 1 && (
              <div className="pagination-bar">
                <button type="button" className="button secondary" onClick={() => goToPage(page - 1)} disabled={page === 1}>
                  Previous
                </button>
                <span>
                  Page {page} of {pagination.totalPages}
                </span>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => goToPage(page + 1)}
                  disabled={page === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}
