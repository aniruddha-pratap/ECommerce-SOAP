var calculator = angular.module('calculator', []);
calculator.controller('calculatorController', function($scope,$http){
	$scope.value = '0';
	var newVal = '';
	var oldVal = '';
	var getVal = '0';
	var operator = '';
	//Considering the user is entering a new number.
	var ifAppend = false;
	
	$scope.enterValue = function(val){
		if($scope.value == '0' || !ifAppend){
			$scope.value = val;
			ifAppend = true;
		}else{
			$scope.value = $scope.value + String(val);
		}
		newVal = $scope.value;
	};
	
	$scope.captureValues = function(operation){
		operator = operation;
		if(getVal == '0'){
			oldVal = newVal;
		}else{
			oldVal = getVal;
		}	
		$scope.value = '';
		ifAppend = false;
	};
	
	$scope.equals = function(){
		$scope.newVal = "New Val"+newVal;
		$scope.oldVal = "Old Val"+oldVal;	
		$http({
			method : 'POST',
			url : '/calculator',
			data: {
				'newValue' : newVal,
				'oldValue' : oldVal,
				'operator' : operator
			}
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data);
			console.log(data.statusCode);
			if(data.statusCode == "200"){
				$scope.value=data.result;
				getVal = data.result;
				$scope.error = '';
			}else{
				$scope.error = data.error;
			}
			
		});
	};
	
	$scope.clear = function(operation){
		oldVal = '';
		newVal = '';
		getVal = '0';
		operator = '';
		$scope.value = '0';
	};
	
});