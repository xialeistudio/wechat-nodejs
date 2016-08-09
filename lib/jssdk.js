/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
const AppError = require('./error');
const util = require('./util');
const cache = require('xl-cache');
const qs = require('querystring');
class JSSDK {
	constructor(wechatInstance) {
		if (!wechatInstance) {
			throw new AppError('wechat instance can\'t empty');
		}
		this.wechatInstance = wechatInstance;
	}

	/**
	 * get jsticket
	 * @returns {Promise|Promise.<String>}
	 */
	getTicket() {
		const cacheKey = this.wechatInstance.appId + '-jsticket';
		return cache.get(cacheKey).then((ticket)=> {
			if (ticket) {
				return ticket;
			}
			return this.wechatInstance.getAccessToken().then((access_token)=> {
				const params = qs.stringify({access_token, type: 'jsapi'});
				return util.httpGet({
					url: this.wechatInstance.baseURI + '/cgi-bin/ticket/getticket?' + params,
					json: true
				}).then((data)=> {
					data = this.wechatInstance.handleResult(data);
					cache.set(cacheKey, data.ticket, data.expires_in - 600);
					return data.ticket;
				});
			});
		});
	}

	/**
	 * get JSSDK sign
	 * @param url
	 * @param apis
	 * @param debug
	 * @returns {Promise.<Object>}
	 */
	getConfig(url, apis, debug) {
		debug = debug || false;
		return this.getTicket().then((ticket)=> {
			const params = {
				jsapi_ticket: ticket,
				noncestr: String(Date.now()),
				timestamp: parseInt(Date.now() / 1000),
				url
			};
			const sign = util.sha1(decodeURIComponent(qs.stringify(params)));
			return {
				appId: this.wechatInstance.appId,
				timestamp: params.timestamp,
				nonceStr: params.noncestr,
				signature: sign,
				jsApiList: apis,
				debug
			}
		});
	}
}
module.exports = JSSDK;