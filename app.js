var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');//pull post content from http request
var urlencodedParser = bodyParser.urlencoded({ extended: true });
//app.use(bodyParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('./views'));
//
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(require('express-jquery')('/jquery.js'));
//
//session
var session = require('express-session');
app.use(session({ secret: 'prashant', saveUninitialized: true, resave: true }));
//sssion


//cors
var cors = require('cors');
app.use(cors());
//



app.listen(4200, () => {
    console.log("connected port 4200 wallet api");
})

const authorizationFlag = require('./api/routes/authorizationFlag.js');
const balanceOf= require('./api/routes/balanceOf.js');
const burn= require('./api/routes/burn.js');
const changeTrust= require('./api/routes/changeTrust.js');
const checkIsAuthorized= require('./api/routes/checkIsAuthorized.js');
const freezeBurnAccount= require('./api/routes/freezeBurnAccount.js');
const getDetailTxHashUsingHash= require('./api/routes/getDetailTxHashUsingHash.js');
const issueAsset= require('./api/routes/issueAsset.js');
const loadAccount= require('./api/routes/loadAccount.js');
const login= require('./api/routes/login.js');
const recentTransactions= require('./api/routes/recentTransactions.js');
const setHomeDomain= require('./api/routes/setHomeDomain.js');
const streampayments= require('./api/routes/streampayments.js');
const transferOktoken= require('./api/routes/transferOktoken.js');
const transferXlm= require('./api/routes/transferXlm.js');


app.use('/authorizationFlag', authorizationFlag);
app.use('/balanceOf', balanceOf)
app.use('/burn', burn);
app.use('/changeTrust', changeTrust)
app.use('/checkIsAuthorized', checkIsAuthorized);
app.use('/freezeBurnAccount', freezeBurnAccount);
app.use('/getDetailTxHashUsingHash', getDetailTxHashUsingHash)
app.use('/issueAsset', issueAsset)
app.use('/loadAccount', loadAccount)
app.use('/login', login);
app.use('/recentTransactions', recentTransactions)
app.use('/setHomeDomain', setHomeDomain)
app.use('/streampayments', streampayments)
app.use('/setHomeDomain', transferOktoken)
app.use('/streampayments', transferXlm)


app.get('/', function (req, res) {

    res.send('use other routes');
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
