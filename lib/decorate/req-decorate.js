var url = require('url');
module.exports = function(req, res, next) {
	// console.log(req)
	// 判断
	var parsedUrl = req._parsedUrl;
    var reqUrl = parsedUrl.protocol? parsedUrl: url.parse('https://'+ req.headers.host + req.url);
    var isHttps = reqUrl.protocol.indexOf('https') > -1? true: false;

    req.parsedUrl = reqUrl;
    req.isHttps = isHttps;
	next();
};
