
require('dotenv').config();
const config = require('config');

module.exports = {
    [config.get('settings.env')]: config.get('db')
};
