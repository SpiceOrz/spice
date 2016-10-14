'use strict';

const url = require('url');

module.exports = function*(next) {
	// 判断
	let reqUrl = url.parse(this.url);
	let isHttps = !!(this.protocol.indexOf('https') > -1);

	this.parsedUrl = reqUrl;
	this.isHttps = isHttps;

	yield next;
};
