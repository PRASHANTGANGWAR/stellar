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







app.get('/changetrustline', function (req, res) {// change trustline and make tx
    var issuingKeys = StellarSdk.Keypair
        .fromSecret(issuerSecretKey);
    var receivingKeys = StellarSdk.Keypair
        .fromSecret('SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D');
    // var receivingKeys = req.body.userSecretKey;
    server.loadAccount(receivingKeys.publicKey())
        .then(function (receiver) {
            var transaction = new StellarSdk.TransactionBuilder(receiver)
                // The `changeTrust` operation creates (or alters) a trustline
                // The `limit` parameter below is optional
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: okToken,
                    limit: '1000'
                }))
                .build();
            transaction.sign(receivingKeys);
            server.submitTransaction(transaction);
            console.log('changetrustline');
        })
        .catch(function (error) {
            console.error('Error!', error);
        });
});





module.exports = router;
