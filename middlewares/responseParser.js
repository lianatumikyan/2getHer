const {lowerCase, get, has} = require('lodash');

const responseParser = async (ctx, next) => {
    await next();

    if(lowerCase(ctx.method) !== 'get') {
        return;
    }

    const {limit, offset} = ctx.query;

    if (!has(ctx.body, 'meta')) {
        return;
    }

    const total = get(ctx, 'body.meta.total');

    ctx.body.meta = {
        ...ctx.body.meta,
        pageCount: Math.ceil(total / limit),
        currentPage: Math.ceil(offset / limit) + 1,
    }
};

module.exports = responseParser;
