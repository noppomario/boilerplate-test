"use strict";

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

router.route('/users')
  .get(function (req, res){
    console.log('GET');
    res.set({'Content-Type': 'application/json'});
    res.json({
      "total": 3,
      "list": [
        {userId: 1, name:'Mike'},
        {userId: 5, name:'Mary'},
        {userId: 7, name:'Bob'},
      ]} );  
  })
  .post(function (req, res){
    console.log('POST');
    console.log(req.body);
    res.set({'Content-Type': 'application/json'});
    res.send(req.body.name);
  });

router.route('/users/:id')
  .get(function (req, res){
    console.log('GET');
    res.set({'Content-Type': 'application/json'});
    console.log(req.body);
    res.json({name:'Hoge'});
  })
  .put(function (req, res){
    console.log('PUT');
    console.log(req.body);
    res.set({'Content-Type': 'application/json'});
    res.send(req.body.name);
  });


app.use('/', router);

app.use(express.static(__dirname + '/../app'));

app.listen(4649);

