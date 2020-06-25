'use strict';

const combineRouters = require('koa-combine-routers');

const users = require('./users');

const router = combineRouters(
    users
);

module.exports = router;
