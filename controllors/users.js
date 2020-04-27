'use strict';

const {User} = require('../models');
const {users: database} = require('../data/db');

const list = async (ctx) => {
    const {limit = 10, offset = 0} = ctx.query;
    const parsedOffset = parseInt(offset);
    const parsedLimit = parseInt(limit);

    const {rows: users, count: total} = await User.findAndCountAll({limit: parsedLimit, offset: parsedOffset});

    return ctx.ok({
        statusCode: 200,
        statusName: 'ok',
        users,
        meta: {
            total,
            pageCount: Math.ceil(total / parsedLimit),
            currentPage: Math.ceil(parsedOffset / parsedLimit) + 1,
        }
    })
};

const create = async (ctx) => {
    const {request: {body: {firstName, lastName}}} = ctx;
    const data = {firstName, lastName};
    try {
        const user = await User.create(data);
        return ctx.created({
            statusName: 'created',
            statusCode: 201,
            user
        })
    } catch (e) {
        return ctx.ok({
            statusName: 'created',
            statusCode: 422,
            e
        })
    }
};

const update = (ctx) => {
    // const {id: passedId} = ctx.params;
    // const userIndex = database.findIndex(item => item.id === parseInt(passedId));
    //
    // if (userIndex < 0) {
    //     return ctx.notFound({
    //         statusCode: 404,
    //         statusName: 'notFound',
    //         message: 'error_user_not_found'
    //     })
    //
    //
    // const {request: {body: {firstName, lastName}}} = ctx;
    // const data = {...database[userIndex], firstName, lastName};
    // database[userIndex] = data;

    return ctx.ok({
        statusName: 'ok',
        statusCode: 200
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

const view = async (ctx) => {
    const {id} = ctx.params;
    const user = await User.findOne({ where: {id} });

    if (!user) {
        return ctx.notFound({
            statusCode: 404,
            statusName: 'notFound',
            message: 'error_user_not_found'
        })
    }

    return ctx.ok({
        statusName: 'ok',
        statusCode: 200,
        user
    })
};

module.exports = {list, view, create, update, remove};
