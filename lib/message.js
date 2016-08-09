/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
const AppError = require('./error');
const util = require('./util');
class Message {
	constructor(wechatInstance) {
		if (!wechatInstance) {
			throw new AppError('wechat instance can\'t empty');
		}
		this.wechatInstance = wechatInstance;
	}

	/**
	 * 发送模板消息
	 * @param openid
	 * @param templateId
	 * @param url
	 * @param data
	 * @returns {Promise|Promise.<Object>}
	 */
	sendTemplate(openid, templateId, url, data) {
		return this.wechatInstance.getAccessToken().then((accessToken)=> {
			const body = {
				touser: openid,
				template_id: templateId,
				url,
				data
			};
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/message/template/send?access_token=' + accessToken,
				json: true,
				body
			}).then((resp)=> {
				return this.wechatInstance.handleResult(resp);
			});
		});
	}
}

module.exports = Message;