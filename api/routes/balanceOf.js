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




app.get('/balanceOf', function (req, res) {
    var pub = 'GARKTRTXR5P3KT4WW7WHTLU2CNX4JC3RGS5TJGRYSKE4Q3VSX636PS5T';
    // var key = req.body.key;
    var receivingKeys = StellarSdk.Keypair
        .fromSecret('SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D').publicKey();
    // var key = 'GBMRUSV4643UMITVDHADGLZZ5OERT7SKMTI7ZZBVYY3AKPHT2KPNBPBU';
    server.loadAccount(pub).then(function (account) {
        account.balances.forEach(function (balance) {//for each currency balance
            console.log('Type:', balance.asset_code, ', Balance:', balance.balance);
            //to get the currrency with its code balance.asset_code
        });
    });
});



module.exports = router;
