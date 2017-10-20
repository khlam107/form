 var express = require('express');  
 var app = express();  
 var bodyParser = require('body-parser');
 var fs = require('fs');
 var validator = require('validator');
 var jQuery = require('jquery');
 var filename = "file.json";
 
 app.use(express.static(__dirname + '/public'));
 app.set('view engine', 'ejs');
 
 fs.readFile(filename, 'utf8', function(err, data){
	if(!err && data!= null){
		dataAry = JSON.parse(data);
	}
 });
 
 app.get('/index', function(req, res){ 

	var valid = true;
	var msg = new Array();
	var thx = new Array();
	
	if(req.query.wechat == undefined && req.query.email == undefined && req.query.location == undefined && req.query.agree == undefined){
		res.render('index', {  
		msg, thx
		});
		
	}else{
	
	if(req.query.wechat.length == 0){
		msg.push("微信账号不能为空");
		valid = false;
	}
		
	if(req.query.email.length == 0){
		msg.push("电邮地址不能为空");
		valid = false;
	}else{
		if(validator.isEmail(req.query.email) == false){
			msg.push("电邮地址不正确");
			valid = false;
		}
	}
		
	if(req.query.agree == undefined){
		msg.push("请同意条款及细则");
		valid = false;
	}
		
	if(req.query.location.length == 0){
		msg.push("请选择分店");
		valid = false;
	}
		
	if(valid == true){
		if(dataAry.length == 100){
			msg.push("亲~是次活动反应热烈，很抱歉礼品已火速地送完了！但你还可以支持李栋旭ＯＰＰＡ的优惠喔～");
			valid = false;
		}else{
			for(var x in dataAry){
				if((dataAry[x].wechat == req.query.wechat) || (dataAry[x].email == req.query.email)){
				msg.push("微信账号/电邮地址已被注册","亲，不好意思，你曾经登记了这次正官庄的活动了，希望下次来香港旅游再为你服务，谢谢。");
					valid = false;
					break;
				}	
			}
		}
	}
		
	if(valid){
		dataAry.push(req.query);
		fs.writeFile(filename,JSON.stringify(dataAry), function(err){
			if(err)throw err, msg.push("系统错误, 请稍候再试");
		});
		thx.push("亲，谢谢你支持我们正官庄这次活动，紧记要支持李栋旭OPPA推介的产品EVERYTIME啊！");
		
		var nodemailer = require('nodemailer');
		var xoauth2 = require('xoauth2');
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: 'khlam107@gmail.com' ,
				pass: 'mfjgozelrydpimrp'
			}
		});

		var http = require('http');
		var httpServer = http.createServer(function (request, response)
		{
			transporter.sendMail({
			   from: 'khlam107@gmail.com' ,
			   to: 'khlam107@yahoo.com.hk',
			   subject: '正官庄－黃金週迎新礼品确认信 (香港島)',
			   text: '尊贵的客户:感谢您对正官庄的支持，欢迎来到香港旅游。恭喜您获得迎新礼品包一份。现亲临所选的正官庄分店凭此优惠券编码即可领取限定野樱莓汁乙包及以黄金周优惠价港币690元正（买三送一，平均每盒价）购买李栋旭OPPA推介的EVERYTIME礼盒装（30包）。优惠券代码: hk_A002所选分店地址：香港岛 – 湾仔店分店地址：湾仔菲林明道7号好发商业大厦地下G3号铺 (大有商场对面)联络电话：(852) 2523 1983营业时间：星期一至日11:00 – 20:00细则:所有图片只供参考每个账号只能换取赠品一次，赠品不能兑换现金或其他优惠必须出示优惠编码领取礼品所有赠品优惠名额有限，送完即止优惠期由2017年9月29日至2017年10月8日如有任何争议，正官庄保留最终决定权正官庄(香港)'
			});
		}).listen(8080);
		
	}
	
	res.render('index', {  
		msg, thx
	});
	}
 });
 
 var server = app.listen(3000, function() {  
  console.log('Listening on port 3000');  
 });   