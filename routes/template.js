var express = require('express');
var router = express.Router();
var con = require('../functions/db_conn.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Best website' });
});

module.exports = router;
