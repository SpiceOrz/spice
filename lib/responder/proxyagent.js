'use strict';

const url = require('url');
const httpProxy = require('http-proxy');
const PacProxyAgent = require('pac-proxy-agent');
const httpProxyAgent = require('http-proxy-agent');

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

    console.log('[go to extranet by proxy]: ' + this.url);
    let proxyOptions = {
        target: this.url
    };

    let agent = proxyPac ? new PacProxyAgent(proxyPac) : httpProxyAgent(proxyServer);
    proxyOptions.agent = agent;

    proxy.web(this.req, this.res, proxyOptions, (err) => {
        // 再尝试一次
        proxy.web(this.req, this.res, proxyOptions, (err) => {
            console.log(`[proxy error]: ${this.url.grey}`);
            console.error(err.stack);
        });
    });
};

module.exports = webToExtranet;
