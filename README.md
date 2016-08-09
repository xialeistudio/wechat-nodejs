# 微信公众平台开发NodeJs SDK
本SDK要求NodeJs >= 4.x，欢迎大家在issues提问。

##安装
`npm install wechat-nodejs`

##说明
使用所有sdk功能前需要初始化wechat句柄，初始化代码如下：
```
const Wechat = require('wechat-nodejs').Wechat;
const wechat = new Wechat(appId,appSecret);
```
SDK扩展了JS原始错误类，包含message,code属性，SDK中Promise抛出的错误code为微信返回的errcode，抛出一个自定义错误代码如下：
```
const AppError = require('wechat-nodejs').AppError;
throw new AppError('参数错误',1);
```
##功能列表
###分组
+ 初始化Group
```
const Group = require('wechat-nodejs').Group;
const group = new Group(wechat.getInstance());
```
+ 创建分组
```
group.create('测试分组').then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 获取所有分组
```
group.getAll().then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 获取用户所在分组
```
group.getIdByOpenid(openid).then((groupId)=>{
	console.log(groupId);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 修改分组名称
```
group.update(100,'测试分组01').then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 移动用户分组
```
group.moveUserToGroup('oA-yljrYgywqN3SCXS_3jZnIP6Yw',100).then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 批量移动用户分组
```
group.moveUsersToGroup(['oA-yljrYgywqN3SCXS_3jZnIP6Yw'],100).then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 删除分组
```
group.remove(100).then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
### JSSDK
+ 初始化JSSDK
```
const JSSDK = require('wechat-nodejs').JSSDK;
const jssdk = new JSSDK(wechat.getInstance());
```
+ 获取jsticket
```
jssdk.getTicket().then((ticket)=>{
	console.log(ticket);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 获取jssdk配置参数
```
jssdk.getConfig('http://www.baidu.com',['onMenuShareTimeline'],false).then((config)=>{
	console.log(config);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
###自定义菜单
+ 初始化Menu
```
const Menu = require('wechat-nodejs').Menu;
const menu = new Menu(wechat.getInstance());
```
+ 创建自定义菜单
```
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
    }]
  }
];
menu.create(button).then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 查询自定义菜单
```
menu.get().then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 删除自定义菜单
```
menu.remove().then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 获取公众平台后台设置的自定义菜单
```
menu.getByWeb().then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
### 消息
+ 初始化Message
```
const Message = require('wechat-nodejs').Message;
const message = new Message(wechat.getInstance());
```
+ 发送模板消息
```
const data = {
  orderId: {
    value: '20160101'
  },
  status: {
    value: '已发货'
  }
};
const openid = 'oA-yljj5cBGSvnwFodHT1iqis7X8';
const templateId = 'G4C9rNCejbhyYzh7xsOh46pieLelrmj_bLQtRhdOqkY';
const url = 'https://github.com';
message.sendTemplate(openid,templateId,url,data).then((data)=> {
  data.should.have.property('errcode', 0);
}).catch((e)=>{
  	console.error(e.message,e.code);
});
```
### 用户
+ 初始化User
```
const User = require('wechat-nodejs').User;
const user = new User(wechat.getInstance());
```
+ 设置用户备注名
```
user.setRemark('oA-yljj5cBGSvnwFodHT1iqis7X8','重要客户').then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 获取用户信息
```
user.getInfo('oA-yljj5cBGSvnwFodHT1iqis7X8').then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 批量获取用户信息
```
user.batchGetInfo(['oA-yljj5cBGSvnwFodHT1iqis7X8']).then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 检测关注
```
user.isSubscribe('oA-yljj5cBGSvnwFodHT1iqis7X8').then((isSubscribe)=>{
	console.log(isSubscribe);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
+ 获取关注用户openid列表
```
user.getList('oA-yljj5cBGSvnwFodHT1iqis7X8').then((data)=>{
	console.log(data);
}).catch((e)=>{
	console.error(e.message,e.code);
});
```
##单元测试
1. `npm install mocha -g`
2. 在本sdk根目录新建**config.json**，内容如下：
```
{
  "wechat": {
    "appId": "微信公众号appId",
    "appSecret": "微信公众号appSecret"
  }
}
```
3. `npm run test`
##授权协议
MIT License
##我的博客
[每天进步一点点](http://www.ddhigh.com)