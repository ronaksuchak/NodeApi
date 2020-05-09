const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

//set up express
const app = express();

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;


app.use(bodyparser.json());

// listion for req.
app.use('/api',require('./routes/api'));
app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
});

app.listen(process.env.port || 4000, function () {
    console.log("Listing for req. ")
});

