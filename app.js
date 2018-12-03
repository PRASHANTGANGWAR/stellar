var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');//pull post content from http request
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('./views'));
//
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(require('express-jquery')('/jquery.js'));
//
//session
var session = require('express-session');
app.use(session({ secret: 'prashant', saveUninitialized: true, resave: true }));
//sssion
app.listen(4200, () => {
    console.log("connected port 4200 wallet api");
})

app.use('/api', require('./api/routes/index.js'));


app.get('/',function(req,res){

    res.send('use other routes');
}); 

