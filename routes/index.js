'use strict'

const express = require('express');
const router = express.Router();

const db_connection = require('../database/mysql.js');
db_connection.connect();
/* GET home page. */
router.get('/', function(req, res) {
	db_connection.query('SELECT * FROM team_member', function(query_err, query_res, query_fields){
		if(query_err){
			res.send(query_err);
		}
		res.render('index', { title: 'Express', member:query_res });
	});
});

module.exports = router;
