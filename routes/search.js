var express = require('express');
var router = express.Router();
var con = require('../functions/db_conn.js');
var path = require('path');
var imdb = require('imdb-node-api');



function titleExtract(title){
	let bracket_match = title.match(/(.*?)[^(](\d\d\d\d)[^p]/);
	if (bracket_match){
		let name = bracket_match[1].replace(/\./g, " ");
		title = name + " (" + bracket_match[2] + ")";
	}
	var new_title = (title.match(/[^[)]*/))[0] + ")";

	return (new_title);
}


async function makeMovieList(torrents){
	var movie_list = {};
	var count = 1;

	torrents.forEach(function(torrent_file){

		imdb.searchMovies(torrent_file['title'],
			function (movies) {

			movie = movies[0];

			// if movie in list check which is bigger seeds
			if (! (movie['id'] in movie_list) ||
				((movie['id'] in movie_list) && torrent_file['seeds'] > 
												movie_list[movie['id']]['torrent']['seeds'])
			){
				movie_list[movie['id']] = ({
					video : movie ,
					torrent : torrent_file
				});
			}

			// when done log list
			if (++count == torrents.length){
				console.log("finaly here -------", movie_list);
			}

		}, function(error) { 
			console.error(error);
		});

	});

	//return (movie_list);
};




function getMovieInfo(movie_id, res){
	imdb.getMovie(movie_id, function (movie) {
		console.log("test movie");

		// res.send(movie);
		// res.json(movie);
		// return (movie);

		console.log(movie);
	}, function(error) { 
		console.error(error);
	});
}


/* GET home page. */
router.get('/', 

	async function(req, res, next) {
	
	console.log('start');

	let search_phrase = '2018'
	
	// torrent fetch
	const TorrentSearchApi = require('torrent-search-api');
	TorrentSearchApi.enableProvider('1337x');
	const torrents = await TorrentSearchApi.search(search_phrase, 'Movies', 5);

	// scraping tittles
	torrents.forEach(function(torrent_file){
		// console.log( torrent_file['title']);
		let new_title = (titleExtract(torrent_file['title']));
		torrent_file['title'] = new_title;
	});
	// console.log("torrntes", torrents);




	var list = await (makeMovieList(torrents,res));
	// await Promise.all(list).then(console.log("my lis : ", list));	
	console.log("---- final movie list: ", list);


	res.sendFile(path.join(__dirname + '/index2.html'));
	// res.render('index', { title: 'Best website' });	
});





module.exports = router;