var express = require('express');
var router = express.Router();
var func = require('../functions/genericfunctions');

/* GET home page. */

router.get('/', function(req, res, next) {


	
	res.render('register', {test : "nothing sent"});
});

router.post('/submit', function(req, res, next) {
	let username = req.body.username,
		password = req.body.password,
		checkpassword = req.body.checkpassword,
		email = req.body.email,
		first_name = req.body.first_name,
		last_name = req.body.last_name;

	console.log("post name" + username);
	let str;
	// if (resgister.validateUserName(username))
	if (func.usernameTaken (username))
		str = "correct";
	else	
		str = "bad name";
	res.redirect('/register/' + str);
});

module.exports = router;

router.post('/sdfasdf', function(req, res, next) {
	let regInfo = {username: req.body.username,
		password: req.body.password,
		checkpassword: req.body.checkpassword,
		email: req.body.email,
		first_name: req.body.first_name,
		last_name: req.body.last_name};
	
	verifyPassword(password, checkpassword);
	hashpw = hashPW(password);
	usernameTaken(username);

	if (error){

	}else{
		registerUser()
	}
	});
function validateUserName (name){ 
	console.log("func name" + name);
	if (name == "lol")
		return true;
	else
		return false;
}

