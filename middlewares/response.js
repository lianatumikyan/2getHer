const httpStatusCodes = require('../constants/httpStatusCodes');

const response = async (ctx, next) => {
    await next();
    const body = ctx.body || {};
    ctx.body = {...httpStatusCodes[ctx.status], ...body};
};

module.exports = response;
