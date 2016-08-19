var httpProxyAgent = require('http-proxy-agent'),
    url = require('url'),
    httpProxy = require('http-proxy');

var CONFIG = require('../config/index');

var proxy = httpProxy.createProxyServer({})
    .on('error', function (err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went worng.');
    });

var webToExtranet = function (req, res, next) {
    var urlObj = url.parse(req.url);

    console.log('[go to extranet by proxy]: ' + urlObj.href);
    var proxyOptions = {
        target: {
            host: req.headers.host,
            port: urlObj.port || 80
        }
    };
    proxyOptions.agent = httpProxyAgent(CONFIG.proxyServer);
    proxy.web(req, res, proxyOptions, function (err) {
        // 再尝试一次
        proxy.web(req, res, proxyOptions, function (err) {
            console.log('[proxy error]: ' + req.url.grey);
        });
    });
};

module.exports = webToExtranet;
