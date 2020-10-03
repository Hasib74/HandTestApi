module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		Name: {
			type: Sequelize.STRING,
		},
		Email: {
			type: Sequelize.STRING,
		},
		Phone: {
			type: Sequelize.STRING,
		},

		Picture: {
			type: Sequelize.STRING,
		},

		Address: {
			type: Sequelize.STRING,
		},
		Password: {
			type: Sequelize.STRING,
		},
	});

	return User;
};
