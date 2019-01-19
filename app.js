var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');
var favicon = require('serve-favicon');
var session = require('express-session');
var fs = require('fs');

var app = express();


// view engine setup
// app.set('view options',{defaultLayout: 'layout',
// 						layoutsDir: __dirname + '/views',
// 						partialsDir: __dirname + '/views/partials/'});
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// hbs.registerPartial(__dirname + '/views/partials/search_res_part', "search_res_part");




app.engine('hbs', hbs({
    extname: 'hbs', 
    defaultLayout: 'layout', 
    layoutsDir: __dirname + '/views',
    partialsDir  :  __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');

// var partialsDir = __dirname + '/views/partials';

// var filenames = fs.readdirSync(partialsDir);

// filenames.forEach(function (filename) {
// 	var matches = /^([^.]+).hbs$/.exec(filename);
// 	if (!matches) {
// 	  return;
// 	}
// 	var name = matches[1];
// 	var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
// 	hbs.registerPartial(name, template);
// 	// console.log( "registering: " + name + " <-as with info: " + template);
//   });



// app.use(favicon('public/favicon.ico'));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

app.use(logger('dev')); //console log errors
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'omgmatchaiscool',  resave: true,  saveUninitialized: false}));

// // Messages middleware
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
//   res.locals.messages = require('express-messages')(req, res);
//   next();
// });

// Routing
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var searchRouter = require('./routes/search');
var profileRouter = require('./routes/profile');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/search', searchRouter);
app.use('/profile', profileRouter);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});



module.exports = app;












// app.use(session({
//   secret: 'work hard',
//   resave: true,
//   saveUninitialized: false
// }));


// //authenticate input against database
// UserSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email })
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }

