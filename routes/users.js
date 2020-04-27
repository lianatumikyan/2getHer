const Router = require('koa-router');
const router = new Router({ prefix: '/users' });

const {list, create, update, remove, view} = require('../controllors/users');

router
    .get('/', list)
    .get('/:id', view)
    .post('/', create)
    .put('/:id', update)
    .del('/:id',remove);

module.exports = router;
