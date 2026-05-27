import { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createTask, deleteTask, fetchTasks, updateTask } from '../api/api.js'
import './AuthPage.css'

export default function DashboardPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
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
        const taskList = await fetchTasks({ status: statusFilter === 'all' ? '' : statusFilter, token: user.token })
        setTasks(taskList)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [user, statusFilter])

  const activeTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks])
  const completedTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks])

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

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <main className="auth-page dashboard-page">
      <section className="auth-panel">
        <div className="auth-header">
          <h1>Task dashboard</h1>
          <p>Manage your tasks, mark them complete, edit details, and filter your task list.</p>
        </div>

        <div className="dashboard-summary">
          <span>{activeTasks.length} pending</span>
          <span>{completedTasks.length} completed</span>
        </div>

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
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={statusFilter === 'pending' ? 'filter active' : 'filter'}
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </button>
          <button
            type="button"
            className={statusFilter === 'completed' ? 'filter active' : 'filter'}
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </button>
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <div className="task-list">
            {tasks.length === 0 ? (
              <p className="empty-state">No tasks yet. Add one to get started.</p>
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
        )}
      </section>
    </main>
  )
}
