var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var soap = require('soap');
var baseURL = "http://localhost:8080/Ebay_WebService/services/ebayImplementation?wsdl";
var option = {
		ignoredNamespaces : true	
	};

/* GET home page. */
router.get('/', function(req, res, next) {
	  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.getLandingProduct(function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  console.log("response "+JSON.parse(result.getLandingProductReturn));
			    		  ejs.renderFile('./views/index.ejs', { data: JSON.parse(result.getLandingProductReturn) } , function(err, result) {
						        // render on success
						        if (!err) {
						            res.end(result);
						        }
						        // render or error
						        else {
						            res.end('An error occurred');
						            console.log(err);
						        }
						    });
			    	  }
			      }); 
		      }
		  });
	
});

module.exports = router;
