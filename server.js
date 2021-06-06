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
    // console.log(`${method} ${path} - ${ip}`);
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
    // console.log(`Test 1 ${req.body}`);
    // == www.google.com
    let reqUrl = req.body.url;
    console.log(reqUrl);


    var hostNameExtracted = services.host_Name_from_url(reqUrl);
    // console.log(`hostNameExtracted ${hostNameExtracted}`);
    // console.log(`Body of req ${reqUrl}`);
      dns.lookup(hostNameExtracted,(err)=>{
        if(err){
            res.json({error:'invalid URL'})}
        else {
            let addWWW = 'www.'+hostNameExtracted;
            let addHttps = 'https://'+hostNameExtracted;
            // console.log(address);
            let newUrl = new Shortener({original_url: addWWW});

            // console.log(`Shortener Object ${newUrl}`);
             newUrl.save(function(err){
            if(err) return console.error(err);
            });
            newUrl.nextCount(function(err,count){
                // console.log(count);
                // console.log({original_url:addWWW, short_url: count})
                res.json({original_url:reqUrl, short_url: count});
            })
            
        }
    })

})

app.get('/api/shorturl/:short_url', (req,res)=>{
    let shortUrl = req.params.short_url;
    Shortener.find({short_url:shortUrl},(err,data)=>{
        if(err) return console.log(err);
        // console.log(data);
        // console.log(data.shor_url);
        let url = data[0].original_url;
        // console.log(url);

        let testString = `https://${url}`;

        //solution to problem is to add https:// to the address
        res.redirect(testString);
    })
    // res.json({short_url:shortUrl});
});

app.listen(port, function(){
    console.log('Node.js listening...' + port);
});



module.exports = app; 




