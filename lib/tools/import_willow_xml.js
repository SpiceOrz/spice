'use strict';
const xml2js = require('xml2js');
const fsp = require('fs-promise');
const parser = new xml2js.Parser();

function inputAdapter(obj) {
    let normalization = {};
    try {
        normalization["name"] = "livepool";
        normalization["children"] = obj.FiddlerDS.dsProject[0].Project.map(function (item) {
            item.ResponseRule = item.ResponseRule || [];
            item.OverrideHost = item.OverrideHost || [];
            item.Extension = item.Extension || [];
            return {
                name: item.$.Name,
                checked: item.$.Enabled === "true",
                children: [
                    {
                        "name": "handler",
                        "type": "group",
                        "children": item.ResponseRule.map(function (item) {
                            const $ = item.$;
                            return {
                                id: $.ResponseRule_Id,
                                checked: $.Enabled === "true",
                                match: $.Match,
                                action: $.Action
                            }
                        })
                    }
                    , {
                        "name": "router",
                        "type": "group",
                        "children": item.Extension.map(function (item) {
                            const $ = item.$;
                            return {
                                checked: $.Enabled === "true",
                                match: $.Match,
                                action: $.Action.replace(/^x-overrideHost=/, '')
                            }
                        }).concat(item.OverrideHost.map(function (item) {
                            const $ = item.$;
                            return {
                                checked: $.Enabled === "true",
                                match: $.Name,
                                action: $.IP
                            }
                        }))
                    }
                ]
            }
        });

    } catch (e) {
        console.warn('error:' + e);
    }
    return normalization;
}

function getData() {
    fsp.readFile('./lib/tools/data.xml')
        .then(function (content) {
            //console.log(content)
            parser.parseString(content, function (err, result) {
                //console.dir(result);
                result = inputAdapter(result);
                fsp.writeFile('./rules/pool.js', 'module.exports = ' + JSON.stringify(result, null, 4))
                    .then(function (err) {
                        err && console.warn(err);
                    });
            });
        })
        .catch(function (err) {
            err && console.warn(err);
        });
}
getData();
