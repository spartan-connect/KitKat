var schemas = require('../dbfiles/schema.js');
var mongoose = require('mongoose');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('../config/keys');
var User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id
      }).then((existingUser) => {
        if (existingUser) {
          // we already have record
          done(null, existingUser);
        } else {
          var emailArray = profile.emails[0].value.split('@');
          if (emailArray[1] == 'sjsu.edu') {
            new User({
              googleId: profile.id,
              name: profile.displayName,
              firstName: profile._json.given_name,
              lastName: profile._json.family_name,
              pictureLink: profile._json.picture,
              email: profile._json.email,
              bio: "",
              classList: [],
              club: "",
              major: ""
            }).save()
              .then(user => done(null, user));
            console.log(profile);
          } else {
            var user = new User({})
            done(null, user);
          }
        }
      });
    })
);