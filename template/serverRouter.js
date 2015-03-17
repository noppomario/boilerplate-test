'use strict';
<% low  = name.replace(/^./,function(e){ return e.toLowerCase(); }) %>
<% lows = names.replace(/^./,function(e){ return e.toLowerCase(); }) %>

var path       = require('path');
var __         = require('underscore');

var <%= lows %> = [
  {modelId: 1, name:'Mike'},
  {modelId: 5, name:'Mary'},
  {modelId: 7, name:'Bob'},
];

var f = {
  getModelById: function(collection, _id){
    const id = parseInt(_id, 10);
    return __.find(collection, function(m){
      return m.modelId === id;
    });
  }.bind(this, <%= lows %>),
  hasModelByName: function(collection, name){
    return collection.some(function(m){
      return m.name === name;
    });
  }.bind(this, <%= lows %>),
  createNewModel: function(collection, name){
    if ( name == undefined || name === '' ){
      return null;
    }
    const already = f.hasModelByName(name);
    if ( already ){
      return null;
    }
    const newId = f.getNewId();
    const newModel = {modelId: newId, name: name};
    collection.push(newModel);
    return newModel;
  }.bind(this, <%= lows %>),
  changeModel: function(collection, _id, name){
    const id = parseInt(_id, 10);
    var model = f.getModelById(id);
    const isSameName = f.isDuplicate(id, name);
    if( model != undefined && ! isSameName ) {
      model.name = name;
      return model;
    } else {
      return null;
    }
  }.bind(this, <%= lows %>),
  isDuplicate: function(collection, _id, name){
    const id = parseInt(_id, 10);
    return __.some(collection, function(m){
      return m.name === name && m.modelId !== id;
    });
  }.bind(this, <%= lows %>),
  getNewId: function(collection){
    return collection.length === 0 ? 1
         : __.chain(collection).pluck('modelId').max().value() + 1;
  }.bind(this, <%= lows %>),
  deleteModelById: function(collection, _id){
    const id = parseInt(_id, 10);
    const newCollection = __.reject(collection, function(m){
      return m.modelId === id;
    });
    <%= lows %> = newCollection;
  }.bind(this, <%= lows %>),
};

module.exports = function(router){

  router.route('/<%= lows %>')
    .get(function (req, res){
      if(req.accepts('json')){
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
      const newModel = f.createNewModel(req.body.name);
      if ( newModel == undefined ){
        res.sendStatus(409);
        return;
      }
      res.json(newModel);
      console.log(<%= lows %>);
    });

  router.route('/<%= lows %>/:id')
    .get(function (req, res){
      if(req.accepts('json')){
        res.set({'Content-Type': 'application/json'});
        const model = f.getModelById(req.params.id);
        if( model != undefined ) {
          res.json(model);
        } else {
          res.sendStatus(404);
        }
      } else {
        res.sendFile('index.html', {
          root: path.join(__dirname, '../app'),
        });
      }
    })
    .put(function (req, res){
      res.set({'Content-Type': 'application/json'});
      const model = f.changeModel(req.params.id,req.body.name);
      if ( model != undefined ){
        res.json({response: 'OK'});
      } else {
        res.sendStatus(409);
      }
      console.log(<%= lows %>);
    })
    .delete(function (req, res){
      res.set({'Content-Type': 'application/json'});
      f.deleteModelById(req.params.id);
      res.json({response:'OK'});
      console.log(<%= lows %>);
    });

  console.log("imported <%= names %> Router");
};

