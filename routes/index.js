module.exports = function(app) {

	/* GET home page. */
	app.get('/', function(req, res) {
	  res.render('index', { title: 'HappIT - Home' });
	});

	/* Dashboard for the main app */
	app.get("/home", function(req,res) {
		res.render('app', { title: 'HappIT - Dashboard' });
	});

	app.get("/create", function(req, res) {
		res.render("create");
	});

	app.get("/newhabit/:type", function(req, res) {
		console.log(req.params.type);
		if(req.params.type === "make") {
			res.render("newmake");
		} else {
			res.render("newbreak");
		}
	});

	app.get("/dashboard", function(req, res) {
		res.render("dashboard");
	});

}