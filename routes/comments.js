const { Router } = require('express')
const router = Router()
const passport = require('passport')
const commentsController = require('../controllers/comments')

router.get(
	'/get-comments',
	passport.authenticate('jwt', { session: false, failWithError: true }),
	commentsController.getComments
)

router.post(
	'/create-comment',
	passport.authenticate('jwt', { session: false, failWithError: true }),
	commentsController.create
)
router.post(
	'/delete-comment',
	passport.authenticate('jwt', { session: false, failWithError: true }),
	commentsController.delete
)

module.exports = router
