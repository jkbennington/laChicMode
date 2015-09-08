var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    session = require("express-session"),

    _ = require("underscore");


var app = express();

var db = require("./models");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use("/vendor", express.static("bower_components"));


var views = path.join(process.cwd(), "views");


app.get("/", function (req, res){
	res.sendFile(path.join(views, 'index.html'));
});

app.use(
	session({
		secret: 'secret-key',
		resave: false,
		saveUninitialized: true
	})
);

app.use(function(req,res,next){
	req.login = function (user) {
		req.session.userId = user._id;
	};
	req.currentUser = function(cb) {
		db.User.findOne({_id:req.session.userId}, function (err, user){
			req.user = user;
			cb(null, user);
		})
	};
	req.logout = function () {
		req.session.userId = null;
		req.user = null;
	}
	next();
})

app.get("/api/logout", function (req, res){
	req.logout();
	res.send(200);
});

app.post(["/users", "/api/signup"], function signup(req, res){
	
	var user = req.body.email;
	console.log(user)
	var email = user.email;
	console.log(email)
	var password = user.password;
	db.User.createSecure(email, password, function() {
		db.User.authenticate(email, password, function (err, user){
			req.login(user);
			res.send(200);
		});
	});
});

app.post(["/sessions", "/api/login"], function login(req, res){
	var user = req.body.user;
	var email = user.email;
	var password = user.password;
	db.User.authenticate(email, password, function (err, user){
		if(err){
			res.send(400)
		}else {
			req.login(user);
			res.send(200);
		}
	});
});

app.get("/profile", function userShow(req, res){
	req.currentUser(function (err, user){
		res.send("Hello" + user.email);
	});
});


app.listen(3000, function(){
	console.log("Listening on port 3000.")
});












