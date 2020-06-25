
const {forEach, get, snakeCase, includes, lowerCase} = require('lodash');

const errors = async (ctx, next) => {
    try {
        await next();
    }catch (e) {
        if (e.name && includes(lowerCase(e.name), 'sequelize')) {
            const errors = {};

            forEach(get(e, 'errors', []), item => {
                const errorItem = errors[item.path];

                if (errorItem) {
                    return errors[item.path].push(snakeCase(item.message))
                }

                return errors[item.path] = [snakeCase(item.message)];
            });
            ctx.unprocessableEntity({errors})
        }
    }
};

module.exports = errors;
