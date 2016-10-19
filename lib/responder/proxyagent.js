'use strict';

const httpProxy = require('http-proxy');
const PacProxyAgent = require('pac-proxy-agent');
const httpProxyAgent = require('http-proxy-agent');

const certHelper = require('../config/keys/certHelper');

const CONFIG = require('../config/index');
const proxyPac = CONFIG.proxyPac ? `pac+${CONFIG.proxyPac}` : '';
const proxyServer = CONFIG.proxyServer;

const proxy = httpProxy.createProxyServer({})
    .on('error', (err, req, res) => {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Something went worng.');
    });

var webToExtranet = function*(next) {
    this.respond = false; // 为了操作原生的req和res
    let opts = this.parsedUrl;

    console.log(`[go to extranet by proxy]: ${opts.href}`);
    let proxyOptions = {
        target: {
            host: opts.host,
            port: opts.port || 80
        }
    };

    let agent = proxyPac ? new PacProxyAgent(proxyPac) : httpProxyAgent(proxyServer);
    proxyOptions.agent = agent;

    proxy.web(this.req, this.res, proxyOptions, (err) => {
        // 再尝试一次
        proxy.web(this.req, this.res, proxyOptions, (err) => {
            console.log(`[proxy error]: ${opts.href.grey}`);
            console.error(err.stack);
        });
    });
};

module.exports = webToExtranet;
