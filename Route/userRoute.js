const express = require('express');
var app = express();
const auth = require('../Middleware/auth.js');
const multer = require('multer');

const adminController = require('../Controller/userController');

const storage = multer.diskStorage({
	destination: function (req, file, cd) {
		cd(null, './uploads/');
	},
	filename: function (req, file, cd) {
		cd(null, new Date().toISOString() + file.originalname);
	},
});

// const fileFilter = (req, file, cd) => {
// 	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
// 		cd(null, true);
// 	} else {
// 		cd(null, false);
// 	}
// };

const upload = multer({
	storage: storage,
	limits: {
		fieldSize: 1024 * 1024 * 5,
	},
	//fileFilter: fileFilter,
});

app.post('/login', adminController.logIn);

app.post('/logout', adminController.logout);

app.post(
	'/',
	upload.single('profile'),

	adminController.create
);
app.get('/', auth.authenticate, adminController.findAll);
app.get('/:id', auth.authenticate, adminController.findOne);
app.put('/:id', auth.authenticate, adminController.update);
app.delete('/:id', auth.authenticate, adminController.delete);

module.exports = app;
