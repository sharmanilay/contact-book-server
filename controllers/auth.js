const passport = require('passport')
const db = require('../models')
const jwt = require('jsonwebtoken')

module.exports.auth = passport.authenticate('google', {
	scope: [
		'email',
		'profile',
		'https://www.googleapis.com/auth/contacts.readonly'
	]
})

module.exports.auth2 = async (req, res) => {
	const { accessToken, profile } = req.body
	const { name, email, imageUrl } = profile
	passport.googleaccessToken = accessToken
	const newUser = await db.User.upsert({
		name,
		email,
		picture: imageUrl
	})
	let token = jwt.sign({ data: newUser }, passport.jwtSecret)
	res.status(200).send({ token })
}

module.exports.login = (req, res) => {
	const { profile } = req.user
	const { name, email, picture } = profile._json
	db.User.upsert(
		{
			name,
			email,
			picture
		},
		{ returning: true }
	).then((user) => {
		let token = jwt.sign(
			{
				user: {
					id: user.id,
					email: user.email,
					name: user.name
				},
				exp: 1516239022
			},
			passport.jwtSecret
		)
		res.cookie('jwt', token)
	})
}
