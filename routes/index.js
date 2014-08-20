module.exports = function(app) {

	/* GET home page. */
	app.get('/', function(req, res) {
	  res.render('index', { title: 'hAPPit - Home' });
	});

	/* Dashboard for the main app */
	app.get("/home", function(req,res) {
		res.render('app', { title: 'hAPPit - Dashboard' });
	});

}