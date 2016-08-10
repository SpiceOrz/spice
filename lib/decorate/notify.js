var url = require('url');
var notify = require('../connect/notify');

module.exports = function(req, res, next) {
	notify.test(req.url);
	next();
};
