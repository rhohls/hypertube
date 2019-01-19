var express = require('express');
var router = express.Router();
var con = require('../functions/db_conn.js');
var path = require('path');
var imdb = require('imdb-node-api');


async function getResults(){

	const TorrentSearchApi = require('torrent-search-api');
	
	TorrentSearchApi.enableProvider('1337x');

	var res = await TorrentSearchApi.search('brooklyn', 'Movies', 20);

	
	res.forEach(function(torrent){
		torrent['title'] = torrent['title'].match(/[^([]*/);		
	});

	console.log("tor:", res);
	
	return (res);

}






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

	torrents.forEach(function(torrent_file){
		movie_list.test = 1;

		imdb.searchMovies(torrent_file['title'],
		async function (movies) {

			movie = movies[0];
			console.log(movie);
			console.log("------")
			console.log("")

			// if movie in list check which is bigger seeds
			if (! (movie['id'] in movie_list) ||
				((movie['id'] in movie_list) && torrent_file['seeds'] > 
												movie_list[movie['id']]['torrent']['seeds'])
			){
				console.log('     -   adding       -')
				movie_list[movie['id']] = ({
				// movie_list[movie['id']] = new Promise({
					video : movie ,
					torrent : torrent_file
				});
			}

			console.log("movie list: ", movie_list);
			console.log("~~~~")
			console.log("")

		}, function(error) { 
			console.error(error);
		});
	});

	return (movie_list);
};





// function makeMovieList(torrents){
// 	var movie_list = {};

// 	torrents.forEach(function(torrent_file){
// 		imdb.searchMovies(torrent_file['title'], logMovie(movie), logError(err))
// 	});

// 	return (movie_list);
// }

// function logMovie(movie){
// 	console.log(movie);
// }

// function logError(err){
// 	console.log(err);
// }

function getMovieInfo(movie_id){
	imdb.getMovie('tt4908174', function (movie) {
		console.log("test moie");
		console.log(movie);
	}, function(error) { 
		console.error(error);
	});
}


/* GET home page. */
router.get('/', 

	async function(req, res, next) {
	
	console.log('start');
	// torrent fetch
	const TorrentSearchApi = require('torrent-search-api');
	TorrentSearchApi.enableProvider('1337x');
	const torrents = await TorrentSearchApi.search('brooklyn', 'Movies', 5);

	// scraping tittles
	torrents.forEach(function(torrent_file){
		// console.log( torrent_file['title']);
		let new_title = (titleExtract(torrent_file['title']));
		torrent_file['title'] = new_title;
	});
	console.log("torrntes", torrents);




	var list = (makeMovieList(torrents,res));
	// await Promise.all(list).then(console.log("my lis : ", list));	
	console.log("---- final movie list: ", list);




	let test_id = 'tt4908174'

	var movie_info = getMovieInfo(test_id);
	console.log(movie_info);



	//res.send(JSON.stringify({}));



	res.sendFile(path.join(__dirname + '/index2.html'));
	// res.render('index', { title: 'Best website' });	
});





module.exports = router;