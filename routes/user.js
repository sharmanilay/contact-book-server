const { Router } = require('express')
const router = Router()
const passport = require('passport')
const userController = require('../controllers/user')

router.get(
	'/get-contacts',
	passport.authenticate('jwt', { session: false, failWithError: true }),
	userController.getUserContacts
)

router.get(
	'/get-contact-details',
	passport.authenticate('jwt', { session: false, failWithError: true }),
	userController.getContactDetails
)
module.exports = router
