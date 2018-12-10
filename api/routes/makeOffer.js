

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
