var koa = require('koa');
var router       = require('koa-route');
var staticServer = require('koa-static');
var parse        = require('co-body');
var path         = require('path');

var colors = require('colors');

var getConfig = require('../config');
var config = global.config = getConfig;

var app = koa();
app.use(staticServer(path.join(__dirname, './htdocs')));

// 存放 EventSource 的 res 对象
var EventSourceRes = {};

// logger
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// TODO. logger __path__类似 rosin 处理 log 数据
app.use(router.post('/__path__', function *() {
  var msg = yield parse.json(this);
  EventSourceRes['/__pool__'] && EventSourceRes['/__pool__'].write("data: " + JSON.stringify(msg) + "\n\n");
  this.body = "A";
}));

// 返回静态文件，并注册 EventSource
app.use(function *(){
    var req = this.req;
    if (req.headers.accept && req.headers.accept == 'text/event-stream') {
      // res.header();
        this.res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*"
        });

        var reqUrl = req.url;
        EventSourceRes[reqUrl] = this.res;

        // 必须 "data:" 开头 "\n\n" 结尾（代表结束）
        if (reqUrl == '/__log__') {
            EventSourceRes[reqUrl].write("data: " + '__log__' + "\n\n");
        } else if (req.url == '/__pool__') {
            EventSourceRes[reqUrl].write("data: " + '__pool__' + "\n\n")
        } 
     } else {
        this.body = 'B';
     }
});

app.listen(config.spiceAppPort);
app.EventSourceRes = EventSourceRes;

console.log('spice uiapp'.cyan + ' started '.green.bold + 'on port '.cyan + (config.spiceAppPort));
module.exports = app;

/*
EventSource 参考

http://www.hascode.com/2012/10/html5-server-send-events-using-node-js-or-jetty/

http://think2011.net/2014/11/12/html5-comet-EventSource--node.js-example/
https://github.com/think2011/html5-comet-EventSource--node.js-example

http://www.w3school.com.cn/html5/html_5_serversentevents.asp
*/