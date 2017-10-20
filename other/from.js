 const express = require('express');
 var bodyParser = require('body-parser');
 var fs = require('fs');
 var validator = require('validator');
 const app = express();

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static(__dirname + '/public'));
 app.set('view engine', 'ejs');
 
 app.get("/index",function(req, res){
	var valid = true;
	var msg = "";
	console.log(req.query.length);
	
 });
 
 app.listen(3000, function(){
	
	console.log('Example app listening on port 3000!')
	
})