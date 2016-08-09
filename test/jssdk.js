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
const JSSDK = require('../lib/jssdk');
const jssdk = new JSSDK(wechat.getInstance());
describe('test jssdk', function() {
	it('test get sign should have property signature', (done)=> {
		jssdk.getConfig('http://www.baidu.com', [
			'onMenuShareTimeline'
		]).then((data)=> {
			data.should.have.property('signature');
			done();
		}).catch(done);
	});
});