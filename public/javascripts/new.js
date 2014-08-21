angular.module("HappIT")
	.controller("NewHabit", ["$scope", "DB", "$routeParams", function($scope, DB, $routeParams) {

		// The new habit
		$scope.newHabit = {};
		$scope.newHabit.type = $routeParams.type;


	}]);