const { Router } = require('express')
const router = Router()
const authController = require('../controllers/auth')

router.post('/signin', authController.auth2)

module.exports = router
