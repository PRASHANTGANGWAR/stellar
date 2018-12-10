let mongoose = require('mongoose')
var url = "mongodb://127.0.0.1:27017/token`";
var connection = mongoose.connection;
connection.on('connected', function()
{
    console.log("connected token");
})
mongoose.connect(url, { useNewUrlParser: true });

// to add options in the questions collectuon
let tokenSchema = new mongoose.Schema({
  lasttoken: Number 
})
module.exports = mongoose.model('tokenSchema', tokenSchema)

