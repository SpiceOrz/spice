'use strict';
const xml2js = require('xml2js');
const fsp = require('fs-promise');
const parser = new xml2js.Parser();

function getData() {
    fsp.readFile(__dirname + '/data.xml')
        .then(function (content) {
            //console.log(content)
            parser.parseString(content, function (err, result) {
                //console.dir(result);
                fsp.writeFile(__dirname + '/data.js', 'module.exports c= ' + JSON.stringify(result, null, 2))
                    .then(function (err) {
                        err&&console.warn(err);
                    });
            });
        });
}
getData();
