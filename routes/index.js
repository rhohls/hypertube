// require('../functions/genericfunctions');
// var db = require('../functions/create_db');
var express = require('express');
var router = express.Router();
var fs = require('fs'),
	http = require('http'),
	url = require('url'),
	path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

	// const TorrentSearchApi = require('torrent-search-api');
 
	// TorrentSearchApi.enableProvider('Torrent9');
	
	// // Search '1080' in 'Movies' category and limit to 20 results
	// const torrents = await TorrentSearchApi.search('nine nine', 'series', 20);

	// console.log("torrents:", torrents)


	res.sendFile(path.join(__dirname + '/index.html'));
	// res.render('index', { title: 'Best website', login: req.session.login, image: "images/blank_profile_picture.png" });
});

router.get('/video', function(req, res, next) {


	const path = 'wtc.mp4';
	const stat = fs.statSync(path);
	const fileSize = stat.size;
	const range = req.headers.range;
	console.log("filesize:", fileSize);
	console.log(stat);
	console.log(range);
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-");
		const start = parseInt(parts[0], 10);
		const end = parts[1] ?	parseInt(parts[1], 10) : fileSize-1;
		const chunksize = (end-start)+1;
		const file = fs.createReadStream(path, {start, end});
		const head = {
		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': chunksize,
		'Content-Type': 'video/mp4',
		};
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
		'Content-Length': fileSize,
		'Content-Type': 'video/mp4',
		};
		res.writeHead(200, head);
		fs.createReadStream(path).pipe(res);
	}
	
});








router.get('/torrent', function(req, res, next) {


	var torrentStream = require('torrent-stream');
 
	var engine = torrentStream('magnet:http://www.legittorrents.info/download.php?id=1374312275fa35813465a1fff36cb1178710d029&f=Sophia%203.0%20Fractal%20Zoom%20Video%20(high%20res).mp4.torrent');
	
	engine.on('ready', function() {
		engine.files.forEach(function(file) {
			console.log('filename:', file.name);
			var stream = file.createReadStream();
			// stream is readable stream to containing the file content
			console.log(file);
		});
	});


	res.sendFile(path.join(__dirname + '/index2.html'));

});





// logout
router.get('/logout', function(req, res, next) {
	if (req.session) {
		// delete session object
		req.session.destroy(function(err) {
			if(err) {
				return next(err); //????????
			} else {
				return res.redirect('/');
			}
		});
	}
});
router.get('/createdb', function(req, res, next) {
	db.create_db();
	// res.redirect('/');
	res.send("success");
});


module.exports = router;
