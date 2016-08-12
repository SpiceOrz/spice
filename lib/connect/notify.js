/**
 * 与 uiApp 数据通信，暂时用了 test 跑通，response待测试
 */

var url = require('url'),
    mime = require('mime');

var uiApp = require('../webui/spiceapp');
// var socket, sid;
var queue = [];

var notify = {
    test: function( message ){
        var EventSourceRes = uiApp.EventSourceRes;
        var data = {
            message: message
        };
        EventSourceRes['/__pool__'] && EventSourceRes['/__pool__'].write("data: " + JSON.stringify(data) + "\n\n");
    },
    response: function (sid, req, res, body) {
        var EventSourceRes = uiApp.EventSourceRes;

        var urlObject = url.parse(req.url);

        var hosts = req.headers.host.split(":");
        var host = hosts[0],
        port = hosts[1] || 80;
        var row = {
            id: sid,
            result: res.statusCode,
            protocol: urlObject.protocol && urlObject.protocol.replace(':', '') || 'HTTP',
            host: host,
            path: urlObject.pathname,
            body: res.body || 0,
            // caching: (res.getHeader('cache-control') || '') + (expires ? '; expires:' + res.getHeader('expires') : ''),
            contentType: res.getHeader('content-type') || mime.lookup(urlObject.pathname),
            resHeaders: res._headers,
            resTime: +new Date()
        };
        // queue.push({
        //     type: 'res',
        //     rows: [row]
        // });
        queue.push(row);
        // console.log('proxy')
        // console.log(queue)
        // console.log('proxy')
        EventSourceRes['/__pool__'] && EventSourceRes['/__pool__'].write("data: " + JSON.stringify(queue) + "\n\n");
        queue = [];

        return {
            type: 'res',
            rows: [row]
        }
        // console.log(queue)
    }
};

module.exports = notify;
