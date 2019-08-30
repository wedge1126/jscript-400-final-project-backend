const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isAdmin } = require('../middleware/auth')

router.get('/ungraded', isLoggedIn, isAdmin, async (req, res, next) => {
  const status = 200
  const users = await User.find({ type: 'STUDENT' }).select('first_name last_name assignments')
  users.map((u) => {
    u.assignments = u.assignments.filter((a) => !a.grade || !a.maxGrade)
  })
  res.status(status).json({ status, response: users.filter((u) => u.assignments.length > 0) })
})

router.get('/graded', isLoggedIn, isAdmin, async (req, res, next) => {
  const status = 200
  const users = await User.find({ type: 'STUDENT' }).select('first_name last_name assignments')
  users.map((u) => {
    u.assignments = u.assignments.filter((a) => a.grade && a.maxGrade)
  })
  res.status(status).json({ status, response: users.filter((u) => u.assignments.length > 0) })
})

module.exports = router