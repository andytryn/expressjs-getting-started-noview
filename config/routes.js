'use strict';

/*
|--------------------------------------------------------------------------
| Module dependencies.
|--------------------------------------------------------------------------
| winston Documentation
| https://expressjs.com/en/resources/middleware/morgan.html
|
*/
// const CONFIG = require('./config.json');
const router = require('express').Router();
const logger = require('winston');
const createError  = require('http-errors');

module.exports = () => {

    router.use((req, res, next) => {
        // Remove express http headers
        res.removeHeader('X-Powered-By');
        res.locals.user = req.user;
        next();
    });

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    */
    // const auth = require('../app/routes/auth');
    // const register = require('../app/routes/register');
    const index = require('../app/routes/index');

    // if (CONFIG.AUTH.ENABLED) {
    //     router.use(auth);
    //     router.use(register);
    // }

    router.use(index);

    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    */
    // const user = require('../app/routes/api/user');

    // router.use('/api/user/', user);

    /*
    |--------------------------------------------------------------------------
    | Error Handler
    |--------------------------------------------------------------------------
    |
    */
    // router.use((req, res, next) => {
    //     let err = new Error('Not Found');
    //     err.statusCode = 404;
    //     next(err);
    // });

    router.use(function(err, req, res, next) {
        next(createError(404));
    });

    router.use((err, req, res, next) => {
        logger.error(err);

        const isApiRequest = req.originalUrl.substring(0, 4) === '/api';

        /*
        | Remove Error's `stack` property. We don't want
        | users to see this at the production env
        */
        if (req.app.get('env') !== 'development') {
            delete err.stack;
        }

        res.status(err.statusCode || 500);

        if (isApiRequest) {
            res.send({error: err});
        } else {
            res.render('error', {error: err});
        }
    });

    return router;
};