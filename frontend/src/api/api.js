const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const jsonHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

const parseResponse = async (response) => {
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const error = (body && body.message) || 'Request failed'
    throw new Error(error)
  }
  return body
}

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email, password }),
  })
  return parseResponse(response)
}

export const signupUser = async ({ name, email, password }) => {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ name, email, password }),
  })
  return parseResponse(response)
}

export const fetchTasks = async ({ status, token }) => {
  const query = status ? `?status=${status}` : ''
  const response = await fetch(`${API_BASE}/tasks${query}`, {
    headers: jsonHeaders(token),
  })
  return parseResponse(response)
}

export const createTask = async ({ title, description, token }) => {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify({ title, description }),
  })
  return parseResponse(response)
}

export const updateTask = async ({ id, data, token }) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: jsonHeaders(token),
    body: JSON.stringify(data),
  })
  return parseResponse(response)
}

export const deleteTask = async ({ id, token }) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
    headers: jsonHeaders(token),
  })
  return parseResponse(response)
}
