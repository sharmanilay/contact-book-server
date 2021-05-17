const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

// Passport middleware
const passport = require('passport')
const auth = require('./auth')

// importing routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const commentsRoutes = require('./routes/comments')

const app = express()

app.use(cookieParser())

auth(passport)
app.use(passport.initialize())
app.use(passport.session())

// var corsOptions = {
// 	origin: process.env.LEVERAGE_CLIENT_HOME_PAGE_URL
// }
app.use(cors())

app.use(morgan('dev'))

db.sequelize.sync({}).then(() => {
	console.log('synced with database')
})
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.')
// })

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// simple route
// app.get('/', (req, res) => {
// 	res.json({ message: 'Welcome to Pern.' })
// })

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', commentsRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})

/*
const dbConfig = require('../config/db.config.js')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./user.model.js')(sequelize, Sequelize)
db.comment = require('./comment.model.js')(sequelize, Sequelize)

module.exports = db

*/
