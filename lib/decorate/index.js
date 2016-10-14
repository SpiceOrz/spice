'use strict';

const compose = require('koa-compose');
const responders = [
  './req-decorate',
  './notify'
];

module.exports = compose(responders.map(function (m) {
  return require(m);
}));
