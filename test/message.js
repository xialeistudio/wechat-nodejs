/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */
'use strict';
require('should');
const config = require('../config.json');
const appid = config.wechat.appId;
const appsecret = config.wechat.appSecret;
const Wechat = require('../lib/wechat');
const wechat = new Wechat(appid, appsecret);
const Message = require('../lib/message');
const message = new Message(wechat.getInstance());
describe('test message', function() {
	it('send template message errcode should equal 0', (done)=> {
		message.sendTemplate('oA-yljj5cBGSvnwFodHT1iqis7X8', 'G4C9rNCejbhyYzh7xsOh46pieLelrmj_bLQtRhdOqkY', 'http://www.baidu.com', {
			orderId: {
				value: '20160101'
			},
			status: {
				value: '已发货'
			}
		}).then((data)=> {
			data.should.have.property('errcode', 0);
			done();
		}).catch(done);
	});
});