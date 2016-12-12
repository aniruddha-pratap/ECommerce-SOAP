angular
	.module('app')
	.controller('cartCtrl', ['$scope', '$http', '$state', '$stateParams', function($scope, $http, $state, $stateParams){
		$scope.totalQty = '0';
		$scope.totalPrice = '0';
		$scope.items = [];
		$http({
			method:"GET",
			url: "/cart"
		}).success(function(data){
			if(data.statusCode == '200'){
				if(data.username){
					$scope.message=data.username;
				}else{
					$scope.message='';
				}	
				console.log('product is '+data.cart[0].product);
				for(var i =0;i<data.cart.length;i++){
					var pushedItem = {};
					console.log(data.cart[i].product);
					pushedItem.id = data.cart[i].productId;
					pushedItem.name = data.cart[i].product;
					pushedItem.price = data.cart[i].price;
					pushedItem.quantity = data.cart[i].quantity;
					$scope.totalPrice = Number($scope.totalPrice) + Number(data.cart[i].price * data.cart[i].quantity);
					$scope.items.push(pushedItem);
				}
			}
		});
		
		$scope.addProduct = function(p_id){
			console.log(p_id);
			$http({
				method: "POST",
				url: "/cart",
				data: {
					'id': p_id
				}
			}).success(function(data){
				//checking the response data for statusCode
				console.log(data);
				console.log("When Add pressed"+data.statusCode);
				if(data.statusCode === '200'){
					$state.reload();
				}
			});
		};
		
		$scope.removeProduct = function(p_id){
			console.log(p_id);
			$http({
				method: "POST",
				url: "/cartRemove",
				data: {
					'id': p_id
				}
			}).success(function(data){
				//checking the response data for statusCode
				console.log(data);
				console.log(data.statusCode);
				if(data.statusCode === '200'){
					$state.reload();
				}
			});
		};
		
		$scope.checkout = function(){
			$state.go("checkout");
		};
		
	}]);