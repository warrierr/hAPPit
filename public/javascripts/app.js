angular.module("HappIT")
	.controller("AppController", ["$scope", "DB", function($scope, DB) {

		$scope.alertText = "";

		// Habit analysis logic
		$scope.habitName = "";
		$scope.habitText = "";
		$scope.timeText = "";

		$scope.setUpModal = function(habit) {
			$scope.habitName = habit.name;
			$scope.habitText = (habit.type === "make") ? "completed " +  habit.name : "not done " + habit.name;
			$scope.setTimeText(habit);
		};

		// See how many days in a row the habit has been kept up
		$scope.setTimeText = function(habit) {
			var id = habit.name;
			var type = habit.type;
			var events;

			if (type === "make") {
				events = DB.getHabitSuccesses(id);
			} else {
				events = DB.getHabitMistakes(id);
			}

			var curr = Date.now() - 86400000; // start previous day
			var count = 0;

			for(var i=events.length - 1; i>=0; i--) {
				if($scope.areSameDay(curr, events[i].now)) {
					count++;
					curr -= 86400000; // go to next day
				} else if (events[i].now > curr){
					if(i === events.length - 1) count++; // if today is already done
					continue;
				} else {
					break;
				}
			}

			
			$scope.timeText = count + " Days"

		};


		$scope.areSameDay = function(milli1, milli2) {
			var a = new Date(milli1);
			var b = new Date(milli2);
			return (a.getFullYear() === b.getFullYear()) && 
				(a.getMonth() === b.getMonth()) && 
				(a.getDate() === b.getDate());
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