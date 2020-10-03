const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const cors = require('cors');

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const db = require('./index');
db.sequelize.sync();

var userRoute = require('./Route/userRoute');

app.use('/api/user', userRoute);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 400;

	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
	res.send('I am root route');
});

app.listen(port, () => {
	console.log(`Server running on ${port} port`);
});
