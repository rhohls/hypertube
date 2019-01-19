var express = require('express');
var router = express.Router();
var con = require('../functions/db_conn.js');


/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('login', { success: 'none', login: req.session.login });	

});

router.post('/', function(req, res, next) {
	let username = req.body.username,
		password = req.body.passwd;

	if (username != 'lol' && username != ''){
		req.session.login = {loggedin: true, username: username}; 
	}else{
	}
  
  res.redirect('login');
  // res.render('login', { success: 'fail', login: req.session.login });

});



module.exports = router;
