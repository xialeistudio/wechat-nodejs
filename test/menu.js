/**
 * @author xialeistudio
 * @date 2016/8/9 0009
 */'use strict';
require('should');
const config = require('../config.json');
const appid = config.wechat.appId;
const appsecret = config.wechat.appSecret;
const Wechat = require('../lib/wechat');
const wechat = new Wechat(appid, appsecret);
const Menu = require('../lib/menu');
const menu = new Menu(wechat.getInstance());
describe('test menu', function() {
	it('get menu by program should have property menu', (done)=> {
		menu.get().then((data)=> {
			data.should.have.property('menu');
			done();
		}).catch((e)=> {
			if (e.code == 46003) {
				done();
			}
			else {
				done(e);
			}
		});
	});
	it('create menu errcode should equal 0', (done)=> {
		const button = [
			{
				"type": "click",
				"name": "今日歌曲",
				"key": "V1001_TODAY_MUSIC"
			},
			{
				"name": "菜单",
				"sub_button": [
					{
						"type": "view",
						"name": "搜索",
						"url": "http://www.soso.com/"
					},
					{
						"type": "view",
						"name": "视频",
						"url": "http://v.qq.com/"
					},
					{
						"type": "click",
						"name": "赞一下我们",
						"key": "V1001_GOOD"
					}
				]
			}
		];
		menu.create(button).then((data)=> {
			data.should.have.property('errcode', 0);
			done();
		}).catch(done);
	});
	it('remove menu errcode should equal 0', (done)=> {
		menu.remove().then((data)=> {
			data.should.have.property('errcode', 0);
			done();
		}).catch(done);
	});
	it('get menu setting by wechat web should have property menu', (done)=> {
		menu.getByWeb().then((data)=> {
			data.should.have.property('selfmenu_info');
			done();
		}).catch((e)=> {
			if ([46003, 40066].indexOf(e.code) !== -1) {
				done();
			}
			else {
				done(e);
			}
		});
	});
});