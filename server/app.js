var express = require('express');
var app = express();
var cors = require('cors');
var routes = require('./routes/routes.js');
var bodyParser = require('body-parser');

/****************************
 * APPLICATION CONFIGURATION
 ***************************/
/**
 * Logger
 * @param req
 * @param res
 * @param next
 */
function logger(req,res,next){
    console.log(new Date(), req.method, req.url);
    next();
}
app.use(logger);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes/Controllers
app.use('/api', routes);


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
