var express = require('express');
var app = express();
var StellarSdk = require('stellar-sdk');
var request = require('request');
StellarSdk.Network.useTestNetwork();
var router = express.Router();

var bodyParser = require('body-parser');//pull post content from http request
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static('./views'));
app.use(bodyParser());

var session = require('express-session');
var cookieParser = require('cookie-parser')

app.use(cookieParser('secret'))
app.use(session({ secret: 'prashant', saveUninitialized: true, resave: true, cookie: { maxAge: 30000 } }));

var urlString = 'http://crypto-testnets.sofodev.co:8000';
var server = new StellarSdk.Server(urlString, { allowHttp: true });

var rootSeed = {// server
    publicKey: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
    secret: 'SDHOAMBNLGCE2MV5ZKIVZAQD3VCLGP53P3OBSBI6UN5L5XZI5TKHFQL4'
};

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

var freezedAccount = {
    publicKey: 'GBGVBLUKKZ7ZLFABJEXONEMOFM4T5EVTL3FD6NQGZBA3GIJNBIXVGE24',
    secret: 'SA2HBLCJEX53Y3TZWT5BEMBTSA6VKSZUWZA7NVVERPXRIITPZN6PUZOD'
}
var keypairFreezed = StellarSdk.Keypair.fromSecret(freezedAccount.secret);

var assetName = 'okToken';
var okToken = new StellarSdk.Asset(
    assetName, issuer.publicKey);

router.get('/login', function (req, res) {
    res.render('login.ejs');
});

router.post('/login', function (req, res) {
    var pub = req.body.publickey;
    console.log(req.body.publickey);
    //session
    req.session.publickey = req.body.publickey;
    //session
    server.loadAccount(pub).then(function (account) {
        console.log(account);
        account.balances.forEach(function (balance) {//for each currency balance
            console.log('Type:', balance.asset_code, ', Balance:', balance.balance);
            console.log('acc id', account.sequence);// undefined
            res.send(account);
        });
    })
        .catch(function (error) {
            console.log(error);
        });
});

router.post('/logout', urlencodedParser, function (req, res) {
    req.session.destroy();
    sess = {};
    res.redirect('login');
});

router.get('/balanceOf', function (req, res) {
    var pub = req.body.publicKey;
    console.log(req.body.publicKey);
    //var pub ='GBGP7QMM7IRVDOCH4KP4SWZ5FX2QY2VACUU47A7FD6YVOFV6YLB3QJDE';
    //saved works var pub = 'GADBUMHXHBVBU4FWSKRCIUI33E5VFNWYS5M5QOUXV5WFG7BZLP2FBSXQ';//saved works
    server.loadAccount(pub).then(function (account) {  // If the account is not found, surface a nicer error message for logging.
        //console.log('details of all acc',account);
        console.log(account);
        account.balances.forEach(function (balance) {//for each currency balance
            console.log('Type:', balance.asset_code, ', Balance:', balance.balance);
            console.log('acc id', account.sequence);// undefined
        });
    })
        .catch(function (error) {
            console.log(error);
        });
});





router.get('/loadAccount', async function (req, res) {
    try {
        keypair = StellarSdk.Keypair.fromSecret('SDHOAMBNLGCE2MV5ZKIVZAQD3VCLGP53P3OBSBI6UN5L5XZI5TKHFQL4')
        var pubkey = keypair.publicKey();
        var loadAccount = await server.loadAccount(pubkey);
        console.log("load account", loadAccount);
        console.log('###############################');
        res.send(loadAccount);
    }
    catch (e) {
        console.log("error occured")
    }
});



router.get('/transferxlm', async function (req, res) {
    try {
        var amt = req.body.amt;
        var sourceSecretKey = req.body.secretkey;
        // var sourceSecretKey = issuer.secret;// seed of acc from which tx process
        var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
        var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc
        var receiverPublicKey = account2.publicKey;// public key of reciever acc
        var receiverPublicKey = req.body.receiverPublicKey;// public key of reciever acc
        StellarSdk.Network.useTestNetwork();
        const account = await server.loadAccount(sourcePublicKey)
        var transaction = new StellarSdk.TransactionBuilder(account)
            .addOperation(StellarSdk.Operation.payment({
                destination: receiverPublicKey,
                asset: StellarSdk.Asset.native(),//native asset lumen
                amount: amt,
            }))
            .addMemo(StellarSdk.Memo.text('coins sent xlm'))//optional 
            .build();
        transaction.sign(sourceKeypair);
        console.log('tx signed');
        const temp = await server.submitTransaction(transaction)
        console.log('###############################', temp._links);
        res.send('done xlm', temp._links);
    } catch (e) {
        console.log("error occured")
    }
});

router.get('/transferAsset', async function (req, res) {
    try {
        var amt = req.body.amt;
        var sourceSecretKey = req.body.secretkey;
        // var sourceSecretKey = issuer.secret;// seed of acc from which tx process
        var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
        var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc
        var receiverPublicKey = account2.publicKey;// public key of reciever acc
        var receiverPublicKey = req.body.receiverPublicKey;// public key of reciever acc
        StellarSdk.Network.useTestNetwork();
        const account = await server.loadAccount(sourcePublicKey)
        var transaction = new StellarSdk.TransactionBuilder(account)
            .addOperation(StellarSdk.Operation.payment({
                destination: receiverPublicKey,
                asset: okToken,//native asset lumen
                amount: amt,
            }))
            .addMemo(StellarSdk.Memo.text('coins sent xlm'))//optional 
            .build();
        transaction.sign(sourceKeypair);
        console.log('tx signed');
        const temp = await server.submitTransaction(transaction)
        console.log('###############################', temp._links);
        res.send('done okToken', temp._links);
    } catch (e) {
        console.log("error occured")
    }
});


app.get('/authorizationFlag', function (req, res) {
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


router.get('/changeTrust', function (req, res) {
    var issuingKeys = StellarSdk.Keypair
        .fromSecret(issuerSecretKey);
    var receivingKeys = StellarSdk.Keypair
        .fromSecret('SDSAVCRE5JRAI7UFAVLE5IMIZRD6N6WOJUWKY4GFN34LOBEEUS4W2T2D');
    // var receivingKeys = req.body.userSecretKey;
    server.loadAccount(receivingKeys.publicKey())
        .then(function (receiver) {
            var transaction = new StellarSdk.TransactionBuilder(receiver)
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: okToken,
                    limit: '1000'// optional if not set thn unlimited 
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


router.get('/stream', function (req, res) {
    async function stream() {
        var accountId = issuer.publicKey;
        var payments = server.payments().forAccount(accountId);
        var lastToken = await loadLastPagingToken(); // to knoe the token of last processed page
        if (lastToken) {
            payments.cursor(lastToken);
            console.log('helllo lasttoken', lastToken.length);
        }
        payments.stream({
            onmessage: function (payment) {
                savePagingToken(payment.paging_token);
                if (payment.to !== accountId) {// only recieved payment 
                    return;
                }
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
            await tokenSchema.updateOne({ token: 1299124527837185 }, { $set: { token: token } });
        }

        async function loadLastPagingToken() {

            var token = await tokenSchema.find().toArray();
            console.log('lastpaging token', token);
            return token;
        }
    }
});


router.get('/burn', async function (req, res) {
    try {
        var sourceSecretKey = req.body.secretkey;
        var amt = req.body.amt;
        var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
        StellarSdk.Network.useTestNetwork();
        const account = await server.loadAccount(sourceKeypair.publicKey())
        var transaction = new StellarSdk.TransactionBuilder(account)
            .addOperation(StellarSdk.Operation.payment({
                destination: freezedAccount.publicKey(),
                asset: okToken,//native asset lumen
                amount: amt
            }))
            .addMemo(StellarSdk.Memo.text('burned coins'))//optional 
            .build();
        transaction.sign(sourceKeypair);
        console.log('tx signed');
        const temp = await server.submitTransaction(transaction)
        console.log('###############################', temp._links);
        res.send('done burning', temp._links);
    } catch (e) {
        console.log("error occured")
    }
});


router.get('/freezeBurnAccount', async function (req, res) {
    try {
        var keypairFreezed = StellarSdk.Keypair.fromSecret(freezedAccount.secret);
        const thresholds = {
            masterWeight: 0, // no rights
            lowThreshold: 1,
            medThreshold: 2, // payment is medium threshold
            highThreshold: 2
        }
        console.log(escrowKeyPair.publicKey());
        var freezedAccount = await server.loadAccount(freezedAccount.publicKey);
        console.log('account info', freezedAccount);
        let transaction = new StellarSdk.TransactionBuilder(freezedAccount)
            .addOperation(StellarSdk.Operation.setOptions(thresholds))
            .build()
        transaction.sign(keypairFreezed);
        await server.submitTransaction(transaction);
        console.log('done');
    }
    catch (e) {
        console.log("error occured")
    }
});



//check before sending payments reciever is aut to recv assets

router.get('/checkIsAuthorized', function (req, res) {
    try {
        var okTokenCode = 'okToken';
        var accountId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';
        //recievers public key
        server.loadAccount(accountId).then(function (account) {
            var trusted = account.balances.some(function (balance) {
                return balance.asset_code === okTokenCode &&
                    balance.asset_issuer === issuerPublicKey;
            });
            console.log(trusted ? 'Trusted user' : 'Not trusted ');
            res.send(trusted ? 'Trusted user' : 'Not trusted ')
        });
    }
    catch (e) {
        console.log("error occured")
    }
});


router.get('/streampayments', function (req, res) {
    try {
        let funding_account = issuer.publicKey // This needs to be a valid account on the network and should return an Account object
        let stream = server.payments()
            .forAccount(funding_account)
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
    }
    catch (e) {
        console.log("error occured")
    }
});



//callbuilder1.stream({onmessage : handelpaymentresponse})



router.get('/recentTransactions', function (req, res) {
    //login account recent 200  transaction max
    try {
        var urll = urlString + '/accounts/' + account2.publicKey + '/operations?order=desc&limit=200';
        console.log(urll);
        request.get({
            url: urll,
            json: true
        }, function (error, response, body) {
            if (error || response.statusCode !== 200) {
                console.error('ERROR!', error || body);
            }
            else {
                var resp = response.body._embedded.records;
                var count = 1;
                for (val in resp) {
                    //for type_i ==1 for payment type_i is 1 in json response from  horizon server

                    if (resp[count].type_i == '1') {
                        console.log(count + '. from :' + resp[count].from + ', to : ' + resp[count].to + ', amount :' + resp[count].amount)
                    }
                    count++;

                }
                console.log('###################################')
                res.send(resp);
            }
        });
    }
    catch (e) {
        console.log("error occured")
    }
});




router.get('/getDetailTxHashUsingHash', function (req, res) {
    try {
        // var hash = req.body.hash;
        var hash = 'cfbd98664e3d3e22230c8a3c5b7ca163789dd0df7b31fc72ca812e050df30a9e';//manage offer
        //d4fe007dff517b724c402bab959f83f4423b61d2729c973026bd7cf8ab0b54a5 payment hash
        var url = urlString + '/transactions/' + hash + '/operations';
        // console.log(url);

        request.get({
            url: url,
            json: true
        }, function (error, response, body) {
            if (error || response.statusCode !== 200) {
                console.error('ERROR!', error || body);
            }
            else {
                if (response.body._embedded.records[0].type == "payment") {
                    //console.log("hellllllo", response.body._embedded.records.from,response.body._embedded.records.to,response.body._embedded.records.amount);
                    console.log('from :' + response.body._embedded.records[0].from)
                    console.log(', to :' + response.body._embedded.records[0].to)
                    console.log(',amount :', response.body._embedded.records[0].amount)
                    console.log(',asset-type :' + response.body._embedded.records[0].asset_type)
                    console.log('#########################')
                    res.send(response.body._embedded.records[0])
                }
                else {
                    //res.send(response.body)
                    console.log('not a payement transaction');
                    res.send('not a payement transaction')
                }
            }
        });
    }
    catch (e) {
        console.log("error occured")
    }
});





app.get('/setHomeDomain', function (req, res) {
    // Keys for issuing account
    var issuingKeys = StellarSdk.Keypair
        .fromSecret(issuer.secretKey);
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


router.get('/test', async function (req, res) {
    try {
        var sourceSecretKey = issuer.secret;// seed of acc from which tx process
        var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
        var sourcePublicKey = sourceKeypair.publicKey();//pub key of source acc
        var receiverPublicKey = account2.publicKey;// public key of reciever acc
        StellarSdk.Network.useTestNetwork();
        // console.log('1');
        //var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');//live netwrk

        //var server = new StellarSdk.Server('http://localhost:8000', { allowHttp: true });
        //console.log('2');

        const account = await server.loadAccount(sourcePublicKey)
        //console.log('3');

        var transaction = new StellarSdk.TransactionBuilder(account)
            .addOperation(StellarSdk.Operation.payment({
                destination: receiverPublicKey,
                asset: StellarSdk.Asset.native(),//native asset lumen
                amount: '0.00004',
            }))
            .addMemo(StellarSdk.Memo.text('token sent xlm'))//optional 
            .build();

        console.log('4');

        transaction.sign(sourceKeypair);

        const temp = await server.submitTransaction(transaction)
        console.log('submitted', temp._links);
        console.log('###############################');

        res.send('done');

        //return res.json({ data: temp})
    } catch (e) {
        console.log("error occured")
        // return res.json({ error: e})
    }
});


module.exports = router;


///home/prashant/prashant/stellar-core/src/transactions/readme.md