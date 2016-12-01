var express = require('express');
var router = express.Router();
var soap = require('soap');
var baseURL = "http://localhost:8080/273_Lab3/services/calculatorImpl?wsdl";
var option = {
		ignoredNamespaces : true	
	};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('calculator');
});

router.post('/', function(req, res, next) {
	var results = '';
	var json_response = '';
	var oldValue = req.body.oldValue;
	var newValue = req.body.newValue;
	var operator = req.body.operator;
	var args = {oldValue: Number(oldValue),newValue: Number(newValue)};
	if(operator == '+'){
		  soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.add(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  json_response = {'statusCode': '200', 'result': result.addReturn};
			    		  res.send(json_response);
			    	  }
			      }); 
		      }
		  });
	}
	
	if(operator == '-'){
		if(Number(oldValue) > Number(newValue)){
			  soap.createClient(baseURL,option, function(err, client) {
			      if(err){
			    	  console.log("Fault from SOAP" + err);
			      }else{
			    	  client.subtract(args, function(err, result) {
			    		  console.log("Inside if soap method ");
				    	  if(err){
				    		  console.log("Error from soap method" + err);
				    	  }else{
				    		  json_response = {'statusCode': '200', 'result': result.subtractReturn};
				    		  res.send(json_response);
				    	  }
				      }); 
			      }
			  });
		}else{
			json_response = {'statusCode': '400', 'error': 'First Number should be greater than the second'};
			res.send(json_response);
		}
	}
	
	if(operator == '*'){
		soap.createClient(baseURL,option, function(err, client) {
		      if(err){
		    	  console.log("Fault from SOAP" + err);
		      }else{
		    	  client.mutliply(args, function(err, result) {
		    		  console.log("Inside if soap method ");
			    	  if(err){
			    		  console.log("Error from soap method" + err);
			    	  }else{
			    		  json_response = {'statusCode': '200', 'result': result.mutliplyReturn};
			    		  res.send(json_response);
			    	  }
			      }); 
		      }
		  });
	}
	
	if(operator == '/'){
		if(newValue != '0'){
			soap.createClient(baseURL,option, function(err, client) {
			      if(err){
			    	  console.log("Fault from SOAP" + err);
			      }else{
			    	  client.division(args, function(err, result) {
			    		  console.log("Inside if soap method ");
				    	  if(err){
				    		  console.log("Error from soap method" + err);
				    	  }else{
				    		  json_response = {'statusCode': '200', 'result': result.divisionReturn};
				    		  res.send(json_response);
				    	  }
				      }); 
			      }
			  });
		}else{
			json_response = {'statusCode': '400', 'error': 'You cannot divide by zero'};
			res.send(json_response);
		}
	}
});

module.exports = router;
