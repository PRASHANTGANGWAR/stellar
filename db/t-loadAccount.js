let mongoose = require('mongoose')
var url = "mongodb://127.0.0.1:27017/token`";
var connection = mongoose.connection;
connection.on('connected', function () {
    console.log("connected loadAccount");
})
mongoose.connect(url, { useNewUrlParser: true });

// to add options in the questions collectuon
let loadAccount = new mongoose.Schema({
    sourcePublicKey: String,
    accountDetail: String
})

module.exports = mongoose.model('loadAccount', loadAccount)


