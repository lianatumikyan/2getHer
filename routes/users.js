const Router = require('koa-router');
const router = new Router({ prefix: '/users' });

const {list, create, update, remove, view, login, me} = require('../controllors/users');

router
    .get('/', list)
    .get('/me', me)
    .get('/:id', view)
    .put('/:id', update)
    .del('/:id',remove)
    .post('/registration',create)
    .post('/login',login);

module.exports = router;
