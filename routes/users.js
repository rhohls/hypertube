var express = require('express');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('users', { info: 'None' });
});

router.get('/create', function(req, res, next) {
  // res.send('respond with a resource');
  con.query("CREATE DATABASE IF NOT EXISTS `matcha`");
  con.query("use `matcha`");
  con.query("CREATE TABLE IF NOT EXISTS `users` (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT);", function (err, result, fields) {
    if (err){
      console.error('error connecting: ' + err.stack);
    }
    console.log(result);
  });
  res.render('users', { info: 'created the db' });
});

module.exports = router;
