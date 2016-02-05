'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const ghConfig = require('./secret/oauth-github.json');
ghConfig.callbackURL = 'http://localhost:8080/signin/github/callback';

const ghStrategy = new GitHubStrategy(ghConfig, (accessToken, refreshToken, profile, done) => {
    console.log('Authentication Successful!');
    done(null, profile);
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(session({
    secret: 'lol',
    resave: false,
    saveUninitialized: false,
    store: new RedisStore()
}));

passport.use(ghStrategy);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    console.log('here mutha fucka')
    done(null, user)
})

app.use(passport.initialize());
app.use(passport.session());

app.get('/signin/github', passport.authenticate('github'));
app.get('/signin/github/callback', passport.authenticate('github'),
    (req, res) => {
        console.log(req.user);
        res.redirect('/secure.html');
    });

app.get('/signout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.use(express.static(__dirname + '/static/public'));

//app.use((req, res, next) => {
//    if (req.isAuthenticated()) {
//        next()
//    } else {
//
//    }
//})
app.get('/api/v1/users/me', () => {
    //req.user is your current user
    res.json(req.user);
})

app.use(express.static(__dirname + '/static/secure'));

app.listen(8080, () => {
    console.log('server is listening on port 80');
})
