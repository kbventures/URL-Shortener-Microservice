'use strict';

require('dotenv').config();

var express = require('express');
var mongo = require('mongodb');
var mongoose =require('mongoose');
var dns = require('dns');
var services = require('./services/helperFunctions'); 
var cors = require('cors');
var Shortener = require('./mongoose.js').ShortenerModel;


// mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var app = express();
var port = process.env.PORT || 3000;


// Middleware
app.use(cors());

app.use(express.urlencoded({
    extended:true
}))

app.use('/public', express.static(process.cwd() + '/public'));


// logger
app.use((req,res,next) => {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
    console.log(`Logger Method: ${method} Path: ${path} - IP: ${ip}`);
    next();
  });


//API End point

app.get('/', function(req, res){
    res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/api/hello', function (req, res) {
    res.json({greeting: 'hello API'});
  });

app.post('/api/shorturl', function(req, res){
    let reqUrl = req.body.url;

    // Check if a JavaScript string is a URL
    if(!services.isValidUrl(reqUrl)){
            return res.status(400).json({error:'invalid URL'});
    }



    // var hostNameExtracted = services.host_Name_from_url(reqUrl);
    //   dns.lookup(hostNameExtracted,(err)=>{
    //     if(err){
    //         res.json({error:'invalid URL'})}
    //     else {
    //         let addWWW = 'www.'+hostNameExtracted;
    //         let addHttps = 'https://'+hostNameExtracted;
    //         let newUrl = new Shortener({original_url: addWWW});
    //          newUrl.save(function(err){
    //         if(err) return console.error(err);
    //         });
    //         newUrl.nextCount(function(err,count){
    //         res.json({original_url:reqUrl, short_url: count});
    //        231 })
            
    //     }
    // })


    let newUrl = new Shortener({original_url:reqUrl});
    newUrl.save(function(err){
        if(err) return console.error(err);
    });

    newUrl.nextCount(function(err, count){
        res.json({original_url: reqUrl, short_url: count});
    })

})

app.get('/api/shorturl/:short_url', (req,res)=>{
    console.log('is anything working');
    let shortUrl = req.params.short_url;
    Shortener.find({short_url:shortUrl},(err,data)=>{
        if(err) return console.log(err);
        console.log(data);
        let url = data[0].original_url;
        console.log(url);
        let testString = `https://${url}`;
        res.redirect(testString);
    })
});

app.listen(port, function(){
    console.log('Node.js listening...' + port);
});



module.exports = app; 




