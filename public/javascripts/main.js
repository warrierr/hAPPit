/* Main JS file for the App */
var app = angular.module("HappIT", ["ngRoute"]);

// Configure the app for multiple views
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
	$routeProvider.
		when("/home", {
			templateUrl: "/dashboard",
			controller: "Dashboard"
		}).
		when("/create", {
			templateUrl: "/create",
			controller: "NewHabit"
		}).
		otherwise({
        	redirectTo: "/home"
      	});

	// configure html5 to get links working on jsfiddle
	$locationProvider.html5Mode(true);

}]);