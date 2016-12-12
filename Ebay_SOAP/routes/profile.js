var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var soap = require('soap');
var baseURL = "http://localhost:8080/Ebay_WebService/services/ebayImplementation?wsdl";
var option = {
		ignoredNamespaces : true	
	};

router.get('/', function(req,res,next){
	var json_response = '';
	var args = {email: req.session.username, password: req.session.password};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.getUser(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+JSON.parse(result.getUserReturn));
			    		  var profile = JSON.parse(result.getUserReturn);
			    		  console.log(profile[0]);
			    		  json_response = {'statusCode': '200', 'user': profile[0]};
			    		  res.send(json_response);
			    	  }
			      }); 
		      }
		  });
});

router.post('/', function(req, res, next){
	var json_response = '';
	var args = {firstName: req.body.firstname, lastName: req.body.lastname, phoneNumber: req.body.phoneNumber, dob: req.body.dob, address: req.body.address, email: req.session.username};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.updateUserProfile(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+result.updateUserProfileReturn);
			    		  if(result.updateUserProfileReturn == true){
			    			  json_response = {'statusCode': '200'};
			    			  res.send(json_response);
			    		  }
			       	  }
			      }); 
		      }
		  });
});


module.exports = router;
