var express = require('express');
var router = express.Router();
var winston = require('winston');
var soap = require('soap');
var baseURL = "http://localhost:8080/Ebay_WebService/services/ebayImplementation?wsdl";
var option = {
		ignoredNamespaces : true	
	};

/* GET home page. */
router.get('/', function(req, res, next) {
	var json_response = '';
	var args = {email: req.session.username};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.getCart(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+JSON.parse(result.getCartReturn));
			    		  json_response = {'statusCode': '200', 'cart': JSON.parse(result.getCartReturn)};
			    		  res.send(json_response);
			    	  }
			      }); 
		      }
		  });
	
});

router.post('/', function(req, res, next) {
	var json_response = '';
	var args = {productId: req.body.id, email: req.session.username};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.addToCart(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+result.addToCartReturn);
			    		  if(result.addToCartReturn == true){
			    			  json_response = {'statusCode': '200'};
			    			  res.send(json_response);
			    		  }
			    		  
			    		  
			    	  }
			      }); 
		      }
		  });

		winston.debug("Add Items to cart for User: "+req.session.username+" Product Id: "+req.param("id"));
		
	});

module.exports = router;
