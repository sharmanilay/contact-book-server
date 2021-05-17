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

// allow cors as client and server have different origins
let corsOptions = {
	origin: process.env.LEVERAGE_CLIENT_HOME_PAGE_URL
}
app.use(cors(corsOptions))

// Using passport js for authentication using JWT strategy
auth(passport)
app.use(passport.initialize())
app.use(passport.session())

// morgan automatically logs out incoming requtes into a log
app.use(morgan('dev'))

// setting the setup to the db using sequelize orm
db.sequelize.sync({}).then(() => {
	console.log('synced with database')
})

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', commentsRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
