angular
	.module('app')
	.controller('myOrdersCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$scope.items = [];
		$scope.orderItems = [];
		$scope.message="";
		$http({
			method : 'POST',
			url : '/myOrders',
		}).success(function(data) {
			//checking the response data for statusCode
			console.log(data);
			console.log(data.statusCode);
			if(data.statusCode == "200"){
				if(data.username){
					$scope.message=data.username;
				}else{
					$scope.message='';
				}	
				//console.log('product is '+data.order[0].product.name);
				for(var i =0;i<data.product.length;i++){
					var pushedItem = {};
					console.log(data.product[i].product);
					pushedItem.name = data.product[i].product;
					pushedItem.quantity = data.product[i].quantity;
					pushedItem.date = data.product[i].date;
					pushedItem.serial = i+1;
					$scope.items.push(pushedItem);
				}
			}
			
		});
	}]);