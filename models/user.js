var mongoose = require("mongoose"),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt');

var Favorite = new Schema({
	favorite: String     
});

var UserSchema = new Schema({
	email: {type:String, required: true},
	passwordDigest: {type: String, required: true},
	favorites: [Favorite],
	createdAt: {type: Date, default: Date.now()}
});


UserSchema.statics.createSecure = function (email, password, cb) {
	var _this = this;
	bcrypt.genSalt(function (err, salt){
		bcrypt.hash(password, salt, function (err, hash){
			var user = {
				email: email,
				passwordDigest: hash
			};
			_this.create(user, cb);
		});
	});
};

UserSchema.statics.authenticate = function (email, password, cb){
	this.findOne({email:email}, function (err, user){
		if (user === null){
			cb("Email does not exist.")
		}else if (user.checkPassword(password)){
			cb(null, user);
		} else {
			cb("Password incorrect", user)
		}
	});
};

UserSchema.methods.checkPassword = function(password){
	return bcrypt.compareSync(password, this.passwordDigest);
}

var User = mongoose.model('User', UserSchema);

module.exports = User;





















