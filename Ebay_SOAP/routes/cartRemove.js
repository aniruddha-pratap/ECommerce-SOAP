var express = require('express');
var router = express.Router();
var winston = require('winston');
var soap = require('soap');
var baseURL = "http://localhost:8080/Ebay_WebService/services/ebayImplementation?wsdl";
var option = {
		ignoredNamespaces : true	
	};

router.post('/', function(req, res, next) {
	var json_response = '';
	var args = {productId: req.body.id, email: req.session.username};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.removeFromCart(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+result.removeFromCartReturn);
			    		  if(result.removeFromCartReturn == true){
			    			  json_response = {'statusCode': '200'};
			    			  res.send(json_response);
			    		  }
			    		  
			    		  
			    	  }
			      }); 
		      }
		  });

		winston.debug("Decrease quantity from cart for User: "+req.session.username+" for Product Id: "+req.param("id"));
	});

module.exports = router;
