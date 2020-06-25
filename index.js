'use strict';

require('dotenv').config();
const Koa = require('koa');
const config = require('config');

const port = config.get('settings.port');
const app = new Koa();

app.use(require('koa-body')());
app.use(require('koa-respond')(require('./constants/respond')));

app.use(require('./middlewares/response'));
app.use(require('./middlewares/responseParser'));
app.use(require('./middlewares/errors'));
app.use(require('./middlewares/requestParser'));
app.use(require('./middlewares/catch'));
app.use(require('./middlewares/jwt'));

app.use(require('@koa/cors')());
app.use(require('./routes')());

app.listen(port, () => {
    console.info('Server is running on port %s', port)
});
