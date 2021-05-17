const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			//  Each user can have many comments for different contacts
			this.hasMany(models.Comment, {
				foreignKey: 'userId',
				as: 'comments'
			})
		}
	}
	User.init(
		{
			email: { type: DataTypes.STRING, allowNull: false, unique: true },
			name: { type: DataTypes.STRING, allowNull: false, unique: false },
			picture: { type: DataTypes.STRING, allowNull: false, unique: false }
		},
		{
			sequelize,
			modelName: 'User'
		}
	)
	return User
}
