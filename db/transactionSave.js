let mongoose = require('mongoose')
var url = "mongodb://127.0.0.1:27017/token`";
var connection = mongoose.connection;
connection.on('connected', function()
{
    console.log("connected transaction.save");
})
mongoose.connect(url, { useNewUrlParser: true });

// to add options in the questions collectuon
let transactionSchema = new mongoose.Schema({

  sourcePublicKey:String,
  txEnvelopeXDR: String 
})


module.exports = mongoose.model('transactionSchema', transactionSchema)


