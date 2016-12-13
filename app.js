var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var routes = require('./routes/index');
var users = require('./routes/users');
var u = require('./routes/u');
var rate = require('./routes/rate');
var shop = require('./routes/shop');
var likechef = require('./routes/likechef');
var likeshop = require('./routes/likeshop');
var meannocook = require('./routes/meannocook');
var meannoeat = require('./routes/meannoeat');
var shopcom = require('./routes/shopcom');

var app = express();

app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon-20161202031314447.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/u', u);
app.use('/rate', rate);
app.use('/shop', shop);
app.use('/likechef', likechef);
app.use('/likeshop', likeshop);
app.use('/meannocook', meannocook);
app.use('/meannoeat', meannoeat);
app.use('/shopcom', shopcom);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
