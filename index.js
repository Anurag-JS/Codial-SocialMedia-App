const express = require('express');
const port = 8000;
const app = express(); 
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

//setting sassMiddleware
app.use(sassMiddleware({
    src: '/assets/sass',
    dest: '/assets/css',
    prefix: '/css',
    debug: true,
    outputStyle: 'extended'
}));

app.use(express.urlencoded());

//setting up cookie parser
app.use(cookieParser());

// Using the Static files (assets)
app.use(express.static('./assets'));

// Setting up layouts before rendering to routers
app.use(expressLayouts);

// Extracting styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// setting up the express-session middleware
app.use(session({
    name: 'codial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },
    function (err){
        console.log(err || 'mongodb setup connected');
    })
}));

//setting up the passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Using express router
app.use('/', require('./routes/index'));


app.listen( port, function(err){
    if(err){
        console.log(`Error in connecting to server: ${err}`);
    }

    console.log(`Server is up and running on port ${port}`);
})