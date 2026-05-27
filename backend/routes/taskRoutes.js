const express = require('express')
const Task = require('../models/Task')
const authenticate = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authenticate)

router.get('/', async (req, res) => {
  const status = req.query.status
  const search = req.query.search
  const page = Math.max(Number(req.query.page) || 1, 1)
  const limit = Math.max(Number(req.query.limit) || 8, 1)

  const filter = { user: req.user._id }
  if (status === 'completed') filter.completed = true
  if (status === 'pending') filter.completed = false

  if (search) {
    const searchRegex = new RegExp(search.trim(), 'i')
    filter.$or = [
      { title: searchRegex },
      { description: searchRegex },
    ]
  }

  try {
    const total = await Task.countDocuments(filter)
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    // Get counts for completed and pending (only when viewing all tasks)
    let completedCount = 0
    let pendingCount = 0
    if (!status) {
      completedCount = await Task.countDocuments({ user: req.user._id, completed: true })
      pendingCount = await Task.countDocuments({ user: req.user._id, completed: false })
    }

    res.json({
      tasks,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      counts: {
        completed: completedCount,
        pending: pendingCount,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch tasks.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title) {
      return res.status(400).json({ message: 'Task title is required.' })
    }

    const task = await Task.create({
      title,
      description: description || '',
      user: req.user._id,
    })

    res.status(201).json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create task.' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, completed } = req.body
    const task = await Task.findOne({ _id: id, user: req.user._id })
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' })
    }

    if (title !== undefined) task.title = title
    if (description !== undefined) task.description = description
    if (completed !== undefined) task.completed = completed

    await task.save()
    res.json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update task.' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id })
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' })
    }
    res.json({ message: 'Task deleted.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete task.' })
  }
})

module.exports = router
