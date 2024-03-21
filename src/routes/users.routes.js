const { Router } = require('express')
const { getAllUsers, getUser, createUser, deleteUser, updateUser, login } = require('../controllers/users.controllers')

const router = Router()

// ? Todas las rutas del controllers
router.get('/api/v1/users', getAllUsers)
router.get('/api/v1/users/:id', getUser)
router.post('/api/v1/users', createUser)
router.post('/api/v1/users/login', login)
router.put('/api/v1/users/:id', updateUser)
router.delete('/api/v1/users/:id', deleteUser)

module.exports = router