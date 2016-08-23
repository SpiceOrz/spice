Wait Me..
---

#proxy-core

浏览器配置代理至
127.0.0.1   8003

在lib/config/keys 中 安装 root.crt 证书到电脑

* 目录结构

```shell
./lib
├── responder  -- 处理请求
│   ├── local   -- 本地代理
│   │   
│   ├── index  -- 管理整个 responder 下的各个模块
│   │
├── config  -- 图片目录
│   ├── keys  -- 证书相关
│   │   
│   ├── index  -- 入口
│   │   
├── decorate  -- 装饰器 
│   ├── index  -- 管理入口
│   │   
│   └──req-decorate
│   
└── core  -- 代理 core 代码
```

* 配置代理访问

```shell
./lib/config/index.js
配置`proxyPac`pac地址，配置`proxyServer`代理服务器(暂时支持http)，proxyPac优先级最高
```
