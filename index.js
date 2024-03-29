const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const port = 8000;
const app = express(); 
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const path = require('path');


// Setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('Chat server is listening on port 5000');

//setting sassMiddleware
if(env.name =='development'){
  app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path,'scss'),
    dest:path.join(__dirname, env.asset_path,'css'),
    prefix: '/css',
    debug: true,
    outputStyle: 'extended'
}));
}

app.use(express.urlencoded());

//setting up cookie parser
app.use(cookieParser());

// Using the Static files (assets)
app.use(express.static(env.asset_path));

// Setting up layouts before rendering to routers
app.use(expressLayouts);

// Extracting styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// setting up the express-session middleware
app.use(
    session({
      name: 'codial',
      secret: env.session_cookie_key,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 100,
      },
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://anuragv8269:Tqsg8dnRstsn6MzR@cluster0.gvbrybd.mongodb.net/codial_development', 
      }),
    },
    function (err) {
      console.log(err || 'mongodb setup connected');
    }
  ));
  

//setting up the passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//setting flash 
app.use(flash());
app.use(customMiddleware.setFlash);



// Using express router
app.use('/', require('./routes/index'));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));


app.listen( port, function(err){
    if(err){
        console.log(`Error in connecting to server: ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})