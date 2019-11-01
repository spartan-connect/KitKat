var passport = require('passport');
var alert = require('alert-node');

module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get('/auth/google/callback', passport.authenticate('google', {
            scope: ['profile', 'email']
        }),
        (req, res) => {
            if (req.user.googleId) {
                console.log(req.session);
                res.redirect('/');
            } else {
                console.log('yo');
                console.log(req.session);
                res.redirect('/');
                alert('Please enter sjsu id');
            }

        }
    );

    // app.get('/auth/google/callback', passport.authenticate('google', {
    //     scope: 'https://www.googleapis.com/auth/plus.login'
    // }));



    // app.get(
    //     '/auth/google/callback',
    //     passport.authenticate('google'),
    //     (req, res) => {
    //         res.redirect('/');
    //     }
    // );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user)
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};