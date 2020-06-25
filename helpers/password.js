const bcrypt = require('bcrypt');
const config = require('config');
const saltRounds = config.get('settings.salt_round');

const hash = plaintextPassword => bcrypt.hashSync(plaintextPassword, saltRounds);
const compare = (plaintextPassword, hash) => bcrypt.compareSync(plaintextPassword, hash);

module.exports = {hash, compare};
