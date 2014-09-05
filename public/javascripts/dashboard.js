angular.module("HappIT")
	.controller("Dashboard", ["$scope", "DB", "$routeParams", "$location", function($scope, DB, $routeParams, $location) {

		$scope.habits = DB.getHabits();

		// Get the button class
		$scope.getButtonClass = function(type) {
			return (type === "make") ? "btn-success" : "btn-danger";
		};

		// Get the button text
		$scope.getButtonText = function(type) {
			return (type === "make") ? "Log a Success" : "Log a Mistake";
		};

		// Log the habit
		$scope.logHabit = function(habit) {
			
			var type = habit.type;

			var log = {};
			log.now = Date.now();
			log.id = habit.name;

			if (type === "make") {
				DB.createSuccess(log);
			} else {
				DB.createMistake(log);
			}

			// Send user notification
			$scope.notify(habit);
		};

		// Check if there are any habits shown
		$scope.hasHabits = function() {
			return DB.hasHabits();
		}


		// Notify and encourage the user
		$scope.notify = function(habit) {
			$("body").trigger("logHabit", [habit]);
		}

		// Analyze your progress
		$scope.analyzeHabit = function(habit) {
			$("body").trigger("analyze-habit", [habit]);
		};

	}]);