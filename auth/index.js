const db = require('../models')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passportJwt = require('passport-jwt')
const { Strategy: JwtStrategy, ExtractJwt } = passportJwt

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user)
	})
	passport.deserializeUser((user, done) => {
		done(null, user)
	})

	// create jwt to authenticate user request.
	passport.jwtSecret = process.env.LEVERAGE_JWT_SECRET
	passport.use(
		new JwtStrategy(
			{
				secretOrKey: passport.jwtSecret,
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
			},
			async (token, done) => {
				try {
					const user = await db.User.findOne({
						where: { id: token.data[0].id }
					})
					if (user) {
						return done(null, token.data[0])
					} else {
						throw new Error('User not found')
					}
				} catch (err) {
					return done(null, err)
				}
			}
		)
	)
}
