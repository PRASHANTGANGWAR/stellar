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








app.get('/checkIsAuthorized', function (req, res) {
    var okTokenCode = 'okToken';
    var accountId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';//to be checked of the user to coins to be send
    server.loadAccount(accountId).then(function (account) {
        var trusted = account.balances.some(function (balance) {
            return balance.asset_code === okTokenCode &&
                balance.asset_issuer === issuerPublicKey;
        });
        console.log(trusted ? 'Trusted user' : 'Not trusted ');
        res.send(trusted ? 'Trusted user' : 'Not trusted ')
    });
});




module.exports = router;
