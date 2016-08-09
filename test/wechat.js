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
describe('test wechat', function() {
	it('get accessToken should be a string', (done)=> {
		wechat.getAccessToken().then((accessToken)=> {
			accessToken.should.be.a.String();
			done();
		}).catch(done);
	});
	it('get wechat server list should be a array', (done)=> {
		wechat.getServerIps().then((list)=> {
			list.should.be.a.Array();
			done();
		}).catch(done);
	});
});