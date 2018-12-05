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


// operation performed by issuer only

app.get('/authaccfalse', function (req, res) {
    try{

    // var receivingKeys = StellarSdk.Keypair
    //     .fromSecret(account3.secret);
    console.log('0')

        var authaccount = account4.publicKey;
     // var receivingKeys = req.body.userSecretKey;
    server.loadAccount(issuingKeys.publicKey())
        .then(function (receiver) {
            console.log('1')
            var transaction = new StellarSdk.TransactionBuilder(receiver)
                // The `changeTrust` operation creates (or alters) a trustline
                // The `limit` parameter below is optional
                .addOperation(StellarSdk.Operation.allowTrust({
                    assetCode: "okToken",
                    trustor: authaccount,
                    authorize:false
                }))
                .build();
            transaction.sign(issuingKeys);
            server.submitTransaction(transaction);
            console.log('authaccfalse');
        })
        
        .catch(function (error) {
            console.error('Error!', error);
        });
    }
    catch (e) {
        console.log("error occured")
    }
});




module.exports = router;
