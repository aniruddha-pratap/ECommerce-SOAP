var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var soap = require('soap');
var baseURL = "http://localhost:8080/Ebay_WebService/services/ebayImplementation?wsdl";
var option = {
		ignoredNamespaces : true	
	};

router.post('/', function(req, res, next){
	var results = '';
	var json_response = '';
	var args = {email: req.session.username};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.getProduct(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+JSON.parse(result.getProductReturn));
			    		  json_response = {'statusCode': '200', 'username':req.session.username, 'product': JSON.parse(result.getProductReturn)};
			    		  res.send(json_response);
			    	  }
			      }); 
		      }
		  });
	
});

module.exports = router;
