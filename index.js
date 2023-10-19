const express = require('express');
const port = 8000;
const app = express(); 
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

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


// Using express router
app.use('/', require('./routes/index'));


// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen( port, function(err){
    if(err){
        console.log(`Error in connecting to server: ${err}`);
    }

    console.log(`Server is up and running on port ${port}`);
})