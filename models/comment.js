const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Comment extends Model {
		static associate(models) {
			// define association here
			this.belongsTo(models.User, {
				foreignKey: 'userId',
				onDelete: 'CASCADE'
			})
		}
	}
	Comment.init(
		{
			text: { type: DataTypes.STRING },
			comment_for_user: {
				type: DataTypes.STRING
			}
		},
		{
			sequelize,
			modelName: 'Comment'
		}
	)
	return Comment
}
