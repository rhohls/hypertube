function download(){

	console.log("runnnig");

	var file = 'http://www.legittorrents.info/download.php?id=1374312275fa35813465a1fff36cb1178710d029&f=Sophia%203.0%20Fractal%20Zoom%20Video%20(high%20res).mp4.torrent'
	var Client = require('node-torrent');
	var client = new Client({logLevel: 'DEBUG'});
	var torrent = client.addTorrent(file);
	
	// when the torrent completes, move it's files to another area
	torrent.on('complete', function() {
		console.log('complete!');
		torrent.files.forEach(function(file) {
			var newPath = '/new/path/' + file.path;
			fs.rename(file.path, newPath);
			// while still seeding need to make sure file.path points to the right place
			file.path = newPath;
		});
	});
};

