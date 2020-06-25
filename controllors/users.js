'use strict';

const {pick, get} = require('lodash');
const httpResponseMessages = require('../constants/httpResponseMessages');

const {generateToken} = require('../helpers/jwt');
const {compare} = require('../helpers/password');
const {User} = require('../models');

const list = async (ctx) => {
    const {limit, offset} = ctx.query;
    const {rows: data, count: total} = await User.findAndCountAll({limit, offset});

    return ctx.ok({ data, meta: {total} })
};

const create = async (ctx) => {
    const info = pick(get(ctx, 'request.body'), ['username', 'password', 'firstName', 'lastName']);

    const data = await User.create(info);

    return ctx.created({data})

};

const update = async (ctx) => {
    const {data: id} = get(ctx, 'state.user');
    const info = pick(get(ctx, 'request.body'), ['firstName', 'lastName']);

    const [result, updated] = await User.update(info, {where: {id}, returning: true});

    return !result ? ctx.notFound(httpResponseMessages.user_not_found) : ctx.ok({data: updated})

};

const remove = async (ctx) => {
    const {data: id} = get(ctx, 'state.user');

    const user = await User.findOne({where: {id}});

    if (!user) {
        return ctx.notFound(httpResponseMessages.user_not_found)
    }

    await User.destroy({where: {id}});
    return ctx.ok()
};

const view = async (ctx) => {
    const {data: id} = get(ctx, 'state.user');
    const data = await User.findByPk(id);

    if (!data) {
        return ctx.notFound(httpResponseMessages.user_not_found)
    }

    return ctx.ok({data})
};

const login = async (ctx) => {
    const {username, password} = pick(get(ctx, 'request.body'), ['username', 'password']);

    const user = await User.findOne({where: {username}, attributes: ['password', 'id']});

    if (!user || !compare(password, user.password)) {
        return ctx.badRequest(httpResponseMessages.invalid_credentials)
    }

    return ctx.ok({access: {token: generateToken(user.id)}});
};

const me = async (ctx) => {
    const {data: id} = get(ctx, 'state.user');
    const user = await User.findByPk(id);

    if (!user) {
        return ctx.notFound(httpResponseMessages.user_not_found);
    }

    return ctx.ok({data: user});
};

module.exports = {list, view, create, update, remove, login, me};
