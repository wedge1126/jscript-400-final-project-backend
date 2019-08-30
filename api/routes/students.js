const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser, isAdmin } = require('../middleware/auth')

const excludeKeys = '-__v -password'

router.get('/', isLoggedIn, async (req, res, next) => {
  const status = 200
  const exclude = req.isAdmin ? excludeKeys : `${excludeKeys} -assignments`
  const response = await User.find({ type: 'STUDENT' }).select(exclude)
  res.status(status).json({ status, response })
})

router.get('/:userId/assignments', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200
  const response = await User.findById(req.params.userId).select('assignments')
  res.status(status).json({ status, response })
})

router.post('/:userId/assignments', isLoggedIn, isSameUser, async (req, res, next) => {
  try {
    const status = 201
    const { assignment_title, project_description, project_link } = req.body
    const user = await User.findById(req.params.userId).select(excludeKeys);
    user.assignments.push({assignment_title, project_description, project_link})
    const response = await user.save()
    res.status(status).json({status, response})
  } catch(e) {
    next(e)
  }
})

router.get('/:userId/assignments/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  const status = 200
  const user = await User.findById(req.params.userId).select('assignments')
  const response = user.assignments.id(req.params.assignmentId)
  res.status(status).json({ status, response })
})

router.put('/:userId/assignments/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  try {
    const status = 200
    const { assignment_title, project_description, project_link } = req.body
    const user = await User.findById(req.params.userId).select('assignments')
    const assignment = user.assignments.id(req.params.assignmentId)
    Object.assign(assignment, {assignment_title, project_description, project_link})
    const response = await user.save()
    res.status(status).json({ status, response: response.assignments.id(req.params.assignmentId) })
  } catch(e) {
    next(e)
  }
})

router.patch('/:userId/assignments/:assignmentId', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const status = 200
    const { grade, maxGrade } = req.body
    const user = await User.findById(req.params.userId).select('assignments')
    const assignment = user.assignments.id(req.params.assignmentId)
    Object.assign(assignment, {grade, maxGrade})
    const response = await user.save()
    res.status(status).json({ status, response: response.assignments.id(req.params.assignmentId) })
  } catch(e) {
    next(e)
  }
})

router.delete('/:userId/assignments/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {
  try { 
    const status = 200
    const user = await User.findById(req.params.userId).select('assignments')
    const assignment = user.assignments.id(req.params.assignmentId)
    if(!assignment) return next({status: 404, message: 'Assignment not found.'})
    
    assignment.remove()
    await user.save()
    res.status(status).json({ status, response: 'Assignment deleted.' })
  } catch(e) {
    next(e)
  }
})

module.exports = router
