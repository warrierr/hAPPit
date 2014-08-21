/* Shared data for this non-persistant app */
var app = angular.module("HappIT");

app.factory("DB", function() {

	var data = {};

	// Set the initial data collections
	data.habits = [];
	data.mistakes = [];
	data.successes = [];
	data.feedback = [];
	data.archived = [];

	return {

		// Habits
		getHabits: function() {
			return data.habits;
		},
		hasHabits: function() {
			return data.habits.length > 0;
		},
		createHabit: function(habit) {
			data.habits.unshift(habit);
		},

		// Mistakes
		getMistakes: function() {
			return data.mistakes;
		},
		createMistake: function(mistake) {
			data.mistakes.push(mistake);
		},

		// Successes
		getSuccesses: function() {
			return data.successes;
		},
		createSuccess: function(success) {
			data.successes.push(success);
		},

		// Feedback
		getFeedback: function() {
			return data.feedback;
		},
		createFeedback: function(feedback) {
			data.habits.push(feedback);
		}
	};

});