/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
const cache = require('xl-cache');
const Promise = require('bluebird');
const qs = require('querystring');
const util = require('./util');
const AppError = require('./error');
class Wechat {
	/**
	 *
	 * @param appId
	 * @param appSecret
	 * @param baseURI
	 */
	constructor(appId, appSecret, baseURI) {
		if (!appId || !appSecret) {
			throw new AppError('parameter invalid', -1);
		}
		this.appId = appId;
		this.appSecret = appSecret;
		this.baseURI = baseURI || 'https://api.weixin.qq.com';
		this.accessToken = null;
	}

	getInstance() {
		if (!this.appId || !this.appSecret) {
			throw new AppError('Wechat not initialized', -2);
		}
		return this;
	}

	/**
	 * get accessToken
	 * @returns {*}
	 */
	getAccessToken() {
		const cacheKey = 'accessToken-' + this.appId;
		if (this.accessToken) {
			return Promise.resolve(this.accessToken);
		}
		return cache.get(cacheKey).then((accessToken)=> {
			if (accessToken) {
				return accessToken;
			}
			const params = qs.stringify({
				grant_type: 'client_credential',
				appid: this.appId,
				secret: this.appSecret
			});
			return util.httpGet({
				url: this.baseURI + '/cgi-bin/token?' + params,
				json: true
			}).then((data)=> {
				data = this.handleResult(data);
				this.accessToken = data.access_token;
				//设置缓存
				cache.set(cacheKey, data.access_token, data.expires_in - 600);
				return data.access_token;
			});
		});
	}

	/**
	 * 处理结果
	 * @param data
	 * @returns {*}
	 */
	handleResult(data) {
		if (data.errcode && data.errcode > 0) {
			throw new AppError(data.errmsg, data.errcode);
		}
		return data;
	}

	/**
	 * 获取服务器IP
	 * @returns {Promise|Promise.<String>}
	 */
	getServerIps() {
		return this.getAccessToken().then((accessToken)=> {
			return util.httpGet({
				url: this.baseURI + '/cgi-bin/getcallbackip?access_token=' + accessToken,
				json: true
			}).then((data)=> {
				data = this.handleResult(data);
				return data.ip_list;
			});
		});
	}
}
module.exports = Wechat;