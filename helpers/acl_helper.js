const config = require('../configs/config.js');

module.exports = function (req, res, next) {
    if (!req.session || !req.session.username) {
        res.redirect(config[config.env].base_url + 'login');
        return;
    }
    next();
};