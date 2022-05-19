'use strict';

/*
|--------------------------------------------------------------------------
| Module dependencies.
|--------------------------------------------------------------------------
|
*/
// const IndexService = require('../services/index');

module.exports = {

    index: (req, res, next) => {
        res.render('index');
    }
};