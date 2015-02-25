"use strict";
var koa = require('koa');
var router = require('koa-router');
var serve = require('koa-static');
//var mount = require('koa-mount');
var app = koa();

app.use(router(app));

//var router = new Router();

app.get('/users', function *(next){
  console.log('HOAAAAAAAAAA');
  console.log(this.request.header.accept);
  this.set('Content-Type', 'application/json');
  this.body = JSON.stringify({
    "total": 3,
    "list": [
      {userId: 1, name:'Mike'},
      {userId: 5, name:'Mary'},
      {userId: 7, name:'Ken'},
    ]});  
});


/*
app.use(route.get('/users', function *(next) {
  console.log(this.request.is('json'));
  this.set('Content-Type', 'application/json');
  this.body = JSON.stringify({
    "total": 3,
    "list": [
      {userId: 1, name:'Mike'},
      {userId: 5, name:'Mary'},
      {userId: 7, name:'Ken'},
    ]});

}));

app.use(route.post('/users', function *(next){
//  console.log(this.req);
//  console.log(this.res);
  
}));
*/

console.log(__dirname);
app.use(serve(__dirname + '/../app'));

app.listen(4649);


