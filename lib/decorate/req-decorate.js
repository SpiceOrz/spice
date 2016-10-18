'use strict';

const url = require('url');
const parseurl = require('parseurl');

module.exports = function*(next) {
	// 判断
	parseurl(this.req);
	let parsedUrl = this.req._parsedUrl;

	let reqUrl = parsedUrl.protocol? parsedUrl : url.parse(`https://${this.host}${this.url}`);
	let isHttps = !!(reqUrl.protocol.indexOf('https') > -1);

	this.parsedUrl = reqUrl;
	this.isHttps = isHttps;

	yield next;
};
