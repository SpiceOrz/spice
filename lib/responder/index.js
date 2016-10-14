'use strict';

const compose = require('koa-compose');
const CONFIG = require('../config/index');

const responders = [
  './local',
  (CONFIG.proxyPac || CONFIG.proxyServer) ? './proxyagent' : './remote',
];

module.exports = compose(responders.map(function (m) {
  return require(m);
}));
