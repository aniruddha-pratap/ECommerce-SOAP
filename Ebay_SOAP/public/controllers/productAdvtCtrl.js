angular
	.module('app')
	.controller('productAdvtCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		
		$scope.submit = function(name,description,price,quantity){
			console.log(name+description+price+quantity);
			if(name !== undefined && description !== undefined && price!== undefined && quantity!== undefined)
			{
				$http({
					method : 'POST',
					url : '/productAdvt',
					data: {
						'name': name,
						'description' : description,
						'price' : price,
						'quantity' : quantity,
						'type': 'new'
					}
				}).success(function(data) {
					if(data.username){
						$scope.message=data.username;
					}else{
						$scope.message='';
					}	
					//checking the response data for statusCode
					console.log(data);
					console.log(data.statusCode);
					$scope.message = data.error;
				});
			}
		};
		$scope.bidding = function(name,description,price,quantity){
			console.log(name+description+price+quantity);
			if(name !== undefined && description !== undefined && price!== undefined && quantity!== undefined)
			{
				$http({
					method : 'POST',
					url : '/productAdvt',
					data: {
						'name': name,
						'description' : description,
						'price' : price,
						'quantity' : quantity,
						'type': 'bidding'
					}
				}).success(function(data) {
					//checking the response data for statusCode
					console.log(data);
					console.log(data.statusCode);
					$scope.message = data.error;
				});
			}
		};
	}]);