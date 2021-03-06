var express = require('express');
var router = express.Router();
var path = require('path');
var imdb = require('imdb-node-api');

var TorrentSearchApi = require('torrent-search-api');


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

		imdb.searchMovies(torrent_file['title'], async function (movies) {

			movie = movies[0];

			// add first movie -- console warnings
			if (count == 1){
				movie_list[movie['id']] = ({
					video : movie ,
					torrent : torrent_file
				});
			}
			
			// if movie in list, check which is bigger seeds
			else if (! (movie['id'] in movie_list) ||
				((movie['id'] in movie_list) && torrent_file['seeds'] > 
												movie_list[movie['id']]['torrent']['seeds'])
			){
				movie_list[movie['id']] = ({
					video : movie ,
					torrent : torrent_file
				});
			}

			// when done making list: log list
			if (++count == torrents.length){
				console.log("finaly here -------", movie_list);
			}

		}, function(error) { 
			console.error(error);
		});
	});
};


router.get('/', 

	async function(req, res, next) {
	
	console.log('start');

	let search_phrase = '2019'
	
	// torrent fetch
	TorrentSearchApi.enableProvider('1337x');
	const torrents = await TorrentSearchApi.search(search_phrase, 'Movies', 10);

	// scraping tittles
	torrents.forEach(async function(torrent_file){
		// console.log( torrent_file['title']);
		let new_title = (titleExtract(torrent_file['title']));
		torrent_file['title'] = new_title;
		const magnet = await TorrentSearchApi.getMagnet(torrent_file);
		// console.log('magnet: ', torrent_file['title'], ' link: ', magnet);
		torrent_file['magnet'] = magnet;
	});
	// console.log("torrntes", torrents);




	var list = await (makeMovieList(torrents,res));
	// await Promise.all(list).then(console.log("my lis : ", list));	
	console.log("---- final movie list: ", list);


	res.sendFile(path.join(__dirname + '/index2.html'));
	// res.render('index', { title: 'Best website' });	
});




module.exports = router;