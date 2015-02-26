"use strict";
//var koa = require('koa');
//var router = require('koa-router');
//var serve = require('koa-static');
//var mount = require('koa-mount');
//var app = koa();

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

//app.use(router(app));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/animals', function (req, res){
  console.log('HOAAAAAAAAAA');
  res.set({'Content-Type': 'application/json'});
  res.send( JSON.stringify({
    "total": 3,
    "list": [
      {animalId: 1, name:'Gorilla'},
      {animalId: 5, name:'Dog'},
      {animalId: 7, name:'Cat'},
    ]}) );  
});

app.put('/animals/:id', function (req, res){
  console.log('PUT');
  res.set({'Content-Type': 'application/json'});
  console.log(req.body);
  res.send(req.body);
});

app.post('/animals', function (req, res){
  console.log('POST');
  res.set({'Content-Type': 'application/json'});
  console.log(req.body);
  res.send(req.body);
});

//app.use(router.routes())
//   .use(router.allowedMethods());

//console.log(__dirname);
//app.use(serve(__dirname + '/../app'));
app.use(express.static(__dirname + '/../app'));

app.listen(4649);


