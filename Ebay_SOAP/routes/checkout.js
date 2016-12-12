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
	var error ='';
	var cardNumber = req.param("cardNumber");
	console.log('Card Number:'+ cardNumber);
	var getCart = "select quantity, productId from cart where addedBy = '"+req.session.username+"'";
	if(cardNumber.length == '16' && !isNaN(cardNumber)){
		var args = {email: req.session.username};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.checkout(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+result.checkoutReturn);
			    		  if(result.checkoutReturn == true){
			    			  json_response = {'statusCode': '200'};
			    			  res.send(json_response);
			    		  }
			    		  
			    		  
			    	  }
			      }); 
		      }
		  });
	}
	else{
		json_response = {'statusCode': '400', 'error':'Credit Card number should be 16 didgit'};
  	  	res.send(json_response);
	}
	winston.debug("Checkout from cart for User: "+req.session.username);
});

module.exports = router;
