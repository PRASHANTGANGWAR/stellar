var express = require('express');
var app = express();
var Stellarbase = require('stellar-base');
var StellarSdk = require('stellar-sdk');
var request = require('request');
StellarSdk.Network.useTestNetwork();


var mongoose = require('mongoose');
var urlDb = 'mongodb://localhost:27017/stellar';
mongoose.connect(urlDb);
var tokenSchema = require('./tokenSave.js').collection;
var transactionSchema = require('./transactionSave.js').collection;
var loadAccount1 = require('./t-loadAccount.js').collection;


//var url = 'https://horizon-testnet.stellar.org';
var url = 'http://crypto-testnets.sofodev.co:8000';

var server = new StellarSdk.Server('http://crypto-testnets.sofodev.co:8000', { allowHttp: true })
app.listen(8081, () => {
    console.log("connected port 8081");
})


var issuer = {
    publicKey: 'GDIW2ZQRGXPMYPMGWQLVRYU5SZKHGAJYY6XUKY246QFS6KHT3O5TFHSH',
    secret: 'SC6TPXHVWJRX3HICOQYTY3YRXSF46AUVCVKV7OXVEJJYUITJYM2FGVEO'
};

var account2 = {
    publicKey: 'GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL',
    secret: 'SD2PTAGHCL26U6N4QKCGOQP46RLMZXE7NKDBLQIGCFIGTEM2ZUCF66HF'
};

var account3 = {
    publicKey: 'GDJTLH57XETJ7XYVBRMSUMFGPJY3ODBKHSRL6UHOUYITAZ65AI4TFVRP',
    secret: 'SANTI7Q2KGWN45J37T2BVQEK4AKWRONJCU5HU5FPC7SCRFXILPG2G66J'
};

var account4 = {
    publicKey: 'GCEJ4OY65J6RAX6JJMOJ4QBZYL3N4YTQNRH477R62L7KFRWSPFGZSDJF',
    secret: 'SAQHU6DOE3D7TIA4HDAR7SXMBWBXDJUB6SEWJ642K7DSNTG5UEEIDMMM'
}


// var WebSocket = require('ws');
// var ws = new WebSocket('ws://horizon-testnet.stellar.org:9001');
// ws.on('open', function() {
//     console.log('ws connected');
//   });

var totalSupply = 100000;
var initialSupply = 50000; //50%

var issuerSecretKey = 'SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77';//Entities that issue assets are called anchors.
var issuerPublicKey = 'GDTT75T6PWLP3RHDSVC5JUXGYIOZST4VUXHRGZBGQTR5PYA25R4AKEUT';
var assetName = 'okToken';
var okToken = new StellarSdk.Asset(
    assetName, issuerPublicKey);
var issuingKeys = StellarSdk.Keypair
    .fromSecret(issuerSecretKey);

//issue new asset ,
app.get('/issueAsset', function (req, res) {
    var okToken = new StellarSdk.Asset(
        assetName, issuerPublicKey);
    console.log('asset issued');
});

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

//allow trust  i for kyc process
//Operation.allowTrust

app.get('/createAccount', function (req, res) {
    var pair = Stellarsdk.Keypair.random();
    var publickey = pair.publicKey();
    var secretkey = pair.secret();
    console.log(publickey);
    console.log(secretkey);
});

app.get('/transferCoins', async function (req, res) {

    sourceSecretKey1 = 'SCP43KZCMQHEVUZLRHJPNGMSI7OIX2QNCMFNCBRJ4DTOQVSP2S4UQGB6';


    sourceSecretKey2 = 'SAIIPKKAWHI34J6KJ6QJOKM6NRTRRGTZHQ5HNSDMEOD76YYHNBC4JXXX';

    sourceSecretKey3 = 'SB4GZVTUFSOA57EG5MWB5OIS4KM7Y3V5CDENPOUTQ3DRWAPGNBOXJMDQ';


    sourceSecretKey4 = 'SCH6KCHFRLMIJ2UM2OKHGE7QY65YKPH3IXFIZZA3WJ2CFIPXY7RCWXBG';

    var arr = ['SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77', 'SCP43KZCMQHEVUZLRHJPNGMSI7OIX2QNCMFNCBRJ4DTOQVSP2S4UQGB6', 'SAIIPKKAWHI34J6KJ6QJOKM6NRTRRGTZHQ5HNSDMEOD76YYHNBC4JXXX', 'SB4GZVTUFSOA57EG5MWB5OIS4KM7Y3V5CDENPOUTQ3DRWAPGNBOXJMDQ', 'SCH6KCHFRLMIJ2UM2OKHGE7QY65YKPH3IXFIZZA3WJ2CFIPXY7RCWXBG'];
    var t1 = Date.now();
    console.log(t1);

    //source pub key GDTT75T6PWLP3RHDSVC5JUXGYIOZST4VUXHRGZBGQTR5PYA25R4AKEUT
    var sourceSecretKey = 'SC6TPXHVWJRX3HICOQYTY3YRXSF46AUVCVKV7OXVEJJYUITJYM2FGVEO';// seed of acc from which tx process
    var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc
    var receiverPublicKey = account2.publicKey;// public key of reciever acc
    receiverPublicKey = 'GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL';
    var server = new StellarSdk.Server(url);//live netwrk
    StellarSdk.Network.useTestNetwork();
    const account = await server.loadAccount(sourcePublicKey)
    var transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.payment({
            destination: 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5',
            asset: okToken,//native asset lumen
            amount: '100',
        }))
        .addMemo(StellarSdk.Memo.text('coins sent oktoken'))//optional 
        .build();
    transaction.sign(sourceKeypair);
    const temp = await server.submitTransaction(transaction)
    console.log('submitted', temp._links);
    //    .then(async function (account) {
    //        console.log('sequence no. of acc before', account.sequence)
    //        // console.log(account);
    //        var transaction = new StellarSdk.TransactionBuilder(account)
    //            .addOperation(StellarSdk.Operation.payment({
    //                destination: receiverPublicKey,
    //                asset: StellarSdk.Asset.native(),//native asset lumen
    //                amount: '0.999',
    //            }))
    //            .addMemo(StellarSdk.Memo.text('coins sent oktoken'))//optional 
    //            .build();
    //        // Sign this transaction with the secret key
    //        transaction.sign(sourceKeypair);
    //        // Let's see the XDR (encoded in base64) of the transaction we just built
    //        console.log(transaction.toEnvelope().toXDR('base64'));
    //        console.log('TX DONE 1');
    //        // Submitng the transaction to the Horizon server. The Horizon server will then do his work
    //        const temp = await server.submitTransaction(transaction)
    //           console.log('submitted',temp._links);
    //    })
    //    .catch(function (e) {
    //        console.error(e);
    //    });

});


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



app.get('/issueassetandtx', function (req, res) {
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server(url);
    // Keys for accounts to issue and receive the new asset
    var issuingKeys = StellarSdk.Keypair
        .fromSecret('SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77');
    var receivingKeys = StellarSdk.Keypair
        // .fromSecret('SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D');
        .fromSecret('SC6ORTR65DYEUJWGA7MBEZWW5X3RHAADPWFYWLU57IDM43Q5ZEV5KJT7');
    // Create an object to represent the new asset
    var okToken = new StellarSdk.Asset(assetName, issuingKeys.publicKey());
    console.log('1');
    // First, the receiving account must trust the asset
    server.loadAccount(receivingKeys.publicKey())  // If the account is not found, surface a nicer error message for logging.
        .then(function (receiver) {
            console.log('2');
            var transaction = new StellarSdk.TransactionBuilder(receiver)
                // The `changeTrust` operation creates (or alters) a trustline
                // The `limit` parameter below is optional
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: okToken,
                    limit: '1000'
                }))
                .build();
            transaction.sign(receivingKeys);
            console.log('3');
            return server.submitTransaction(transaction);
        })
        // Second, the issuing account actually sends a payment using the asset
        .then(function () {
            return server.loadAccount(issuingKeys.publicKey())
        })
        .then(function (issuer) {
            var transaction = new StellarSdk.TransactionBuilder(issuer)
                .addOperation(StellarSdk.Operation.payment({
                    destination: receivingKeys.publicKey(),
                    asset: okToken,
                    amount: '10'
                }))
                .build();
            transaction.sign(issuingKeys);
            console.log('done TX');
            return server.submitTransaction(transaction);
        })
        .catch(function (error) {
            console.error('Error!', error);
        });
})


app.get('/test', function (req, res) {
    var payments = server.payments().forAccount('GBD7K2CYHPRZ5DSOXFR65OE6ODERY4D3ZLRK3RMJNXQ73LWPG35ABLXB');
    console.log("hell", payments);

});

// app.get('/stream', function (req, res) {
async function stream() {
    var accountId = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
    var payments = server.payments().forAccount(accountId);
    console.log('in stream');
    // If some payments have already been handled, start the results from the
    // last seen payment. (See below in `handlePayment` where it gets saved.)
    var lastToken = await loadLastPagingToken(); // to knoe the token of last processed page
    //  console.log('outside if',lastToken)
    if (lastToken) {
        payments.cursor(lastToken);
        console.log('helllo lasttoken', lastToken.length);
    }

    // `stream` will send each recorded payment, one by one, then keep the
    // connection open and continue to send you new payments as they occur.
    payments.stream({
        onmessage: function (payment) {
            // Record the paging token so we can start from here next time.
            //message.account == app.contract.public_key
            savePagingToken(payment.paging_token);
            // The payments stream includes both sent and received payments. We only
            // want to process received payments here.
            if (payment.to !== accountId) {// only recieved payment 
                return;
            }
            // In Stellar’s API, Lumens are referred to as the “native” type. Other
            // asset types have more detailed information.
            var asset;
            if (payment.asset_type === 'native') {
                asset = 'lumens';
            }
            else {
                asset = payment.asset_code + ':' + payment.asset_issuer;
            }
            console.log(payment.amount + ' ' + asset + ' from ' + payment.from);
        },
        onerror: function (error) { console.error('Error in payment stream'); }
    });

    async function savePagingToken(token) {
        console.log(token);// save the 
        // save in local db and excess it next time
        // In most cases, you should save this to a local database or file so that
        // you can load it next time you stream new payments.
        await tokenSchema.updateOne({ token: 1299124527837185 }, { $set: { token: token } });
    }

    async function loadLastPagingToken() {

        var token = await tokenSchema.find().toArray();
        console.log('lastpaging token', token);
        // var x = '1521419150168065';//get last pagingtoken from the databsase 
        //and transaction after this last token will be shown only in stream
        return token;
        // Get the last paging token from a local database or file
    }
}
// });


app.get('/mint', function (req, res) {

});






//can send once test lumens to any acc.
app.get('/bottoacccfundtransfer', function (req, res) {
    // var sourceSecretKey ='SC6ORTR65DYEUJWGA7MBEZWW5X3RHAADPWFYWLU57IDM43Q5ZEV5KJT7';
    // var pair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = 'GBWJO2BAG5YQCKY363M7XR5QNH6JDJQUHTQ7TCFQQKPKQPAEL5RCEBUA';
    request.get({
        url: 'https://friendbot.stellar.org',//frndbot
        qs: { addr: sourcePublicKey },
        json: true
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            // console.error(url + qs);
            console.error('ERROR!', error || body);
        }
        else {
            console.log('SUCCESS! You have a new account :)\n');
            var server = new StellarSdk.Server(url);//config server
            // the JS SDK uses promises for most actions, such as retrieving an account
            server.loadAccount(pair.publicKey()).then(function (account) {
                console.log('Balances for account: pub ' + pair.publicKey());
                console.log('Balances for account: secret key ' + pair.secret());
                account.balances.forEach(function (balance) {
                    console.log('Type:', balance.asset_type, ', Balance:', balance.balance);// more asset type -ASSET_TYPE_CREDIT_ALPHANUM4)    
                    // console.log("  Address: " + pair.address());
                    // console.log("  Seed: " + pair.seed());
                });
            });
        }
    });

});


app.get('redemption', function (req, res) {

    var currentGoldRate = 1000; //get from external source
    var storageCost = 1;//1% of total amt
    var marketPrice = 1000// derived from Speculation
})



app.get('/makeOffer', function (req, res) {

    // GBD7K2CYHPRZ5DSOXFR65OE6ODERY4D3ZLRK3RMJNXQ73LWPG35ABLXB
    // SB4XJW2D4SOES3BNKMXMMC4U4PZBAE6MKOT4T3RTI2VF6MQWZ223DY2B

    var okToken = new StellarSdk.Asset(
        assetName, issuerPublicKey);
    // var offererSecretKey = req.key.offererSecretKey;
    var offererSecretKey = 'SB4XJW2D4SOES3BNKMXMMC4U4PZBAE6MKOT4T3RTI2VF6MQWZ223DY2B';
    var Keypair = StellarSdk.Keypair.fromSecret(offererSecretKey);
    console.log('1');
    server.loadAccount(Keypair.publicKey())
        .then(function (account) {
            console.log('2');

            var transaction = new StellarSdk.TransactionBuilder(account)
                .addOperation(StellarSdk.Operation.manageOffer({
                    selling: okToken,//asset
                    buying: StellarSdk.Asset.native(),
                    amount: 40,
                    price: 2,
                    offerId: 0,
                }))
                .build();
            transaction.sign(Keypair);
            //console.log(transaction.toEnvelope().toXDR('base64'));

            server.submitTransaction(transaction)
                .then(function (transactionResult) {
                    //console.log(JSOn.stringify(transactionResult));
                    console.log('\n Success!')
                })
                .catch(function (err) {
                    console.log('An error has occured');
                    console.log(err);
                })
        })
        .catch(function (e) {
            console.log(e);
        })
});

app.get('/setHomeDomain', function (req, res) {
    var StellarSdk = require('stellar-sdk');
    StellarSdk.Network.useTestNetwork();
    var server = new StellarSdk.Server(url);
    // Keys for issuing account
    var issuingKeys = StellarSdk.Keypair
        .fromSecret(issuerSecretKey);

    server.loadAccount(issuingKeys.publicKey())
        .then(function (issuer) {
            var transaction = new StellarSdk.TransactionBuilder(issuer)
                .addOperation(StellarSdk.Operation.setOptions({
                    homeDomain: 'oktoken.com',//set the homedomain
                }))
                .build();
            transaction.sign(issuingKeys);
            return server.submitTransaction(transaction);
        })
        .catch(function (error) {
            console.error('Error!', error);
        });
});


app.get('/auth', function (req, res) {
    StellarSdk.Network.useTestNetwork();
    var issuingAccount = issuerPublicKey;
    server.loadAccount(issuingKeys.publicKey())
        .then(function (sourceAccount) {

            var transaction = new StellarSdk.TransactionBuilder(issuingAccount)
                .addOperation(StellarSdk.Operation.setOptions({
                    setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag
                }))
                .build();
            transaction.sign(issuingKeys);
            server.submitTransaction(transaction);
        })

});

//checked before sending payment to the acc
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

// function getSequence()

app.get('/sequenceNo', function (req, res) {

    var StellarSdk = require('stellar-sdk');
    var server = new StellarSdk.Server(url);
    server.loadAccount("GAOLCUJFQ5Q3ESN6P7IYI45QZRDRGPUO3253CEIZ7ZFCHPKP43GGWKLK")
        .then(function (account) { console.log(account.sequence) })
});

app.get('/flags', function (req, res) {

    server.loadAccount(issuerPublicKey)
        .then(function (account) {
            StellarSdk.Network.useTestNetwork();
            var transaction = new StellarSdk.TransactionBuilder(account)
                .addOperation(StellarSdk.Operation.setOptions({
                    setFlags: StellarSdk.AuthRevocableFlag | StellarSdk.AuthRequiredFlag
                }))
                .build();
            console.log(account);
            transaction.sign(issuingKeys);
            server.submitTransaction(transaction);

            res.send('flag set');

        })
});

app.get('/', function (req, res) {

    res.send('use other routes')
});

app.get('/loadAccount', async function (req, res) {
    var loadAccount = await server.loadAccount('GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL');
    console.log("hell", loadAccount);
    res.send(loadAccount);

});





app.get('/pathpayment', function (req, res) {

    //GET /paths?destination_account={da}&source_account={sa}&destination_asset_type={at}&destination_asset_code={ac}&destination_asset_issuer={di}&destination_amount={amount}
    // https://horizon-testnet.stellar.org/paths?source_account=GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL&destination_account=GDJTLH57XETJ7XYVBRMSUMFGPJY3ODBKHSRL6UHOUYITAZ65AI4TFVRP&destination_asset_type=native&destination_amount=100
})






// var kp = StellarSdk.Keypair.fromRawEd25519Seed(StellarSdk.hash("Standalone Network ; February 2017"));
// console.log(kp.publicKey());







var t1 = {
    publicKey: 'GCGHCHECNDW2FHM6QWTUZIBXAWKBMMBXK7Z6NI3M7UTY6XYLB2L2VFV6',
    secret: 'SD7PVQDOQBL2F6O5BH3W5BZBWKRFHFW5MSMJ2POREK2IWLDW6FFTMEG3'
};

var t2 = {
    publicKey: 'GDBANQT4WEJGG6HRIYXNZQUZNBP2525OFNLS3UBSQHYF7ZINBGZPAOZQ',
    secret: 'SDMUVJRPSDR7LY7IEQ72SLBLO23BUHT47FKRME4YLABAQQRSGPRSNX74'
};


var t1key = StellarSdk.Keypair
    .fromSecret(t1.secret);
var t2key = StellarSdk.Keypair
    .fromSecret(t2.secret);


// sequence: "3166773876621325",

app.get('/loadAccounttest', async function (req, res) {
    //var loadAccount =await server.loadAccount(t1.publicKey);
    var loadAccount = await server.loadAccount('GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL');

    //console.log("hell", loadAccount);
    res.send(loadAccount);

});

var skey = StellarSdk.Keypair
    .fromSecret('SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77');
console.log('skey', skey.publicKey())
//sequence: "1009261479987816",
//sequence: "1009261479987817",

app.get('/transferCoinstest', async function (req, res) {
    var sourceSecretKey = 'SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77';// seed of acc from which tx process
    var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc    
    StellarSdk.Network.useTestNetwork();
    var accountLoaded = await server.loadAccount(sourcePublicKey)
    var query = { sourcePublicKey: sourcePublicKey, };
    var resp1 = await loadAccount1.findOne(query);
   // console.log('fgajossfgasdl' + resp1);
    if (!resp1) {
        var resp = await loadAccount1.insertOne({ sourcePublicKey, accountLoaded });
        console.log('if')
    }
    else {
        var updaetQuery = { $set: { account: accountLoaded } };
        var resp2 = await loadAccount1.updateOne(query, updaetQuery);
        console.log('else')
    }
    var receiverPublicKey = account2.publicKey;// public key of reciever acc
    receiverPublicKey = 'GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL';
    StellarSdk.Network.useTestNetwork();
    const account = await server.loadAccount(sourcePublicKey)
    var transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.payment({
            destination: receiverPublicKey,
            asset: StellarSdk.Asset.native(),//native asset lumen
            amount: '0.290000',
        })).addMemo(StellarSdk.Memo.text('xlm tx')).build();
    // console.log(transaction);]
    const txEnvelopeXDR = transaction.toEnvelope().toXDR()//.toString("base64")
  //  const txEnvelopeXDR = transaction.toEnvelope().toXDR().toString("base64")


  var resp1 = await loadAccount1.findOne(query);
  console.log('trasnactionRespoonse');


  if (!resp1) {
    let resp3 = await transactionSchema.insertOne({ sourcePublicKey ,txEnvelopeXDR });

    if (!resp3) console.log('resp 3 not inserted txEnvelopeXDR')
    else console.log('resp 3 inserted txEnvelopeXDR');

}
else {
    let query = { sourcePublicKey: sourcePublicKey, };
    let updaetQuery = { $set: { transaction: txEnvelopeXDR } };
    var resp2 = await transactionSchema.updateOne(query, updaetQuery);

    if (!resp2) console.log('resp 2 not inserted txEnvelopeXDR')
    else console.log('resp 2 inserted txEnvelopeXDR' )}


    //console.log(txEnvelopeXDR);
    transaction.sign(sourceKeypair);
    console.log('submitted');
    try {
        //  const temp = await server.submitTransaction(transaction)
        if (!temp) {
            console.log('hello')
        }
        else {
            console.log('hiii');
        }
        console.log('submitted', temp._links);// console.log('submitted', temp);
        res.send(transaction.sequence)
    }
    catch (e) {   //var er = e
        //console.log("keys_kapil",Object.keys(e.response))
        // if (e.response.status == 504) {
        //     var resp504 = await transactionSchema.findOne(query);
        //     const temp = await server.submitTransaction(transaction)
        // }
        // if (e.response.status == 400) {
        //     console.log('transaction failed')
        //     res.send('failed')
        // }
        res.send('done .')

    }
});



app.get('/resubmittx', async function (req, res) {
    var sourceSecretKey = 'SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77';// seed of acc from which tx process
    var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc  

    var query = { sourcePublicKey: sourcePublicKey, };
    var transactionLoaded = await transactionSchema.findOne(query);
    console.log('find query',transactionLoaded.txEnvelopeXDR)
    const buffer = Buffer.from(transactionLoaded.txEnvelopeXDR,'base64')
    const envelope = StellarSdk.xdr.TransactionEnvelope.fromXDR(buffer, 'base64')
    const transaction = new StellarSdk.Transaction(envelope)
    transaction.sign(sourceKeypair);
    StellarSdk.Network.useTestNetwork();
    const temp = await server.submitTransaction(transaction)
    if (!temp) {
        console.log('not submitted')
    }
    else {
        console.log('submitted');
    }
    console.log('submitted', temp._links);// console.log('submitted', temp);
    res.send(transaction.sequence)
}); 

app.get('/transferCoinsMultipleAccount', async function (req, res) {

    var sourceSecretKey = 'SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77';// seed of acc from which tx process
    var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc
    var receiverPublicKey = account2.publicKey;// public key of reciever acc
    receiverPublicKey = 'GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL';
    StellarSdk.Network.useTestNetwork();

    var receiverPublicKey2 = 'GAF2HC3YYBF2JPTQJO6NDVEGOR4RIFZ5VRKQ4AH5DQ6R75ZPHJB5VGGV'
    var account = await server.loadAccount(sourcePublicKey)
    var transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.payment({
            destination: receiverPublicKey,
            asset: StellarSdk.Asset.native(),//native asset lumen
            amount: '0.1',
        }))
        .addMemo(StellarSdk.Memo.text('sent to '))//optional 
        .build();
    transaction.sign(sourceKeypair);
    const temp = await server.submitTransaction(transaction)
    console.log('submitted', temp._links);


     account = await server.loadAccount(sourcePublicKey)
    var transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.payment({
            destination: receiverPublicKey2,
            asset: StellarSdk.Asset.native(),//native asset lumen
            amount: '0.2',
        }))
        .addMemo(StellarSdk.Memo.text('sent to '))//optional 
        .build();
    transaction.sign(sourceKeypair);
    const temp2 = await server.submitTransaction(transaction)

    
    console.log('submitted', temp2._links);

        res.send('sent')
});




app.get('/transferCoinstest', async function (req, res) {
    var sourceSecretKey = 'SDNIGKR3TSZFGSQNN5GGNQ7E5F7NHWGAI54SMFQSUVW3UFCR2Z7KUR77';// seed of acc from which tx process
    var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc    
    StellarSdk.Network.useTestNetwork();
    var accountDetail = await server.loadAccount(sourcePublicKey)
    var query = { sourcePublicKey: sourcePublicKey, };
    var resp1 = await loadAccount1.findOne(query);
    if (!resp1) {
        var resp = await loadAccount1.insertOne({ sourcePublicKey, accountDetail });
    }
    else {
        var updaetQuery = { $set: { accountDetail: accountDetail } };
        var resp2 = await loadAccount1.updateOne(query, updaetQuery);
    }
    var receiverPublicKey = account2.publicKey;// public key of reciever acc
    receiverPublicKey = 'GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL';
    StellarSdk.Network.useTestNetwork();

    const account = await server.loadAccount(sourcePublicKey)

    var transaction = new StellarSdk.TransactionBuilder(account)
        .addOperation(StellarSdk.Operation.payment({
            destination: receiverPublicKey,
            asset: StellarSdk.Asset.native(),//native asset lumen
            amount: '0.980000',
        })).addMemo(StellarSdk.Memo.text('xlm tx')).build();
    const txEnvelopeXDR = transaction.toEnvelope().toXDR('base64')
    //  const txEnvelopeXDR = transaction.toEnvelope().toXDR().toString("base64")
    var resp1 = await transactionSchema.findOne(query);
    console.log('trasnactionRespoonse', resp1);
    if (!resp1) {
        let resp3 = await transactionSchema.insertOne({ sourcePublicKey, txEnvelopeXDR });
        if (!resp3) console.log('resp 3 not inserted txEnvelopeXDR')
        else console.log('resp 3 inserted txEnvelopeXDR');
    }
    else {
        let query = { sourcePublicKey: sourcePublicKey };
        let updaetQuery = { $set: { txEnvelopeXDR: txEnvelopeXDR } };
        var resp2 = await transactionSchema.updateOne(query, updaetQuery);
        if (!resp2) console.log('resp 2 not inserted txEnvelopeXDR')
        else console.log('resp 2 inserted txEnvelopeXDR')
    }
    transaction.sign(sourceKeypair);
    console.log('submitted');
    try {
          const temp = await server.submitTransaction(transaction)
        if (!temp) {
            console.log('hello')
        }
        else {
            console.log('hiii');
        }
        console.log('submitted', temp._links);// console.log('submitted', temp);
        res.send(transaction.sequence)
    }
    catch (e) {   //var er = e
        //console.log(Object.keys(e.response))
        // if (e.response.status == 504) {
        //     var resp504 = await transactionSchema.findOne(query);
        //     const temp = await server.submitTransaction(transaction)
        // }
        // if (e.response.status == 400) {
        //     console.log('transaction failed')
        //     res.send('failed')
        // }
        res.send('done abc')
    }
});



module.exports = router