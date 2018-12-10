
app.get('/authaccfalse', function (req, res) {
    //now anyone can hold the asset
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






