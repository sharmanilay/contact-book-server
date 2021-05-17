const { Router } = require('express')
const router = Router()
const authController = require('../controllers/auth')

router.post('/signin', authController.auth)

module.exports = router
