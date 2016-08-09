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
const User = require('../lib/user');
const user = new User(wechat.getInstance());
describe('test user', function() {
	it('set use remark errcode should equal 0', (done)=> {
		user.setMark('oA-yljj5cBGSvnwFodHT1iqis7X8', '夏磊').then((data)=> {
			data.should.have.property('errcode', 0);
			done();
		}).catch(done);
	});
	it('get user info should have property openid', (done)=> {
		user.getInfo('oA-yljj5cBGSvnwFodHT1iqis7X8').then((data)=> {
			data.should.have.property('openid', 'oA-yljj5cBGSvnwFodHT1iqis7X8');
			done();
		}).catch(done);
	});
	it('check user isSubscribe should equal true', (done)=> {
		user.isSubscribe('oA-yljj5cBGSvnwFodHT1iqis7X8').then((isSubscribe)=> {
			isSubscribe.should.equal(true);
			done();
		}).catch(done);
	});
	it('batch get user info should be a array', (done)=> {
		user.batchGetInfo(['oA-yljj5cBGSvnwFodHT1iqis7X8', 'oA-yljhiBxU4e0_oEGEO8KvCd67k']).then((data)=> {
			data.should.be.a.Array();
			done();
		}).catch(done);
	});
	it('get user list should have property total', (done)=> {
		user.getList().then((data)=> {
			data.should.have.property('total');
			done();
		}).catch(done);
	});
});