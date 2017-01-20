var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require("http"),
    qlikAuth = require('qlik-auth'),
    passport = require("passport"),
    TelegramStrategy = require("passport-telegram").Strategy;

var settings = {};
var arg = process.argv.slice(2);

arg.forEach( function(a) {
    var key = a.split("=");
    switch( key[0] ) {
      case "user_directory":
        settings.directory = key[1];
        break;
      case "client_id":
        settings.client_id = key[1];
        break;
      case "client_secret":
        settings.client_secret = key[1];
        break;
      case "auth_port":
        settings.port = key[1];
        break;
  }
} );

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete Telegram profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
    new TelegramStrategy({
        clientID: settings.client_id,
        clientSecret: settings.client_secret,
        callbackURL: 'http://ukwin-aor-w10.qliktech.com:9999/oauth2callback'
    },
    function(accessToken, refreshToken, profile, done) {
       // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Telegram profile is returned
            // to represent the logged-in user.  In a typical application, you would
            // want to associate the Telegram account with a user record in your
            // database, and return that user instead.
            return done(null, profile);
        });
    }
));
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function ( req, res ) {
    //Init sense auth module
    qlikAuth.init(req, res);
    //Redirect to telepass.me
    res.redirect('/login');
});

app.get('/login', passport.authenticate('telegram'), function (req, res) {
    // The request will be redirected to telepass.me for authentication, so this
    // function won't be called.
});

app.get('/oauth2callback', passport.authenticate('telegram', { failureRedirect: '/' }), function (req, res) {
    var user = req.user;
    qlikAuth.requestTicket( req, res, {
        'UserDirectory': settings.directory,
        'UserId': user.id,
        'Attributes': []
    });
});


//Server application
var server = http.createServer( app );
server.listen( settings.port );
