const config = require('config');
const {split, last} = require('lodash');
const jsonwebtoken = require('jsonwebtoken');


const generateToken = userIdentifier =>  jsonwebtoken.sign({
    data: userIdentifier,
    exp: Math.floor(Date.now() / 1000) + config.get('settings.jwt_exp')
}, config.get('settings.jwt_secret'));

module.exports = {generateToken};
