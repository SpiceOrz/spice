var compose = require('compose-middleware').compose;
var CONFIG = require('../config/index');

var responders = [
    './local',
    (CONFIG.proxyPac || CONFIG.proxyServer) ? './proxyagent' : './remote',
];

module.exports = compose(responders.map(function (m) {
    return require(m);
}));
