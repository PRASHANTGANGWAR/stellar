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





app.get('/burn', async function (req, res) {
    var secretKey = req.body.secretKey;
    var burn = onlyOwner(secretKey);
    if (burn) {
        var amount = req.body.amount;
        var sourceSecretKey = req.body.sourceSecretKey;
        var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
        var sourcePublicKey = sourceKeypair.publicKey();
        var receiverPublicKey = issuerPublicKey;
        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        StellarSdk.Network.useTestNetwork();
        const account = await server.loadAccount(sourcePublicKey)
        var transaction = new StellarSdk.TransactionBuilder(account)
            .addOperation(StellarSdk.Operation.payment({
                destination: receiverPublicKey,
                asset: okToken,
                amount: amount,
            }))
            .addMemo(StellarSdk.Memo.text('token burned(burning reference no.)'))
            .build();
        transaction.sign(sourceKeypair);
        const temp = await server.submitTransaction(transaction)
        console.log('submitted', temp._links);
    }
});



module.exports = router;
