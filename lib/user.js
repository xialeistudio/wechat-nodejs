/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
const AppError = require('./error');
const util = require('./util');
const qs = require('querystring');
class User {
	constructor(wechatInstance) {
		if (!wechatInstance) {
			throw new AppError('wechat instance can\'t empty');
		}
		this.wechatInstance = wechatInstance;
	}

	/**
	 * set user remark
	 * @param openid
	 * @param remark
	 * @returns {Promise|Promise.<Object>}
	 */
	setMark(openid, remark) {
		return this.wechatInstance.getAccessToken().then((accessToken)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + "/cgi-bin/user/info/updateremark?access_token=" + accessToken,
				json: true,
				body: {openid, remark}
			}).then((data)=> {
				return this.wechatInstance.handleResult(data);
			});
		});
	}

	/**
	 * get user info
	 * @param openid
	 * @param lang
	 * @returns {Promise|Promise.<Object>}
	 */
	getInfo(openid, lang) {
		lang = lang || 'zh_CN';
		return this.wechatInstance.getAccessToken().then((access_token)=> {
			const params = qs.stringify({
				openid, lang, access_token
			});
			return util.httpGet({
				url: this.wechatInstance.baseURI + "/cgi-bin/user/info?" + params,
				json: true
			}).then((data)=> {
				return this.wechatInstance.handleResult(data);
			});
		});
	}

	/**
	 * check user subscribe
	 * @param openid
	 * @returns {Promise.<Object>}
	 */
	isSubscribe(openid) {
		return this.getInfo(openid).then((data)=> {
			return !!data.subscribe;
		});
	}

	/**
	 * batch get uesr info
	 * @param openids
	 * @param lang
	 * @returns {Promise|Promise.<Array>}
	 */
	batchGetInfo(openids, lang) {
		lang = lang || 'zh_CN';
		const user_list = openids.map((openid)=> {
			return {
				openid,
				lang
			}
		});
		return this.wechatInstance.getAccessToken().then((accessToken)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/user/info/batchget?access_token=' + accessToken,
				json: true,
				body: {user_list}
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data.user_info_list;
			});
		});
	}

	/**
	 * get openid list
	 * @param nextOpenid
	 * @returns {Promise|Promise.<Object>}
	 */
	getList(nextOpenid) {
		return this.wechatInstance.getAccessToken().then((accessToken)=> {
			const params = {access_token: accessToken};
			if (nextOpenid) {
				params.next_openid = nextOpenid;
			}
			return util.httpGet({
				url: this.wechatInstance.baseURI + '/cgi-bin/user/get?' + qs.stringify(params),
				json: true
			}).then((data)=> {
				return this.wechatInstance.handleResult(data);
			});
		});
	}
}
module.exports = User;