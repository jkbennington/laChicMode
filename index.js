var express = require("express"),
    path = require("path"),
    bodyParser = require("body-parser"),
    session = require("express-session"),
    request = require('request'),
    _ = require("underscore");


var app = express();

var db = require("./models");


app.set('view engine', 'ejs');
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
	res.redirect("/#")
});

app.post(["/users", "/api/signup"], function signup(req, res){
	
	var user = req.body.email;
	var email = user;
	console.log(email)
	var password = req.body.password;
	db.User.createSecure(email, password, function (err, user) {
			if(err){
				res.send(400)
			}
			req.login(user)
			res.redirect("/#")
	});
});

app.post(["/sessions", "/api/login"], function login(req, res){
	var user = req.body.email;
	var email = user;
	var password = req.body.password;
	db.User.authenticate(email, password, function (err, user){
		if(err){
			res.sendStatus(400)
		}else {
			req.login(user);
			res.redirect("/#");
		}
	});
});

app.get(["/search"], function search (req, res){	
	var terms = req.query.search;
	api_key = "3kqfujuiow2nni3pco8gnzbf"; 
	etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=women&category=clothes&tags="+
	terms+"&limit=12&includes=Images:1&api_key="+api_key;
	res.send(etsyURL)


});

app.get("/api/profile", function userShow(req, res){
	var profile = {};
	req.currentUser(function (err, user){
		if(err){
			res.send(400)
		}profile.data = user.favorites
		res.send(profile)
	})
});

app.post('/favorites', function(req, res){
	console.log(req.body);
	if(req.body.name !== undefined){
		req.currentUser(function(err,user){
			var newfav = {
				url: req.body.url
			};
			user.favorites.push(newfav);
			user.save(function(err,success){
				if(err){return console.log(err)}
					console.log("saved");
			})
			
		})
		res.send("okay");
	}
})


app.listen(process.env.PORT || 3000)












