var compose = require('compose-middleware').compose;
var responders = [
    './req-decorate',
];

module.exports = compose(responders.map(function (m) {
    return require(m);
}));