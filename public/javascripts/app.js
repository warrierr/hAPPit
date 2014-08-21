angular.module("HappIT")
	.controller("AppController", ["$scope", "DB", function($scope, DB) {

		$scope.alertText = "";

		// Habit analysis logic
		$scope.habitName = "";
		$scope.habitText = "";

		$scope.setUpModal = function(habit) {
			$scope.habitName = habit.name;
			$scope.habitText = (habit.type === "make") ? "completed " +  habit.name : "not " + habit.name;
		};

		// Events from other parts of the app
		$("body").on("logHabit", function(event, habit) {

			$scope.alertText = (habit.type === "make") ? "Great Job! Keep it up!": "Don't Worry. You Got This!";
			var color = (habit.type === "make") ? "#33AD5C" : "#FF4D4D";

			// Fade in the notification
			$(".main-content-wrap").css({opacity: 0.5});
			$(".log-notification").css("background-color", color);
			$(".log-notification").fadeIn();

			// Fade out the notification
			setTimeout(function() {
				$(".main-content-wrap").css({opacity: 1.0});
				$(".log-notification").fadeOut();
			}, 2000);

		});

		// triggered when you want to see your progress
		$("body").on("analyze-habit", function(event, habit) {
			$scope.setUpModal(habit);
			$("#main-modal").modal("show");
		});

	}]);