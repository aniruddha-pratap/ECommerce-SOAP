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
	var json_responses = '';
	var username = req.param("username");
	var firstName = req.param("firstname");
	var lastName = req.param("lastname");
	var passwordToSave = crypto.createHmac('sha1', key).update(req.param("password")).digest('hex');
	
	var args = {email: username, password: passwordToSave,firstName: req.param("firstname"),lastName: req.param("lastname")};
	  soap.createClient(baseURL,option, function(err, client) {
	      if(err){
	    	  console.log("Fault from SOAP" + err);
	      }else{
	    	  client.insertUser(args, function(err, result) {
	    		  console.log("Inside if soap method ");
		    	  if(err){
		    		  console.log("Error from soap method" + err);
		    	  }else{
		    		  console.log("response "+result.insertUserReturn);
		    		  req.session.username = username;
		    		  req.session.password = passwordToSave;
		    		  if(result.insertUserReturn == true){
		    			  json_response = {'statusCode': '200'};
		    			  res.send(json_response);
		    		  }
		    		  
		    		  
		    	  }
		      }); 
	      }
	  });

	winston.debug("Signup for User: "+req.param("username"));
});


module.exports = router;
