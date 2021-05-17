const db = require('../models')

// Create and Save a new Comment
exports.create = async (req, res) => {
	try {
		if (req.user) {
			const { id, comment } = req.body
			const user = req.user
			if (id && comment && user) {
				const createdComment = await db.Comment.create({
					text: comment,
					comment_for_user: id,
					userId: user.id
				})
				res.status(201).send(createdComment)
			} else {
				res.status(500).send({ message: 'Something went wrong...' })
			}
		} else {
			res.status(401).send('Authentication failed, please login to continue')
		}
	} catch (err) {
		if (err.response) {
			res.status(err.response.status).send(err)
		} else {
			res.status(500).send(err)
		}
	}
}

// Retrieve all Comment for given contact of the user
exports.getComments = async (req, res) => {
	try {
		const { comment_for_user } = req.query
		if (req.user.id) {
			const comments = await db.Comment.findAll({
				where: {
					userId: req.user.id,
					comment_for_user
				},
				raw: true
			})
			res.status(200).send(comments)
		} else {
			res.status(401).send('Authorization Failed, please try again')
		}
	} catch (err) {
		if (err.response) {
			res.status(err.response.status).send(err)
		} else {
			res.status(500).send(err)
		}
	}
}

// Delete a Comment with the specified id in the request
exports.delete = async (req, res) => {
	try {
		const { id } = req.body
		const commentId = await db.Comment.destroy({
			where: {
				id
			}
		})
		res.status(200).send({ message: `Comment ${commentId} deleted` })
	} catch (err) {
		if (err.response) {
			res.status(err.response.status).send(err)
		} else {
			res.status(500).send(err)
		}
	}
}
