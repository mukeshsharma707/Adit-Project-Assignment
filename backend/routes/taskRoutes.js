const express = require('express')
const Task = require('../models/Task')
const authenticate = require('../middleware/authMiddleware')

const router = express.Router()

router.use(authenticate)

router.get('/', async (req, res) => {
  const status = req.query.status
  const filter = { user: req.user._id }
  if (status === 'completed') filter.completed = true
  if (status === 'pending') filter.completed = false

  try {
    const tasks = await Task.find(filter).sort({ createdAt: -1 })
    res.json(tasks)
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
