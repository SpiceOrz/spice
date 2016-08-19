var http = require('http'),
    https = require('https'),
    url = require('url'),
    zlib = require('zlib');// 返回res内容解压

module.exports = function(req, res, next) {
    var reqUrl = req.parsedUrl;
    var isHttps = req.isHttps;
    if (!isHttps) {
        var buffers = [],
            chunks = [],
            size = 0;
        var opt = {
            hostname: reqUrl.hostname,
            port: 80,
            path: reqUrl.pathname,
            method: 'GET'
        };

        // var request = http.request(options, function(response) {
        //     response.pipe(res);
        // });
        // request.end();

        http.request(opt, function (resTemp) {
                resTemp.on('data', function (chunk) {
                    chunks.push(chunk);
                    size += chunk.length;
                }).on('end', function () {
                    resTemp.headers['Access-Control-Allow-Origin']='*';
                    res.writeHead(resTemp.statusCode, resTemp.headers);
                    var buf = Buffer.concat(chunks, size);
                    res.write(buf, "binary");
                    res.end();
                });
            })
            .on('error', function (e) {
                console.log("Got error: " + e.message);
            })
            .end();
        return;
    }

    // https://www.mgenware.com/blog/?p=2707
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            afterBodyReceived(body);
            // TODO receive post data done and notify to update web ui
            // notify.reqBody(sid, req, res, body);
        });
    } else {
        afterBodyReceived('');
    }

    function afterBodyReceived(postBody){

        // TODO to be general
        var buffers = [],
            chunks = [],
            size = 0;

        var routeHost;
        // TODO to be general host 替换
        // if (req.url.match(/qun.qq.com/)) {
        //    routeHost = '10.12.23.157'
        // }

        var opt = {
            hostname: routeHost || reqUrl.hostname,
            port: reqUrl.port || 443, // https 默认走 443 端口
            path: reqUrl.pathname,
            method: req.method,
            headers: req.headers, // header 设置了accept-encoding，返回内容已被压缩，需使用 zlib进行解压 参考 http://www.cnblogs.com/axes/p/4466496.html
            rejectUnauthorized: false
        };
        var client = https.request(opt, function(resTemp){
            // resTemp.setEncoding("utf8"); // 会报错 TypeError: "list" argument must be an Array of Buffer
            resTemp.on('data', function(chunk){
                chunks.push(chunk);
                size += chunk.length;
            });
            resTemp.on('end', function(){
                res.writeHead(200, {
                    'Content-Type': resTemp.headers['content-type'] || 'text/html',
                    "Access-Control-Allow-Origin": "*"
                });

                var buffer = Buffer.concat(chunks, size);

                var encoding = resTemp.headers['content-encoding'];

                //如果数据用gzip或者deflate压缩，则用zlib进行解压缩
                if (encoding && encoding.match(/(\bdeflate\b)|(\bgzip\b)/)) {
                    zlib.unzip(buffer, function (err, buffer) {
                        if (!err) {
                            res.write(buffer, "binary");
                            res.end();
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    // console.log(buffer.toString());
                    res.write(buffer, "binary");
                    res.end();
                }
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });

        // POST 请求需要写入 post body
        // https://www.mgenware.com/blog/?p=2707
        client.write(postBody)
        client.end();
    }
}
