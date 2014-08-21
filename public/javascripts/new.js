angular.module("HappIT")
	.controller("NewHabit", ["$scope", "DB", "$routeParams", "$location", function($scope, DB, $routeParams, $location) {

		// The new habit
		$scope.newHabit = {};
		$scope.newHabit.type = $routeParams.type;


		// Validate the new habit
		$scope.validateHabit = function() {
			var n = $scope.newHabit;
			if(!(n.name)) {
				return false
			} else if (isNaN(n.numADay) || parseInt(n.numADay) <= 0) {
				return false;
			}
			return true;
		}

		// Create the new habit
		$scope.createHabit = function() {
			if($scope.validateHabit()) {
				$scope.newHabit.startTime = Date.now();
				$scope.newHabit.numADay = parseInt($scope.newHabit.numADay);
				DB.createHabit($scope.newHabit);
				$location.path("/dash");
			} else {
				alert("Please fill out all the fields correctly!");
			}
		};


	}]);