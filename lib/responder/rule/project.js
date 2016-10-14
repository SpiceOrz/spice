'use strict';

const fs = require('fs');
const httpProxy = require('http-proxy');
const urlLib = require('url');

const proxy = httpProxy.createProxyServer({});
proxy.on('error', function(err, req, res) {
  if(err) {
  	// 处理代理错误信息
    console.log(err.stack);
  }
});

const protocolReg = /^(http|https)\:/;

class Project {
	constructor(config) {
		this.config = config;

		this.checked = this.config.checked;

		// 自动回复
		this.handles = [];
		this.handlesMap = {};
		this.handlesChecked = false;

		// 代理转发
		this.proxys = [];
		this.proxysMap = {};
		this.proxysChecked = false;

		this.parse();
	}

	get id() {
		return this.config.id;
	}

	/**
	 * 解析配置
	 */
	parse() {
		// 遍历分组
		for(let item of this.config.children) {
			this[`${item.name}sChecked`] = item.checked;

			// 遍历规则
			for(let ritem of item.children) {
				let rule = Object.assign({}, ritem);
				rule.groupType = item.name;
				this[`${item.name}s`].push(rule);
				this[`${item.name}sMap`][rule.id] = rule;

				let m = rule.match;

				rule.isRegex = false;
				if(m.indexOf('regexp:') === 0) {
					// 判定为正则
					rule.isRegex = true;
					rule.match = new RegExp(m.substr(7));
				} else {
					// 追加结束符，方便判断
					rule.match = m[m.length-1] === '/' ? m : `${m}/`;
				}

				rule.hasProtocol = false;
				if(this.hasProtocol(rule.match)) {
					// 带协议
					rule.hasProtocol = true;
				}
			}
		}

		this.rules = [].concat(this.handles, this.proxys);
	}

	/**
	 * 执行规则处理
	 */
	*do(url) {
		let rule = this.match(url);
		if(!rule) return false;

		let action = rule.action;
		if(!action || typeof action !== 'string') return false;

		// TODO
		let letMeDo = () => {};
		if(action.indexOf('file:') === 0) {
			// 读取本地文件
			action = action.substr(5);
			letMeDo = this.readFile(action);
		} else if(action.indexOf('dir:') === 0) {
			// 读取本地目录
			action = action.substr(4);

		} else if(action.indexOf('res:') === 0) {
			// 快速回复
			action = action.substr(4);

		} else {
			// 代理
			letMeDo = this.proxy(action);
		}

		return letMeDo;
	}

	/**
	 * 判断协议名
	 */
	hasProtocol(url) {
		return protocolReg.test(url);
	}

	/**
	 * 匹配url
	 */
	match(url) {
		if(!this.checked) return; // 项目未勾选

		for(let rule of this.rules) {
			if(!this[`${rule.groupType}sChecked`] || !rule.checked) continue; // 分组或规则未勾选

			if(rule.isRegex) {
				if(rule.match.test(url)) {
					// 匹配成功
					return rule;
				}
			} else {
				let urlObj = urlLib.parse(url);

				if(!rule.hasProtocol) {
					// 匹配所有协议
					url = `${urlObj.auth?urlObj.auth+'@':''}${urlObj.host||''}${urlObj.pathname||''}${urlObj.search||''}${urlObj.hash||''}`;
				}

				url = url[url.length-1] === '/' ? url : `${url}/`;
				return url.indexOf(rule.match) === 0 ? rule : null;
			}
		}

		return null;
	}

	/**
	 * 代理
	 */
	proxy(action) {

		return (ctx) => {
			action = this.hasProtocol(action) ? action : `${ctx.protocol}://${action}`;
			
			ctx.respond = false;
			proxy.web(ctx.req, ctx.res, {
				target: action
			});
		};
	}

	/**
	 * 读取文件
	 */
	readFile(action) {
		return (ctx) => {
			ctx.body = fs.readFileSync(action, 'utf-8');
		};
	}

	/**
	 * 读取目录
	 */
	readDir(action) {
		return (ctx) => {
			// TODO
		};
	}

	/**
	 * 自动返回
	 */
	*handle() {
		// TODO
	}
}

module.exports = Project;
