var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var winston = require('winston');
var crypto = require('crypto');
var key = '6789';
var soap = require('soap');
var baseURL = "http://localhost:8080/Ebay_WebService/services/ebayImplementation?wsdl";
var option = {
		ignoredNamespaces : true	
	};

router.post('/', function(req, res, next){
	var json_response = '';
	var passEntered = req.param("password");
	//var enteredPassword = crypto.createHmac('sha1', key).update(passEntered).digest('hex');
	var args = {email: req.param("username"), password: passEntered};
	console.log(args);
	  soap.createClient(baseURL,option, function(err, client) {
	      if(err){
	    	  console.log("Fault from SOAP" + err);
	      }else{
	    	  client.getUser(args, function(err, result) {
	    		  console.log("Inside if soap method ");
		    	  if(err){
		    		  console.log("Error from soap method" + err);
		    	  }else{
		    		  var rs = JSON.parse(result.getUserReturn);
		    		  req.session.username = rs[0].username;
		    		  req.session.password = rs[0].password;
		    		  console.log("response "+rs[0].username);
		    		  json_response = {'statusCode': '200', 'result': JSON.parse(result.getUserReturn)};
		    		  res.send(json_response);
		    	  }
		      }); 
	      }
	  });
	winston.debug("Signin for User: "+req.param("username"));
});

module.exports = router;
