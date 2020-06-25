const {lowerCase, pick, get, has, isNumber} = require('lodash');

const requestParser = async (ctx, next) => {
    if(lowerCase(ctx.method) === 'get') {
        let {limit = 10, offset = 0} = pick(get(ctx, 'query'), ['offset', 'limit']);
        if (has(ctx.query, 'page')){
            const page = ctx.query.page;
            offset =(( page >= 1 ? page : 1) -1) * limit;
        }

        ctx.query = {...ctx.query, limit: parseInt(limit), offset: parseInt(offset)};
    }
    return next();
};

module.exports = requestParser;
