var express = require('express');
var pg = require("pg");
var app = express();

var connectionString = "postgres://postgres:che1oog3Quithan@crypto-testnets.sofodev.co:5432/stellar";

app.get('/', function (req, res, next) {
    pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query('SELECT * FROM public.scpquorums' ,function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});

app.get('/totalSupply', function (req, res, next) {

    pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query("SELECT * FROM public.trustlines WHERE assetcode= 'okToken'" ,function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           //var count = 0;
           for(var count in result.rows)
           {
            console.log(count)

            //   if(result.rows[count].issuer == 'GDTT75T6PWLP3RHDSVC5JUXGYIOZST4VUXHRGZBGQTR5PYA25R4AKEUT')
            count = count + result.rows[count].balance;
            console.log(count)
           }
           console.log(count/10000000);
           res.status(200).send(result.rows);
       });
    });
});



app.get('/txhistory', function (req, res, next) {

    pg.connect(connectionString,function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
       client.query("SELECT * FROM public.txhistory" ,function(err,result) {
           done(); // closing the connection;
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
          
           res.status(200).send(result.rows);
       });
    });
});


