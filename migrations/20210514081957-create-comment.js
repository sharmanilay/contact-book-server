module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			text: {
				allowNull: false,
				type: Sequelize.STRING
			},
			comment_for_user: {
				allowNull: false,
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			userId: {
				type: Sequelize.INTEGER,
				onDelete: 'CASCADE',
				references: {
					model: 'User',
					key: 'id',
					as: 'userId'
				}
			}
		})
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Comments')
	}
}
