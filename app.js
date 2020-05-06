var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');

var Router = require('./routes/index');

var app = express();

const uri = 'mongodb+srv://ticket-booker:ticketBooker@ticket-information-oo1ok.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connection to database successful'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.enable('strict routing');


app.use('/', Router);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//     next();
// });

module.exports = app;
