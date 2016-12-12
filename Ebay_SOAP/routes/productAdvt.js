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

router.post('/', function(req, res, next){
	
	var json_response = '';
	var args = {name: req.body.name, description: req.body.description, price: req.body.price, quantity: req.body.quantity, sellerInfo: req.session.username, type: req.body.type};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.postProduct(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+result.postProductReturn);
			    		  if(result.postProductReturn == true){
			    			  json_response = {'statusCode': '200', 'username': req.session.username};
			    			  res.send(json_response);
			    		  }
			    		  
			    		  
			    	  }
			      }); 
		      }
		  });
	winston.debug("Posted for User: "+req.session.username);
});


module.exports = router;
