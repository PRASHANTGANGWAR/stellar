

app.get('/pathpayment', function (req, res) {

    //GET /paths?destination_account={da}&source_account={sa}&destination_asset_type={at}&destination_asset_code={ac}&destination_asset_issuer={di}&destination_amount={amount}
    // https://horizon-testnet.stellar.org/paths?source_account=GDENPKUMUNAYWCRT7E6NFN5HBMNPIUISY7EJG4TVR3RHMS7FPQ2QJLZL&destination_account=GDJTLH57XETJ7XYVBRMSUMFGPJY3ODBKHSRL6UHOUYITAZ65AI4TFVRP&destination_asset_type=native&destination_amount=100
})

module.exports = router;