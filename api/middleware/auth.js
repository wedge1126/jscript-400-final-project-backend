const { decodeToken } = require('../lib/token')

const isLoggedIn = (req, _res, next) => {
  if (!req.token) {
    const error = new Error(`You are not logged in.`)
    error.status = 401
    return next(error)
  }

  try {
    const payload = decodeToken(req.token)
    req.isAdmin = payload.type === 'ADMIN'
    next()
  } catch (e) {
    console.error(e)
    const error = new Error(`There is a problem with your credentials.`)
    error.status = 401
    next(error)
  }
}

const isSameUser = (req, _res, next) => {
  const id = req.params.userId
  const payload = decodeToken(req.token)
  if (payload.id === id) return next()

  const error = new Error(`You are not authorized to access this route.`)
  error.status = 401
  next(error)
}

const isSameUserOrAdmin = (req, _res, next) => {
  const id = req.params.userId
  const payload = decodeToken(req.token)
  if (payload.id === id || payload.type === 'ADMIN') return next()

  const error = new Error(`You are not authorized to access this route.`)
  error.status = 401
  next(error)
}

const isAdmin = (req, _res, next) => {
  const payload = decodeToken(req.token)
  if(payload.type === 'ADMIN') return next()

  const error = new Error(`You are not authorized to access this route.`)
  error.status = 401
  next(error)
}

module.exports = { isLoggedIn, isSameUser, isSameUserOrAdmin, isAdmin }
