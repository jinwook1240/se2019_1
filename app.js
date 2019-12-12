'use strict';
const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const init = require('./routes/init');

const Bus = require('./routes/Bus');
const BusList = require('./routes/BusList');
const Seat = require('./routes/Seat');

const Member = require('./routes/Member');
const MemberList = require('./routes/MemberList');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const Reservation = require('./routes/Reservation');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({  // 2
    secret: 'keyboard cat',  // 암호화
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.use('/', init);
app.use('/bus', Bus);
app.use('/buslist', BusList);
app.use('/member', Member);
app.use('/memberlist', MemberList);
app.use('/reservation', Reservation);
app.use('/seat', Seat);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
