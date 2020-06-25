const koaJwt = require('koa-jwt');
const config = require('config');

module.exports = koaJwt({
    secret: config.get('settings.jwt_secret')
}).unless({ path: config.get('settings.public_routes')});
