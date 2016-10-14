'use strict';

const Project = require('./project');

class Rule {
	constructor(config) {
		this.config = config;

		this.projects = [];
		this.projectsMap = {};

		this.parse();
	}

	/**
	 * 解析配置
	 */
	parse() {
		// 遍历项目
		for(let item of this.config.children) {
			let projectConfig = Object.assign({}, item);
			let project = new Project(projectConfig);

			this.projects.push(project);
			this.projectsMap[projectConfig.id] = project;
		}
	}

	/**
	 * 执行规则处理
	 */
	*do(url) {
		for(let project of this.projects) {
			let action = yield project.do(url);

			if(action) return action;
		}

		return false;
	}
}

module.exports = Rule;