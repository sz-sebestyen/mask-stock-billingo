const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
	passport.use(
		new localStrategy((username, password, done) => {
			User.findOne({ username: username }, (err, user) => {
				if (err) throw err;
				if (!user) return done(null, false);
				bcrypt.compare(password, user.password, (err, res) => {
					if (err) throw err;
					if (res) return done(null, user);
					else return done(null, false);
				});
			});
		})
	);

	//stores a cookie inside the browser
	passport.serializeUser((user, cb) => {
		cb(null, user.id);
	});

	passport.deserializeUser((id, cb) => {
		User.findOne({ _id: id }, (err, user) => {
			// cb(err, user);  	//password nem kell vissza
			const userInfo = {
				username: user.username,
			};
			cb(err, userInfo);
		});
	});
};
