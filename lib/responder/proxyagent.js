var url = require('url'),
    httpProxy = require('http-proxy');
var PacProxyAgent = require('pac-proxy-agent');
var httpProxyAgent = require('http-proxy-agent');

var CONFIG = require('../config/index');
var proxyPac = CONFIG.proxyPac ? 'pac+' + CONFIG.proxyPac : '';
var proxyServer = CONFIG.proxyServer;

var proxy = httpProxy.createProxyServer({})
    .on('error', function (err, req, res) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went worng.');
    });

var webToExtranet = function (req, res, next) {
    var opts = url.parse(req.url);
    console.log('[go to extranet by proxy]: ' + opts.href);
    var proxyOptions = {
        target: {
            host: req.headers.host,
            port: opts.port || 80
        }
    };

    var agent = proxyPac ? new PacProxyAgent(proxyPac) : httpProxyAgent(proxyServer);
    proxyOptions.agent = agent;
    opts.agent = agent;

    proxy.web(req, res, proxyOptions, function (err) {
        // 再尝试一次
        proxy.web(req, res, proxyOptions, function (err) {
            console.log('[proxy error]: ' + req.url.grey);
        });
    });
};

module.exports = webToExtranet;
