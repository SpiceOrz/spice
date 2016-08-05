var compose = require('compose-middleware').compose;

var responders =[  
				'./local',
				'./remote',
				];

module.exports = compose(responders.map(function(m) { return require(m);}));