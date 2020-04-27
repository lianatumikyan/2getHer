'use strict';
const combineRouters = require('koa-combine-routers')

const users = require('./users');
const posts = require('./posts');

const router = combineRouters(
    users,
    posts
);

module.exports = router;
