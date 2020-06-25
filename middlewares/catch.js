const httpStatusCodes = require('../constants/httpStatusCodes');

const middlewareCatch = (ctx, next) => {
    return next().catch((err) => {
        if (httpStatusCodes['401'].statusCode === err.status) {
            return ctx.unauthorized();
        }
        throw err;
    });
};

module.exports = middlewareCatch;
