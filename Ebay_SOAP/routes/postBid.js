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

router.get('/', function(req,res,next){
	var json_response = '';
	var args = {email: req.session.username};
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.getBiddingProduct(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+JSON.parse(result.getBiddingProductReturn));
			    		  json_response = {'statusCode': '200', 'product': JSON.parse(result.getBiddingProductReturn)};
			    		  res.send(json_response);
			    	  }
			      }); 
		      }
		  });
});

router.post('/', function(req, res, next){
	var json_response = '';
	console.log(req.body.bidAmount);
	var getProduct = "select * from products where p_id = '"+req.param("id")+"'";
	console.log("Query is:"+getProduct);
	if(req.body.bidAmount != '0'){
		var args = {productId: req.body.id, email: req.session.username, bidAmount: req.body.bidAmount};
			  soap.createClient(baseURL,option, function(err, client) {
			      if(err){
			    	  console.log("Fault from SOAP" + err);
			      }else{
			    	  client.bidding(args, function(err, result) {
			    		  console.log("Inside if soap method ");
				    	  if(err){
				    		  console.log("Error from soap method" + err);
				    	  }else{
				    		  console.log("response "+result.biddingReturn);
				    		  if(result.biddingReturn == true){
				    			  json_response = {'statusCode': '200','error': 'Bid Posted Successfully!'};
				    			  res.send(json_response);
				    		  }
				    		  
				    		  
				    	  }
				      }); 
			      }
			  });
	}
	else{
		json_response = {'statusCode': '400','error':'Please provide the bid amount'};
		res.send(json_response);
	}
	winston.debug("Bidding User: "+req.session.username+" Bidding Amount: "+req.param("bidAmount")+" Product Id: "+req.param("id"));
});

module.exports = router;
