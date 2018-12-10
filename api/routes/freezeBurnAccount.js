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



const fs = require('fs').promises
var Stellarbase = require('stellar-base');
var Stellar = require('stellar-sdk');
Stellar.Network.useTestNetwork();



var server = new Stellar.Server('https://horizon-testnet.stellar.org')


const escrowPair = {
    secretSeed: 'SDXYWCBV2CJTY57H5ER2UOGXP53ZXQ3OKLTH7C45DKFAUDSXHQDJKUH6',
    publicKey:'GCASTYPLINKAMGMYJNGJD4UYMUSADCNST25R2AEFA62HKU5LDILK2V72'
}
const pairA= {
    secretSeed: 'SBC7VQRISSJ2R3LBLD3F5SENBQMCJU5WFUNKEVFVDGKF7C6VPLXN7GSK',
    publicKey:'GCYE4IHMQXRN6XTLWHF6GUNYRCIU4YJLPOBIC72NUFHC77RWAHNSJ3DY'
}
const pairB = {
    secretSeed: 'SBBFXTY6PE23AAVA3VKW64DKEUILTY6YCKVZ4R5GI6AGD7JDIKPNH2HR',
    publicKey:'GB3SHJ3P4O4THIIO5TOYGPDY3OLDVQ2RDNY2SGMILGSQFGJD5DJBCCKW'
}

const setEscrowMultisig = async () => {

    const escrowKeyPair = Stellar.Keypair.fromSecret(escrowPair.secretSeed)

    const escrowAccount = await server.loadAccount(escrowPair.publicKey)

    const thresholds = {
        masterWeight: 0, // Escrow account has a weight of 0, no rights :)
        lowThreshold: 1,
        medThreshold: 2, // payment is medium threshold
        highThreshold: 2,
    }

    let transaction = new Stellar.TransactionBuilder(escrowAccount)
        .addOperation(Stellar.Operation.setOptions(thresholds))
        .build()

    transaction.sign(escrowKeyPair)

    await server.submitTransaction(transaction)

}

setEscrowMultisig()
    .then(() => { console.log('ok') })
    .catch((e) => { console.error(e); throw e})




module.exports = router;
