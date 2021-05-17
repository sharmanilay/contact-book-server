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
		res.status(500).send(err)
	}
}

// Retrieve all Comment from the database.
exports.getComments = (req, res) => {
	const { comment_for_user } = req.query
	if (req.user.id) {
		db.Comment.findAll({
			where: {
				userId: req.user.id,
				comment_for_user
			},
			raw: true
		}).then((resp) => {
			res.send(resp)
		})
	} else {
		res.status(401).send('Auth Failed')
	}
}

// Find a single Comment with an id
exports.findOne = (req, res) => {
	const { id } = req.query
	db.Comment.findbyPk(id).then((comment) => res.send(comment))
}

// Update a Comment by the id in the request
exports.update = (req, res) => {}

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
	const { id } = req.body
	db.Comment.destroy({
		where: {
			id
		}
	}).then((comment) => {
		res.status(200).send({ message: `Comment ${comment} deleted` })
	})
}

// Delete all Comment from the database.
exports.deleteAll = (req, res) => {}
