const express = require('express');
const port = 8000;

const app = express(); 

// Using express router
app.use('/', require('./routes/index'));

app.listen( port, function(err){
    if(err){
        console.log(`Error in connecting to server: ${err}`);
    }

    console.log(`Server is up and running on port ${port}`);
})