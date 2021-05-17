const passport = require('passport')
const db = require('../models')
const jwt = require('jsonwebtoken')

module.exports.auth = async (req, res) => {
	try {
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
	} catch (err) {
		if (err.response) {
			res.status(err.response.status).send(err)
		} else {
			res.status(500).send(err)
		}
	}
}

module.exports.login = async (req, res) => {
	try {
		const { profile } = req.user
		const { name, email, picture } = profile._json
		const user = await db.User.upsert(
			{
				name,
				email,
				picture
			},
			{ returning: true }
		)
		const token = jwt.sign(
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
		res.status(200).send('Logged in succesfully')
	} catch (err) {
		if (err.response) {
			res.status(err.response.status).send(err)
		} else {
			res.status(500).send(err)
		}
	}
}
