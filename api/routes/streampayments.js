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




let funding_account = issuer.publicKey // This needs to be a valid account on the network and should return an Account object


app.get('/stream', function (req, res) {
    var okToken = new StellarSdk.Asset(
        assetName, issuerPublicKey);
    console.log('asset issued');




let stream = server.payments()
.forAccount(funding_account)
.cursor('now')
.stream({
    onmessage: function (message) {


      //  console.log(message)
        if ((message.type == "create_account" ) ||(message.type == "payment")) {

            var details ="from:" + message.from +",to:" +message.to + ",amount:" +message.amount;
            console.log(details)
            // Set your own code after we find our create account event
            stream()
        }
    }
})

let stream2 = server.payments()
.forAccount(account2.publicKey)
.cursor('now')
.stream({
    onmessage: function (message) {
        if ((message.type == "create_account") || (message.type == "payment")) {

            var details = "from:" + message.from + ",to:" + message.to + ",amount:" + message.amount;
            console.log(details)
            // Set your own code after we find our create account event
            stream()
        }
    }
})



});





module.exports = router;







// //http://www.erikminkel.com/2018/05/05/streaming-payments-on-stellar/
// var express = require('express');
// var app = express();
// var Stellarbase = require('stellar-base');
// var StellarSdk = require('stellar-sdk');
// var request = require('request');
// StellarSdk.Network.useTestNetwork();


// var mongoose = require('mongoose');
// var url = 'mongodb://localhost:27017/polling-app';
// mongoose.connect(url);
// var tokenSchema = require('./tokenSave.js').collection;


// var server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
// app.listen(8080, () => {
//     console.log("connected port 8080");
// })
// // Set the server


// var issuer = {
//     publicKey: 'GDIW2ZQRGXPMYPMGWQLVRYU5SZKHGAJYY6XUKY246QFS6KHT3O5TFHSH',
//     secret: 'SC6TPXHVWJRX3HICOQYTY3YRXSF46AUVCVKV7OXVEJJYUITJYM2FGVEO'
// };

// var account2 = {
//     publicKey: 'GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL',
//     secret: 'SD2PTAGHCL26U6N4QKCGOQP46RLMZXE7NKDBLQIGCFIGTEM2ZUCF66HF'
// };

// var account3 = {
//     publicKey: 'GDJTLH57XETJ7XYVBRMSUMFGPJY3ODBKHSRL6UHOUYITAZ65AI4TFVRP',
//     secret: 'SANTI7Q2KGWN45J37T2BVQEK4AKWRONJCU5HU5FPC7SCRFXILPG2G66J'
// };

// var account4 = {
//     publicKey: 'GCEJ4OY65J6RAX6JJMOJ4QBZYL3N4YTQNRH477R62L7KFRWSPFGZSDJF',
//     secret: 'SAQHU6DOE3D7TIA4HDAR7SXMBWBXDJUB6SEWJ642K7DSNTG5UEEIDMMM'
// }
