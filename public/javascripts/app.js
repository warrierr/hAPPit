/* Main JS file for the App */
var app = angular.module("HappIT", ["ngRoute"]);

// Configure the app for multiple views
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
	$routeProvider.
		when("/home", {
			templateUrl: "/create"
		}).
		when("/create", {
			templateUrl: "/create"
		}).
		when("/newhabit/:type", {
			templateUrl: function(params) {
				return "/newhabit/"+params.type;
			},
			controller: "NewHabit"
		}).
		when("/dash",  {
			templateUrl: "/dashboard",
			controller: "Dashboard"
		}).
		otherwise({
        	redirectTo: "/home"
      	});

	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);

}]);

app.controller("AppController", ["$scope", function($scope) {
	$scope.alertText = "";


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

}]);