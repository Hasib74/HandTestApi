const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decode = jwt.verify(token, 'SECRET');

		req.user = decode;

		next();
	} catch (error) {
		res.status(401).json({
			message: 'unauthorized',
		});
	}
};

const superAdminPermission = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decode = jwt.verify(token, 'SECRET');

		if (decode.type === 'super admin') {
			return next();
		}
		return res.status(422).json({ message: 'You  have no permision' });
	} catch (error) {
		res.status(401).json({
			message: 'unauthorized',
		});
	}
};

const adminPermisson = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decode = jwt.verify(token, 'SECRET');

		if (decode.type === 'admin') {
			return next();
		}
		return res.status(422).json({ message: 'You  have no permision' });
	} catch (error) {
		res.status(401).json({
			message: 'unauthorized',
		});
	}
};

module.exports = {
	authenticate,
	superAdminPermission,
	adminPermisson,
};
