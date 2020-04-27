'use strict';

require('pg');
const Koa = require('koa');
const koaBody = require('koa-body');
const respond = require('koa-respond');

const routes = require('./routes');

const port = 8888;
const app = new Koa();

app.use(koaBody());
app.use(respond());
app.use(routes());

app.listen(port, () => {
    console.info('Server is running on port %s', port)
});
