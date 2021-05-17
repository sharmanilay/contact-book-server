const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
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
