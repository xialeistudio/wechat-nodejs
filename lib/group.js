/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
const AppError = require('./error');
const util = require('./util');
const cache = require('xl-cache');
class Group {
	constructor(wechatInstance) {
		if (!wechatInstance) {
			throw new AppError('wechat instance can\'t empty');
		}
		this.wechatInstance = wechatInstance;
	}

	/**
	 * get all user groups
	 * @returns {Promise|Promise.<Array>} [group list]
	 */
	getAll() {
		return this.wechatInstance.getAccessToken().then((access_token)=> {
			return util.httpGet({
				url: this.wechatInstance.baseURI + '/cgi-bin/groups/get?access_token=' + access_token,
				json: true
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data.groups;
			});
		});
	}

	/**
	 * get group id by openid
	 * @param openid
	 * @returns {Promise|Promise.<Object>} [group id]
	 */
	getIdByOpenid(openid) {
		return this.wechatInstance.getAccessToken().then((access_token)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/groups/getid?access_token=' + access_token,
				json: true,
				body: {openid}
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data.groupid;
			});
		});
	}

	/**
	 * create a group
	 * @param name
	 * @returns {Promise|Promise.<Object>} [errmsg errcode]
	 */
	create(name) {
		return this.wechatInstance.getAccessToken().then((access_token)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/groups/create?access_token=' + access_token,
				json: true,
				body: {group: {name}}
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data.group;
			});
		});
	}

	/**
	 * update a group
	 * @param id
	 * @param name
	 * @returns {Promise|Promise.<Object>} [errmsg errcode]
	 */
	update(id, name) {
		return this.wechatInstance.getAccessToken().then((access_token)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/groups/update?access_token=' + access_token,
				json: true,
				body: {group: {id, name}}
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data;
			});
		});
	}

	/**
	 * move user to group
	 * @param openid
	 * @param groupId
	 * @returns {Promise|Promise.<Object>} [errmsg errcode]
	 */
	moveUserToGroup(openid, groupId) {
		return this.wechatInstance.getAccessToken().then((access_token)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/groups/members/update?access_token=' + access_token,
				json: true,
				body: {openid, to_groupid: groupId}
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data;
			});
		});
	}

	/**
	 * move users to group
	 * @param openids
	 * @param groupId
	 * @returns {Promise|Promise.<Object>}
	 */
	moveUsersToGroup(openids, groupId) {
		return this.wechatInstance.getAccessToken().then((access_token)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/groups/members/batchupdate?access_token=' + access_token,
				json: true,
				body: {openid_list: openids, to_groupid: groupId}
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data;
			});
		});
	}

	/**
	 * delete group
	 * @param id
	 * @returns {Promise|Promise.<Object>}
	 */
	remove(id) {
		return this.wechatInstance.getAccessToken().then((access_token)=> {
			return util.httpPost({
				url: this.wechatInstance.baseURI + '/cgi-bin/groups/delete?access_token=' + access_token,
				json: true,
				body: {group: {id}}
			}).then((data)=> {
				data = this.wechatInstance.handleResult(data);
				return data;
			});
		});
	}
}
module.exports = Group;