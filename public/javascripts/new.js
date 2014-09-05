angular.module("HappIT")
	.controller("NewHabit", ["$scope", "DB", "$routeParams", "$location", function($scope, DB, $routeParams, $location) {

		// The new habit
		$scope.newHabit = {};
		$scope.newHabit.type = $routeParams.type;
		$scope.createIndex = 0;

		// Autocomplete stuff
		$scope.matchedFriends = [];
		$scope.choosenFriends = 
		[
			{name: "John Frazier", img: "/images/fraz.jpg"}, 
			{name: "Eric Tilson", img: "/images/eric.jpg"},
			{name: "Sean Marinelli", img: "/images/sean.jpg"}
		];


		// Validate the new habit
		$scope.validateHabit = function() {
			var n = $scope.newHabit;
			if(!(n.name)) {
				return false
			} else if (isNaN(n.numADay) || parseInt(n.numADay) <= 0) {
				return false;
			} else if (isNaN(n.numDays) || parseInt(n.numDays) <= 0) {
				return false;
			}
			return true;
		}

		// Create the new habit
		$scope.createHabit = function() {
				$scope.newHabit.startTime = Date.now();
				$scope.newHabit.numADay = parseInt($scope.newHabit.numADay);
				DB.createHabit($scope.newHabit);
				$location.path("/home");
		};


		// Find friends that match a given string
		$scope.findMatchingFriends = function() {
			var val = $(".find-friends").val();
			$scope.matchedFriends = DB.matchFriends(val);
		};


		// Check when you type friends names
		$(".find-friends").keyup(function() {
			$scope.findMatchingFriends();
		});

		setTimeout(function() {

			// Select friend for challenge
			$(".friend-choosen").on("click", function() {
				if($(this).css("background-color") === "rgb(215, 215, 219)") {
					$(this).css("background-color", "rgb(255, 255, 255)");
				} else {
					$(this).css("background-color", "rgb(215, 215, 219)");
				}
			});
		}	, 1000)

		// Functions for showing different parts of the creation process
		$scope.showType = function() {
			return $scope.createIndex === 0;
		};

		$scope.showBreak = function() {
			return $scope.createIndex === 1 && $scope.newHabit.type === "break";
		};

		$scope.showMake = function() {
			return $scope.createIndex === 1 && $scope.newHabit.type === "make";
		};

		$scope.showFriends = function() {
			return $scope.createIndex === 2;
		};

		$scope.showStakes = function() {
			return $scope.createIndex === 3;
		};

		// Advancing the creation process
		$scope.newMake = function() {
			$scope.newHabit.type = "make";
			$scope.createIndex++;
		};

		$scope.newBreak = function() {
			$scope.newHabit.type = "break";
			$scope.createIndex++;
		};

		$scope.chooseFriends = function() {
			if($scope.validateHabit()) {
				$scope.createIndex++;
			} else {
				alert("Please fill out all the fields correctly!");
			}
		};

		$scope.chooseStakes = function() {
			$scope.createIndex++;

		};


	}]);