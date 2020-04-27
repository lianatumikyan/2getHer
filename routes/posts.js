const Router = require('koa-router');
const router = new Router({ prefix: '/posts' });

const {list, create, update, remove, view} = require('../controllors/posts');

router
    .get('/', list)
    .get('/:id', view)
    .post('/', create)
    .put('/:id', update)
    .del('/:id',remove);

module.exports = router;
