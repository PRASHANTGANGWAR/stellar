var express = require('express');
var app = express();
var StellarSdk = require('stellar-sdk');
var request = require('request');
StellarSdk.Network.useTestNetwork();
var router = express.Router();

var bodyParser = require('body-parser');//pull post content from http request
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('./views'));
//app.use(bodyParser());
app.use(bodyParser.json());

var session = require('express-session');
var cookieParser = require('cookie-parser')

app.use(cookieParser('secret'))
app.use(session({ secret: 'prashant', saveUninitialized: true, resave: true, cookie: { maxAge: 30000 } }));

var urlString = 'http://crypto-testnets.sofodev.co:8000';
var server = new StellarSdk.Server(urlString, { allowHttp: true });



//working
app.get('/getDetailTxHashUsingHash', function (req, res) {
    // var hash = req.body.hash;
     var hash ='1f0a902aceb371d578fb37336429fc3b01c9fb38038dac741a9668ae57aa3441';
     var url = 'https://horizon-testnet.stellar.org/transactions/' + hash +'/operations';
     console.log(url);
 
     request.get({
         url: url,
         json: true
     }, function (error, response, body) {
         if (error || response.statusCode !== 200) {
             console.error('ERROR!', error || body);
         }
         else {
             console.log("hellllllo", response.body);
             res.send(response.body);
          
         }
     });
 });


//  app.post('/getDetailTxHash', function (req, res) {
//     var hash = req.body.hash;

//     var url = 'https://horizon-testnet.stellar.org/transactions/' + hash;
//     console.log(url);

//     request.get({
//         url: url,
//         json: true
//     }, function (error, response, body) {
//         if (error || response.statusCode !== 200) {
//             console.error('ERROR!', error || body);
//         }
//         else {
//             console.log(response.body.source_account);
//             //res.send(response.body.paging_token);
//             //    var url = 'https://horizon-testnet.stellar.org/transactions/' + hash;
//             //    var paging_token =response.body.paging_token;
//             //  console.log('hello',url+'?'+response.body.paging_token+'order=desc&limit=2');


//             var urll = 'https://horizon-testnet.stellar.org/accounts/' + response.body.source_account + '/operations?order=desc&limit=200';
//             console.log(urll);
//             request.get({
//                 url: urll,
//                 json: true
//             }, function (error, response, body) {
//                 if (error || response.statusCode !== 200) {
//                     console.error('ERROR!', error || body);
//                 }
//                 else {
//                     //console.log(response.body);
//                     var resp = response.body._embedded.records;
//                     var count = 0;
//                     for (val of resp) {
                        
//                        if(val.transaction_hash== hash){                        
//                           console.log(resp[count]);  
//                         }
//                         count++;
//                     }                   
//                 }
//             });

//         }
//     });
// });

module.exports = router;
