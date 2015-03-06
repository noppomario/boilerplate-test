'use strict';
<% low  = name.replace(/^./,function(e){ return e.toLowerCase(); }) %>
<% lows = names.replace(/^./,function(e){ return e.toLowerCase(); }) %>

var path       = require('path');
var __         = require('underscore');

var <%= lows %> = [
  {<%= low %>Id: '1', name:'Mike'},
  {<%= low %>Id: '5', name:'Mary'},
  {<%= low %>Id: '7', name:'Bob'},
];

module.exports = function(router){


  router.route('/<%= lows %>')
    .get(function (req, res){
      if(req.xhr){
        res.set({'Content-Type': 'application/json'});
        res.json({
          "total": <%= lows %>.length,
          "list" : <%= lows %>,
        });
      } else {
        res.sendFile('index.html', {
          root: path.join(__dirname, '../app'),
        });
      }
    })
    .post(function (req, res){
      res.set({'Content-Type': 'application/json'});
      res.send(req.body.name);
    });

  router.route('/<%= lows %>/:id')
    .get(function (req, res){
      res.set({'Content-Type': 'application/json'});
      var model = __.find(<%= lows %>,function(<%= low %>){
        return <%= low %>.<%= low %>Id === req.params.id;
      });
      if( model != undefined ) {
        res.json(model);
      }
    })
    .put(function (req, res){
      res.set({'Content-Type': 'application/json'});
      var model = __.find(<%= lows %>,function(<%= low %>){
        return <%= low %>.<%= low %>Id === req.params.id;
      });
      if( model != undefined ) {
        model.name = req.body.name;
        res.send(req.body.name);
      }
    });

  console.log("imported <%= names %> Router");
};

