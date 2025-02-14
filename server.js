const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongodb = require('./data/database');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json()) // install body-parser 'npm i body-parser'
    .use(session({ 
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL})
        }))
    .use(passport.initialize())  
    .use(passport.session())
    .use((req, res, next) => { // routes will work across different sites
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
    .use(cors({ methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PUT', 'PATCH' ]}))
    .use(cors({ origin: '*' }))
    .use('/', require('./routes/index.js'));


    passport.use(new GitHubStrategy({   
        clientID: process.env.GITHUB_CLEINT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }

));

console.log("This client ID: ", clientID);

passport.serializeUser((user, done) => {
    done(null, user);
});


passport.deserializeUser((user, done) => {
    done(null, user);
});


app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out!")});


app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
});


mongodb.initDB((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
    }
});


// app.listen(port, () => {console.log(`Server is running on port ${port}`)});