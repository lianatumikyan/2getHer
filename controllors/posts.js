'use strict';

const {posts: database} = require('../data/db');

const list = (ctx) => {
    const {limit = 10, offset = 0} = ctx.query;
    const parsedOffset = parseInt(offset);
    const parsedLimit = parseInt(limit);
    const {length: total} = database;

    return ctx.ok({
        statusCode: 200,
        statusName: 'ok',
        data: database.slice(parsedOffset, parsedOffset + parsedLimit),
        meta: {
            total,
            pageCount: Math.ceil(total / parsedLimit),
            currentPage: Math.ceil(parsedOffset / parsedLimit) + 1,
        }
    })
};

const create = (ctx) => {
    const {request: {body: {title, description}}} = ctx;

    const {id} = !!database.length ? database[database.length - 1] : {id: 0};
    const data = {id: parseInt(id) + 1, title, description};

    database.push(data);

    return ctx.created({
        statusName: 'created',
        statusCode: 201,
        data
    })
};

const update = (ctx) => {
    const {id: passedId} = ctx.params;
    const userIndex = database.findIndex(item => item.id === parseInt(passedId));

    if (userIndex < 0) {
        return ctx.notFound({
            statusCode: 404,
            statusName: 'notFound',
            message: 'error_user_not_found'
        })
    }

    const {request: {body: {title, description}}} = ctx;
    const data = {...database[userIndex], title, description};
    database[userIndex] = data;

    return ctx.ok({
        statusName: 'ok',
        statusCode: 200,
        data
    })
};

const remove = (ctx) => {
    const {id: passedId} = ctx.params;
    const userIndex = database.findIndex(item => item.id === parseInt(passedId));

    if (userIndex < 0) {
        return ctx.notFound({
            statusCode: 404,
            statusName: 'notFound',
            message: 'error_user_not_found'
        })
    }

    database.splice(userIndex, 1);

    return ctx.noContent()
};

const view = (ctx) => {
    const {id: passedId} = ctx.params;
    const userIndex = database.findIndex(item => item.id === parseInt(passedId));

    if (userIndex < 0) {
        return ctx.notFound({
            statusCode: 404,
            statusName: 'notFound',
            message: 'error_user_not_found'
        })
    }

    return ctx.ok({
        statusName: 'ok',
        statusCode: 200,
        data: database[userIndex]
    })
};

module.exports = {list, view, create, update, remove};
