const express = require("express");
const router = express.Router();
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const Comments = require("../models/comment");


function cStream(stream, extension, res) {
    console.log('trying to convert');
	try {
        console.log('streamc');
		const converter = ffmpeg()
		.input(stream)
		.outputOption('-movflags frag_keyframe+empty_moov')
		.outputFormat('mp4')
		.output(res)
		.on('error', (err, stdout, stderr) => {	});
		converter.inputFormat(extension.substr(1))
		.audioCodec('aac')
		.videoCodec('libx264')
		.run();
		res.on('close', () => {
			converter.kill();
		});
	} catch(e) {
		sendError(new Error('Unable to torrent for this video.'), res);
	}
}
function header_res(filePath, res, req) {
    let size = fs.statSync(filePath).size;
    let range = req.headers.range;
    if (range) {
        let parts = range.replace(/bytes=/, '').split('-');
        let start = parseInt(parts[0], 10);
        let end = parts[1] ? parseInt(parts[1], 10) : size - 1;
        let chunksize = (end - start) + 1;
        let file = fs.createReadStream(filePath, { start: start, end: end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        };
        file.on('open', function () {
            res.writeHead(206, head);
        })
    }
}
router.get('/streaming/:id/:ext', (req, res) => {
    if (req.params.id &&  req.params.ext) {
        name = req.params.id;
        ext = req.params.ext;
        function getMovie() {
            let filePath = path.join(__dirname, '../public/videos/'+name+ext);
            if (req.param.ext == '.mp4' || req.param.ext == '.webm') {
                let range = req.headers.range;
                let stream = fs.createReadStream(filePath, { start: start, end: end });
                if (range) {
                    header_res(filePath, res, req);
                    stream.on('open', function () {
                        stream.pipe(res);
                    }).on("error", function(err) {
                        res.end(err);
                    });
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/"+ext
                    })
                    stream.pipe(res);
                }
            } else {
                let stream = fs.createReadStream(filePath);
                cStream(stream, ext, res);
            }
        }
        setTimeout(getMovie, 8000);
    }
});

router.get('/play', (req, res) => {
    res.render('index');
});

router.post('/addComment', (req, res) => {
    let newComment = { movie_id: req.body.movie_id, profile_id: req.body.profile_id, comment: req.body.comment };
    Comments.addComment(newComment, (err, doc) => {
        if (err) {
            res.json({success: false, msg: "Failed to comment"});
        } else {
            res.json({success: true, msg: "Comment updated"});
        }
    });
});

router.get('/findFile/:id/:ext', (req, res) => {
    id = req.params.id;
    ext = req.params.ext;
    if (id && ext) {
        let filePath = path.join(__dirname, '../public/videos/'+id+ext);
        if (fs.existsSync(filePath)) { 
            let size = fs.statSync(filePath).size;
            if (size >= 50000) {
                res.json({success: true, msg: 'File playable', size: size});
            } else {
                res.json({success: true, msg: 'File is still buffering', size: size});
            }
        } else {
            res.json({success: false, msg: 'file not found'});
        }
    } else {
        res.json({success: false, msg: 'format wrong', term: true});
    }
});

router.get('/getComments/:id', (req, res) => {
    if (id = req.params.id) {
        Comments.getComments(id, (err, docs) => {
            if (err) {
                res.json({success: false, msg: "Failed to comment"});
            } else {
                res.json({success: true, msg: "Comment recived", docs});
            }
        });
    } else {
        res.json({success: false, msg: "Failed to get comments"});
    }
});








function download(){
    var engine = torrentStream(url, opt);
    console.log(url);
    engine.on('ready', function() {
        engine.files = engine.files.sort(function (a, b) {
            return b.length - a.length
        })
        let file = (sub != -1 ) ? engine.files[sub] : engine.files[0];
        let videoStream = file.createReadStream();
        if (sub == -1) {
            let filePath = path.join(__dirname, './public/videos/'+name+ext);
            let fileStream = fs.createWriteStream(filePath);
            videoStream.pipe(fileStream);
        } else {
            videoStream.pipe(srt2vtt()).pipe(fs.createWriteStream(path.join(__dirname, './public/videos/'+name+'.vtt')));
        }
    });
}





module.exports = router;