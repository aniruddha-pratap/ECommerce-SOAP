angular
	.module('app')
	.controller('viewProfileCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
		$http({
			method : 'GET',
			url : '/profile',
		}).success(function(data){
			console.log("Profile "+data.user.username);
			if(data.user.username){
				$scope.message=data.user.username;
			}else{
				$scope.message='';
			}	
				$scope.fname=data.user.firstName;
				$scope.lname=data.user.lastName;
				$scope.dob=data.user.dob;
				$scope.cnumber=data.user.cellnumber;
				$scope.address=data.user.address;
		});
	}]);