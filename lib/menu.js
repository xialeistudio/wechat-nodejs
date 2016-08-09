/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
const AppError = require('./error');
const util = require('./util');
/**
 * custom menu
 */
class Menu {
	constructor(wechatInstance) {
		if (!wechatInstance) {
			throw new AppError('wechat instance can\'t empty');
		}
		this.wechatInstance = wechatInstance;
	}

	/**
	 * get menu setting by program
	 * @returns {Promise|Promise.<Object>}
	 */
	get() {
		return this.wechatInstance.getAccessToken().then((accessToken)=> {
			return util.httpGet({
				url: this.wechatInstance.baseURI + '/cgi-bin/menu/get?access_token=' + accessToken,
				json: true
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data;
			});
		});
	}

	/**
	 * create menu
	 * @param button
	 * @returns {Promise|Promise.<Object>}
	 */
	create(button) {
		const data = {button};
		return this.wechatInstance.getAccessToken().then((accessToken)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/menu/create?access_token=' + accessToken,
				json: true,
				body: data
			}).then((resp)=> {
				resp = this.wechatInstance.handleResult(resp);
				return resp;
			});
		});
	}

	/**
	 * remove menu
	 * @returns {Promise|Promise.<Object>}
	 */
	remove() {
		return this.wechatInstance.getAccessToken().then((accessToken)=> {
			return util.httpGet({
				url: this.wechatInstance.baseURI + '/cgi-bin/menu/delete?access_token=' + accessToken,
				json: true
			}).then((resp)=> {
				resp = this.wechatInstance.handleResult(resp);
				return resp;
			});
		});
	}

	/**
	 * get menu setting by wechat web
	 * @returns {Promise|Promise.<Object>}
	 */
	getByWeb() {
		return this.wechatInstance.getAccessToken().then((accessToken)=> {
			return util.httpGet({
				url: this.wechatInstance.baseURI + '/cgi-bin/get_current_selfmenu_info?access_token=' + accessToken,
				json: true
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data;
			});
		});
	}
}
module.exports = Menu;