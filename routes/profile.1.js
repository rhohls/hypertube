var express = require('express');
var router = express.Router();
var fs = require('fs'),
	http = require('http'),
	url = require('url'),
	path = require('path');
/* GET home page. */

router.get('/', function(req, res, next) {

	// var torrentStream = require('torrent-stream');

	// var engine = torrentStream('magnet:?xt=urn:btih:8d7210eee5fbae2f35ad84779706d5626d0a34d8&dn=Black.Panther.2018.1080p.BluRay.H264.AAC-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce');
	
	// engine.on('ready', function() {
	// 	engine.files = engine.files.sort(function (a, b) {
	// 		return b.length - a.length
	// 	}).slice(0, 1)
	// 	let file = engine.files[0];
	// 	let videoStream = file.createReadStream();
	// 	let filePath = path.join(__dirname, './temp/movie.mp4')
	// 	console.log(filePath);
	// 	let fileStream = fs.createWriteStream(filePath);
	// 	videoStream.pipe(fileStream);
	// });
	



	res.sendFile(path.join(__dirname + '/index22.html'));
});


// var torrentStream = require('torrent-stream');

// var engine = torrentStream('magnet:?xt=urn:btih:8d7210eee5fbae2f35ad84779706d5626d0a34d8&dn=Black.Panther.2018.1080p.BluRay.H264.AAC-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce');
// engine.on('ready', function() {
// 	engine.files = engine.files.sort(function (a, b) {
// 		return b.length - a.length
// 	}).slice(0, 1)
// 	let file = engine.files[0];
// 	let videoStream = file.createReadStream();
// 	let filePath = path.join(__dirname, './temp/movie.mp4')
// 	let fileStream = fs.createWriteStream(filePath);
// 	videoStream.pipe(fileStream);
// });


// router.get('/video', function(req, res, next) {
	
// 	let filePath = path.join(__dirname, '/temp/movie.mp4');
// 	console.log(filePath);
// 	const stat = fs.statSync(filePath)
// 	const total = stat.size;
// 	console.log(total);
	




// 	// var total = file.length;
	
// 	var range = req.headers.range;
// 	var positions = range.replace(/bytes=/, "").split("-");
// 	var start = parseInt(positions[0], 10);
// 	var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
// 	var chunksize = (end - start) + 1;
	
// 	res.writeHead(206, {
// 		"Content-Range": "bytes " + start + "-" + end + "/" + total,
// 		"Accept-Ranges": "bytes",
// 		"Content-Length": chunksize,
// 		"Content-Type": "video/mp4"
// 	});
	
// 	stream.pipe(res);
// });



// const stat = fs.statSync(path)
  // const fileSize = stat.size

// const range = req.headers.range

// const parts = range.replace(/bytes=/, "").split("-")
// const start = parseInt(parts[0], 10)
// const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1

// const chunksize = (end-start)+1
// const file = fs.createReadStream(path, {start, end})
// const head = {
// 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
// 'Accept-Ranges': 'bytes',
// 'Content-Length': chunksize,
// 'Content-Type': 'video/mp4',
// }

// res.writeHead(206, head)

// engine.on('torrent', function(){
// 	engine.files.forEach(function(file) {
// 		console.log('tor filename:', file.name);
// 		// console.log('filesize:', file.size);

// 		var keys = Object.keys(file);

// 		console.log('tor stuff:', keys);
// 	})		
// });

// module.exports.download_torrent = function(url, movie_id) {
//     var engine = torrentStream(url);
//     engine.on('ready', function() {
//         engine.files = engine.files.sort(function (a, b) {
//             return b.length - a.length
//           }).slice(0, 1)
//         let file = engine.files[0];
//         let videoStream = file.createReadStream();
//         let filePath = path.join(__dirname, './public/videos/'+movie_id+'.mp4')
//         let fileStream = fs.createWriteStream(filePath);
//         videoStream.pipe(fileStream);
//     });
// }

router.get('/video', function(req, res, next) {

	var torrentStream = require('torrent-stream');
	var pathing = path.join(__dirname + '/temp');
	var options = {path: pathing}
	console.log('path: ', pathing);
	// var engine = torrentStream('magnet:magnet:?xt=urn:btih:1374312275fa35813465a1fff36cb1178710d029&dn=&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969');
	// var engine = torrentStream('magnet:?xt=urn:btih:72c83366e95dd44cc85f26198ecc55f0f4576ad4&dn=&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopentor.org%3A2710&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.blackunicorn.xyz%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969');
	// var engine = torrentStream('magnet:?xt=urn:btih:8d7210eee5fbae2f35ad84779706d5626d0a34d8&dn=Black.Panther.2018.1080p.BluRay.H264.AAC-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce', options);
	var engine = torrentStream('magnet:?xt=urn:btih:C45711FE49E45CF415B248FAC6B06BDEF1A160D1&dn=363088&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80', options);
	engine.on('ready', function() {
		console.log('ready');
		console.log(files);
		engine.files.forEach(function(file) {
			console.log('filename:', file.name);
			
			if (file.name == 'Black.Panther.2018.1080p.BluRay.H264.AAC-RARBG.mp4'){
			console.log('filename:', file.name);
			// console.log('filepath:', file.path);
			console.log('filelength/size:', file.length);

			// var keys = Object.keys(file);
			// console.log('stuff:', keys);
			let filePath = path.join(__dirname, './temp/movie.mp4')	
			var stream = file.createReadStream(filePath);
			// stream is readable stream to containing the file content
			// console.log(file);
			// res.writeHead(206);

			var total = file.length;

			var range = req.headers.range;
			var positions = range.replace(/bytes=/, "").split("-");
			var start = parseInt(positions[0], 10);
			var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
			var chunksize = (end - start) + 1;
			
			res.writeHead(206, {
				"Content-Range": "bytes " + start + "-" + end + "/" + total,
					"Accept-Ranges": "bytes",
					"Content-Length": chunksize,
					"Content-Type": "video/mp4"
			});
			
			stream.pipe(res);
		}
		});
	});

});





function download(name, magnet){

	var pathing = path.join(__dirname + '/temp');
	var options = {path: pathing}

	var engine = torrentStream( magnet , options);
	let name = 'testfile';
	let ext = '.mp4';
	let sub = -1;
	engine.on('ready', function() {
		engine.files = engine.files.sort(function (a, b) {
			return b.length - a.length
		})
		let file = (sub != -1 ) ? engine.files[sub] : engine.files[0];
		// let file = engine.files[0];
		console.log(file.name);
		let videoStream = file.createReadStream();
		if (sub == -1) {
			let filePath = path.join(__dirname, '../public/videos/'+name+ext);
			let fileStream = fs.createWriteStream(filePath);
			videoStream.pipe(fileStream);
		} else {
			videoStream.pipe(srt2vtt()).pipe(fs.createWriteStream(path.join(__dirname, '../public/videos/'+name+'.vtt')));
		}
	});

}






router.get('/download', function(req, res, next) {

	var torrentStream = require('torrent-stream');
	var pathing = path.join(__dirname + '/temp');
	var options = {path: pathing}
	console.log('path: ', pathing);

	// let magnet = 'magnet:?xt=urn:btih:54C736C8A78982842550C554BB2E8A21CBB6A4A2&dn=345887&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80';
	let magnet = 'http://www.1337x.to/torrent/2966788/Black-Panther-2018-BluRay-1080p-YTS-YIFY/';
	// var engine = torrentStream('magnet:?xt=urn:btih:8d7210eee5fbae2f35ad84779706d5626d0a34d8&dn=Black.Panther.2018.1080p.BluRay.H264.AAC-RARBG&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710&tr=udp%3A%2F%2Fopen.demonii.com%3A1337%2Fannounce', options);
	// var engine = torrentStream('magnet:?xt=urn:btih:C45711FE49E45CF415B248FAC6B06BDEF1A160D1&dn=363088&tr=udp://open.demonii.com:1337/announce&tr=udp://tracker.openbittorrent.com:80', options);
	var engine = torrentStream( magnet , options);
	let name = 'testfile';
	let ext = '.mp4';
	let sub = -1;
	engine.on('ready', function() {
        engine.files = engine.files.sort(function (a, b) {
            return b.length - a.length
		})
        let file = (sub != -1 ) ? engine.files[sub] : engine.files[0];
		// let file = engine.files[0];
		console.log(file.name);
        let videoStream = file.createReadStream();
        if (sub == -1) {
            let filePath = path.join(__dirname, '../public/videos/'+name+ext);
            let fileStream = fs.createWriteStream(filePath);
            videoStream.pipe(fileStream);
        } else {
            videoStream.pipe(srt2vtt()).pipe(fs.createWriteStream(path.join(__dirname, '../public/videos/'+name+'.vtt')));
        }
    });
	res.sendFile(path.join(__dirname + '/index2.html'));

});





module.exports = router;
