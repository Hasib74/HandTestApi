const db = require('../index');

const jwt = require('jsonwebtoken');

const Admin = db.admin;

// Create and Save a new Tutorial
exports.create = (req, res) => {
	console.log('file is ' + req.file.path);
	if (req == null) {
		res.send({ message: 'File Requred' });
	}

	// Create a Tutorial
	const data = {
		Name: req.body.Name,
		Email: req.body.Email,
		Phone: req.body.Phone,
		Picture: req.file.path,

		Address: req.body.Address,
		Password: req.body.Password,
	};

	if (req.body.type == 'super admin') {
		Admin.findAll({ where: { type: 'super admin' } }).then((user) => {
			console.log(user);

			if (user[0] != null) {
				res.send({
					status: false,
					message: 'Can not add multiple super user',
				});
			} else {
				console.log(data);

				Admin.create(data).then((user) => {
					res.send({ status: true, data: user });
				});
			}
		});
	} else {
		console.log(req.body.Email);

		Admin.findAll({ where: { Email: req.body.Email } }).then((user) => {
			console.log(user);

			if (user[0] != null) {
				res.status(409).send({
					status: false,
					message: 'Already added',
				});
			} else {
				Admin.create(data).then((user) => {
					res.send({ status: true, data: user });
				});
			}
		});
	}
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
	Admin.findAll().then((data) => {
		if (data != null) {
			res.status(200).send({ Data: data });
		} else {
			res.status(404).send({
				message: 'Data not found',
			});
		}
	});
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
	Admin.findByPk(req.params.id).then((data) => {
		if (data != null) {
			res.send(data);
		} else {
			res.status(404).send({
				message: 'Data not found',
			});
		}
	});
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
	Admin.update(req.body, { where: { id: req.params.id } }).then((data) => {
		console.log(data);

		if (data == 1) {
			res.json(200, {
				message: 'Update successfully',
				data: req.body,
			});
		} else {
			res.status(404).send({
				message: 'Failed to update',
			});
		}

		//	res.send(data);
	});
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
	Admin.destroy({ where: { id: req.params.id } }).then((data) => {
		console.log(data);

		if (data == 1) {
			res.json(
				res.json({
					message: 'Deleted Successfully',
				})
			);
		} else {
			res.json(
				res.status(404).json({
					message: 'Failed to delete',
				})
			);
		}
	});
};

exports.logIn = (req, res) => {
	if (req.body.Email == null) {
		res.status(404).send({
			message: 'Email not found.',
		});
	} else if (req.body.Password == null) {
		res.status(404).send({
			message: 'Email not found.',
		});
	}

	Admin.findAll({
		where: { Email: req.body.Email, Password: req.body.Password },
	}).then((data) => {
		console.log(data[0]);

		if (data[0] == null) {
			res.status(404).send({
				status: false,
				message: 'User not found',
			});
		} else {
			var token = jwt.sign(
				{ Email: req.body.Email, type: data[0].type, id: data[0].id },
				'SECRET'
				// {
				// 	expiresIn: '30 min',
				// }
			);

			if (token != null) {
				console.log(token);

				res.status(200).send({
					status: true,

					message: 'Login Success',
					token: token,
					adminType: data[0].type,
				});
			} else {
				res.status(404).send({
					status: false,
					message: 'Failed to login',
				});
			}
		}
	});
};

exports.logout = (req, res) => {
	jwt.si;
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};
