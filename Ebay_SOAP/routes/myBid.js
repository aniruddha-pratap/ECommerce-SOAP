var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var bcrypt = require('bcrypt-nodejs');
var salt = bcrypt.genSaltSync(10);
var winston = require('winston');
var soap = require('soap');
var baseURL = "http://localhost:8080/Ebay_WebService/services/ebayImplementation?wsdl";
var option = {
		ignoredNamespaces : true	
	};


router.get('/', function(req, res, next){
	var json_response = '';
	var args = {email: req.session.username};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.getUserBids(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+JSON.parse(result.getUserBidsReturn));
			    		  json_response = {'statusCode': '200','username': req.session.username, 'product': JSON.parse(result.getUserBidsReturn)};
			    		  res.send(json_response);
			    	  }
			      }); 
		      }
		  });
		  winston.debug("Bids for User: "+req.session.username);
});

module.exports = router;
