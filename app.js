const createError = require('http-errors');
const express = require('express');
const path = require('path');

const commonRouter = require('./routes/common');
const adminRouter = require('./routes/admin');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.enable('strict routing');

app.use('/', commonRouter);
app.use('/admin', adminRouter);

// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//     next(createError(404));
// });

// // error handler
// app.use((err, req, res, next) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//     next();
// });

module.exports = app;
