'user strict';

const mysql = require('mysql');

con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'HandsTest',
	password: '',
});

con.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');
});

module.exports = con;
