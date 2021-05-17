const User = require('../models/user')
const passport = require('passport')
const axios = require('axios')

module.exports.getUserContacts = async (req, res) => {
	try {
		const googleContacts = await axios.get(
			`https://people.googleapis.com/v1/people/me/connections?personFields=names,photos,emailAddresses,phoneNumbers,organizations&key=${encodeURIComponent(
				process.env.LEVERAGE_GOOGLE_API_KEY
			)}&pageSize=1000&sortOrder=FIRST_NAME_ASCENDING`,
			{
				headers: {
					Authorization: `Bearer ${passport.googleaccessToken}`,
					'Content-Type': 'application/json'
				}
			}
		)
		const filteredData = googleContacts.data.connections.map((item) => {
			let obj = {
				resourceName: item.resourceName
			}
			if (item.emailAddresses) {
				obj.email = item.emailAddresses[0].value
			}
			if (item.names) {
				obj.name = item.names[0].displayName
			}
			if (item.photos) {
				obj.picture = item.photos[0].url
			}
			if (item.phoneNumbers) {
				obj.phone = item.phoneNumbers[0].value
			}
			if (item.organizations) {
				obj.organization = item.organizations[0].name
			}
			return obj
		})
		res.status(200).send({ connections: filteredData })
	} catch (err) {
		if (err.response) {
			res.status(err.response.status).send(err)
		} else {
			res.status(500).send(err)
		}
	}
}

module.exports.getContactDetails = async (req, res) => {
	try {
		const { refName } = req.query
		const contactDetails = await axios.get(
			`https://people.googleapis.com/v1/people/${refName}?personFields=names,photos,emailAddresses,phoneNumbers,organizations,addresses&key=${encodeURIComponent(
				process.env.LEVERAGE_GOOGLE_API_KEY
			)}`,
			{
				headers: {
					Authorization: `Bearer ${passport.googleaccessToken}`,
					'Content-Type': 'application/json'
				}
			}
		)

		res.status(200).send(contactDetails.data)
	} catch (err) {
		if (err.response) {
			res.status(err.response.status).send(err)
		} else {
			res.status(500).send(err)
		}
	}
}
