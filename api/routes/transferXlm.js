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





app.get('/transferCoins', async function (req, res) {

    
    //source pub key GDTT75T6PWLP3RHDSVC5JUXGYIOZST4VUXHRGZBGQTR5PYA25R4AKEUT
    var sourceSecretKey = 'SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77';// seed of acc from which tx process
    var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc
    var receiverPublicKey = account2.publicKey;// public key of reciever acc
    receiverPublicKey = 'GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL';
    StellarSdk.Network.useTestNetwork();
    const account = await server.loadAccount(sourcePublicKey)
    var transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.payment({
            destination: receiverPublicKey,
            asset: StellarSdk.Asset.native(),//native asset lumen
            amount: '0.1',
        }))
        .addMemo(StellarSdk.Memo.text('coins sent oktoken'))//optional 
        .build();
    transaction.sign(sourceKeypair);
    const temp = await server.submitTransaction(transaction)
    console.log('submitted', temp._links);
    
});


module.exports = router;
