'use strict';

/*
|--------------------------------------------------------------------------
| Module dependencies.
|--------------------------------------------------------------------------
|
*/
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const express = require('express');
const session = require('express-session');
const robots = require('express-robots');
// const flash = require('flash');
const helmet = require('helmet');
const createError  = require('http-errors');
// const i18n = require('i18n');
const methodOverride = require('method-override');
const logger = require('morgan');
// const passport = require('passport');
/*
|--------------------------------------------------------------------------
| Load configuration and routes.
|--------------------------------------------------------------------------
|
*/
const CONFIG = require('./config/config.json');
const routes = require('./config/routes')();

/*
|--------------------------------------------------------------------------
| Statement creates a new express application for you.
|--------------------------------------------------------------------------
|
*/
const app = express();

/*
|--------------------------------------------------------------------------
| view engine setup.
|--------------------------------------------------------------------------
|
*/
// app.engine('html', require('ejs').renderFile);
// app.set('views', path.join(__dirname, 'app/views'));
// app.set('view engine', 'ejs');

/*
|--------------------------------------------------------------------------
| Express engine setup.
|--------------------------------------------------------------------------
|
*/
// app.locals.AUTH_CONFIG = CONFIG.AUTH;

app.use(helmet());
app.use(logger(CONFIG.HTTP_LOG_CONFIG));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));
// app.use(flash());
app.use(methodOverride('_method'));
// app.use(passport.initialize());
// app.use(passport.session());

/*
|--------------------------------------------------------------------------
| view engine setup.
|--------------------------------------------------------------------------
|
*/
// app.use(favicon(path.join(__dirname, 'favicon.ico')));
// app.use('/static', express.static(path.join(__dirname, 'app/public')));
app.use(express.static(path.join(__dirname, 'app/public')));

/*
|--------------------------------------------------------------------------
| Robots config: https://www.npmjs.com/package/express-robots
|--------------------------------------------------------------------------
|
*/
app.use(robots({UserAgent: '*', Disallow: ''}));

/*
|--------------------------------------------------------------------------
| Compression config: https://www.npmjs.com/package/compression
|--------------------------------------------------------------------------
|
*/
app.use(compression());

/*
|--------------------------------------------------------------------------
| Config.
|--------------------------------------------------------------------------
|
*/
app.use(routes);

module.exports = app;