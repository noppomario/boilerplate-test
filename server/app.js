"use strict";

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var __         = require('underscore');
var path       = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

var users = [
  {userId: '1', name:'Mike'},
  {userId: '5', name:'Mary'},
  {userId: '7', name:'Bob'},
];

router.route('/users')
  .get(function (req, res){
    console.log('GET');
    if(req.xhr){
      res.set({'Content-Type': 'application/json'});
      res.json({
        "total": users.length,
        "list" : users,
      });
    } else {
      console.log(__dirname + '/../app/index.html');
      res.sendFile('index.html', {
        root: path.join(__dirname, '../app'),
      });
    }
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
    console.log(req.params.id);
    var model = __.find(users,function(user){
      return user.userId === req.params.id;
    });
    if( model != undefined ) {
      res.json(model);
    }
  })
  .put(function (req, res){
    console.log('PUT');
    res.set({'Content-Type': 'application/json'});
    console.log(req.body);
    console.log(req.params.id);
    var model = __.find(users,function(user){
      return user.userId === req.params.id;
    });
    if( model != undefined ) {
      model.name = req.body.name;
      res.send(req.body.name);
    }
  });


app.use('/', router);

app.use(express.static(__dirname + '/../app'));

app.listen(4649);

