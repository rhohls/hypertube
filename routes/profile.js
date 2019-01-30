var express = require('express');
var router = express.Router();
var fs = require('fs'),
	http = require('http'),
	url = require('url'),
	path = require('path');
/* GET home page. */

var torrentStream = require('torrent-stream');



router.get('/', function(req, res, next) {

	res.sendFile(path.join(__dirname + '/index22.html'));
});



// router.get('/video', function(req, res, next) {

// 	var torrentStream = require('torrent-stream');
// 	var pathing = path.join(__dirname + '/temp');
// 	var options = {path: pathing}
// 	console.log('path: ', pathing);
// 	// var engine = torrentStream('magnet:magnet:?xt=urn:btih:1374312275fa35813465a1fff36cb1178710d029&dn=&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969');
// 	// var engine = torrentStream('magnet:?xt=urn:btih:72c83366e95dd44cc85f26198ecc55f0f4576ad4&dn=&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969');
// 	// var engine = torrentStream('magnet:?xt=urn:btih:8d7210eee5fbae2f35ad84779706d5626d0a34d8&dn=Black.Panther.2018.1080p.BluRay.H264.AAC-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce', options);
// 	var engine = torrentStream('magnet:?xt=urn:btih:C45711FE49E45CF415B248FAC6B06BDEF1A160D1&dn=363088&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80', options);
// 	engine.on('ready', function() {
// 		console.log('ready');
// 		console.log(files);
// 		engine.files.forEach(function(file) {
// 			console.log('filename:', file.name);
			
// 			if (file.name == 'Black.Panther.2018.1080p.BluRay.H264.AAC-RARBG.mp4'){
// 			console.log('filename:', file.name);
// 			// console.log('filepath:', file.path);
// 			console.log('filelength/size:', file.length);

// 			// var keys = Object.keys(file);
// 			// console.log('stuff:', keys);
// 			let filePath = path.join(__dirname, './temp/movie.mp4')	
// 			var stream = file.createReadStream(filePath);
// 			// stream is readable stream to containing the file content
// 			// console.log(file);
// 			// res.writeHead(206);

// 			var total = file.length;

// 			var range = req.headers.range;
// 			var positions = range.replace(/bytes=/, "").split("-");
// 			var start = parseInt(positions[0], 10);
// 			var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
// 			var chunksize = (end - start) + 1;
			
// 			res.writeHead(206, {
// 				"Content-Range": "bytes " + start + "-" + end + "/" + total,
// 					"Accept-Ranges": "bytes",
// 					"Content-Length": chunksize,
// 					"Content-Type": "video/mp4"
// 			});
			
// 			stream.pipe(res);
// 		}
// 		});
// 	});

// });


function download(name, magnet){
	console.log('movie downloading');
	console.log('name given: ', name);

	// var pathing = path.join(__dirname + '/temp');
	// var options = {path: pathing}

	var engine = torrentStream(magnet);
	
	engine.on('ready', function() {
		engine.files = engine.files.sort(function (a, b) {
			return b.length - a.length
		})
		// biggest file is one to dl
		let file = engine.files[0];

		let split = file.name.split('.');
		ext = split[split.length - 1];

		console.log("filename: ", file.name);
		console.log("extention: ", ext);
		
		// let videoStream = file.createReadStream();

		let fileName = name + "." + ext;

		console.log("final filename: ", fileName);
	
		// let filePath = path.join(__dirname, '../public/videos/' + fileName);
		// let fileStream = fs.createWriteStream(filePath);
		// videoStream.pipe(fileStream);
	});
}



function fileExist(name){
	// return (true);
	return (false);
}



router.get('/video', function(req, res, next) {

	// var torrentStream = require('torrent-stream');
	// console.log('path: ', pathing);

	// working// let magnet = 'magnet:?xt=urn:btih:54C736C8A78982842550C554BB2E8A21CBB6A4A2&dn=345887&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80';
	let magnet = 'magnet:?xt=urn:btih:7643D0625DED0A5FC967B37A9D6AF6990236C180&dn=Avengers%3A+Infinity+War+%282018%29+%5BWEBRip%5D+%5B1080p%5D+%5BYTS%5D+%5BYIFY%5D&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.com%3A2710%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce';
	// let magnet = 'magnet:?xt=urn:btih:C45711FE49E45CF415B248FAC6B06BDEF1A160D1&dn=363088&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80';
	// var engine = torrentStream('magnet:?xt=urn:btih:8d7210eee5fbae2f35ad84779706d5626d0a34d8&dn=Black.Panther.2018.1080p.BluRay.H264.AAC-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce', options);
	// var engine = torrentStream('magnet:?xt=urn:btih:C45711FE49E45CF415B248FAC6B06BDEF1A160D1&dn=363088&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80', options);
	let movie_id = 'testfile';

	if (!fileExist(movie_id)){
		download(movie_id, magnet);
	}
	// and then
0
	 
	let fileName = movie_id + ".mp4";

	let filePath = path.join(__dirname, '../public/videos/' + fileName);
	let readStream = fs.createReadStream(filePath);
	


	// This will wait until we know the readable stream is actually valid before piping
	readStream.on('open', function () {
		readStream.pipe(res);
	});
	// readStream.on('error', function(err) {
	// 	res.end(err);
	// });





	// res.sendFile(path.join(__dirname + '/index2.html'));


});






module.exports = router;
