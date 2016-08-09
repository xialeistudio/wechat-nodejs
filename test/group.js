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
const Group = require('../lib/group');
const group = new Group(wechat.getInstance());
describe('test group', function() {
	it('get all groups should be a array', (done)=> {
		group.getAll().then((groups)=> {
			groups.should.be.a.Array();
			done();
		}).catch(done);
	});
	it('get id by user should be a number', (done)=> {
		group.getIdByOpenid('oA-yljj5cBGSvnwFodHT1iqis7X8').then((groupid)=> {
			groupid.should.be.a.Number();
			done();
		}).catch(done);
	});
	it('create group should have property id', (done)=> {
		group.create('测试分组').then((group)=> {
			group.should.be.have.property('id');
			done();
		}).catch(done);
	});
	it('update group errcode should equal 0', (done)=> {
		group.update(102, '测试分组02').then((group)=> {
			group.should.be.have.property('errcode', 0);
			done();
		}).catch(done);
	});
	it('move user to group errcode should equal 0', (done)=> {
		group.moveUserToGroup('oA-yljj5cBGSvnwFodHT1iqis7X8', 102).then((group)=> {
			group.should.be.have.property('errcode', 0);
			done();
		}).catch(done);
	});
	it('move users to group errcode should equal 0', (done)=> {
		group.moveUsersToGroup(['oA-yljj5cBGSvnwFodHT1iqis7X8'], 103).then((group)=> {
			group.should.be.have.property('errcode', 0);
			done();
		}).catch(done);
	});
	it('delete group errcode should equal 0', (done)=> {
		group.remove(104).then((group)=> {
			group.should.be.have.property('errcode', 0);
			done();
		}).catch((e)=> {
			if (e.code == 40152) {
				done();
			}
			else {
				done(e);
			}
		});
	});
});