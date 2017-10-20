 const express = require('express');
 var bodyParser = require('body-parser');
 var fs = require('fs');
 var validator = require('validator');
 const app = express();

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

/*
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'khlam107@gmail.com',
    pass: 'KTKH0824'
  }
});

var mailOptions = {
  from: 'khlam107@gmail',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

var emailTmpl = "abc";
*/


//get request
app.get("/index",function(req, res){
	var valid = true;
	var msg = "";
	
	console.log(req.query);
	
	if(req.query.wechat.length != 0 &&
		validator.isEmail(req.query.email) &&
		req.query.location.length != 0 &&
		req.query.agree != undefined){
			
		var filename = "file.json";
		var dataAry = new Array();
		
		fs.readFile(filename, 'utf8', function(err, data){
		
			if(!err && data!= null){
				
				dataAry = JSON.parse(data);
				
			}
		
		if(dataAry.length == 100){
			msg = 'over 100';
		}else{
		
			for(var x in dataAry){
				if((dataAry[x].wechat == req.query.wechat) || (dataAry[x].email == req.query.email)){
					valid = false;
					msg = "existed record";
					break;
				}	
			}
		}
		
		
		if(valid){
			dataAry.push(req.query);
			fs.writeFile(filename,JSON.stringify(dataAry), function(err){
				
				if(err){
					
					console.log(err);
					
				}else{
					
					/*
					var mailOptions = {
					  from: 'abc@gmail.com',
					  to: req.query.email,
					  subject: 'Sending Email using Node.js',
					  html: emailTmpl
					};

					transporter.sendMail(mailOptions, function(error, info){
					  if (error) {
						msg = "email failed";
					  } else {
						console.log('Email sent: ' + info.response);
						msg = 'good to go';
					  }
					});
					
					console.log('The file is saved');
					*/
				}
				msg = 'good to go';
			});
		}

		res.send(msg);
	})
	
	}else{
		
		
		res.send('something worng');
	
	}
	
});

//handle post request
app.post("/", function(req, res){
	
	var filename = "file.json";
	var dataAry = new Array();
	
	//read the file
	fs.readFile(filename, 'utf8', function(err, data){
		
		if(!err && data!= null){
			
			dataAry = JSON.parse(data);
			
		}
		dataAry.push(req.body);
		
		fs.writeFile(filename,JSON.stringify(dataAry), function(err){
			
			if(err){
				
				console.log(err);
				
			}else{
				
				console.log('The file is saved');
			
			}
			
			
			var html = "<table>";
			
			for(var x in dataAry){
				
				html+="<tr><td>"+dataAry[x].name+"</td></tr>";
				
			}
			
			html+='</table>';
			
			res.send(html);
			
		});
		
		
	})
	
	
	
	
	
});

app.listen(3000, function(){
	
	console.log('Example app listening on port 3000!')
	
})