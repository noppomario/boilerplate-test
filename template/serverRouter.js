'use strict';
<% low  = name.replace(/^./,function(e){ return e.toLowerCase(); }) %>
<% lows = names.replace(/^./,function(e){ return e.toLowerCase(); }) %>

var path       = require('path');
var __         = require('underscore');

var <%= lows %> = {
  collection: [
    {modelId: 1, name:'Mike'},
    {modelId: 5, name:'Mary'},
    {modelId: 7, name:'Bob'},
  ],
  getModelById: function(_id){
    const id = parseInt(_id, 10);
    return __.find(this.collection, function(m){
      return m.modelId === id;
    });
  },
  hasModelByName: function(name){
    return this.collection.some(function(m){
      return m.name === name;
    });
  },
  createNewModel: function(name){
    const already = this.hasModelByName(name);
    if ( already ){
      return null;
    }
    const newId = this.getNewId();
    const newModel = {modelId: newId, name: name};
    this.collection.push(newModel);
    return newModel;
  },
  changeModel: function(_id, name){
    const id = parseInt(_id, 10);
    var model = this.getModelById(id);
    const isSameName = this.isDuplicate(id, name);
    if( model != undefined && ! isSameName ) {
      model.name = name;
      return model;
    } else {
      return null;
    }
  },
  isDuplicate: function(_id, name){
    const id = parseInt(_id, 10);
    return __.some(this.collection, function(m){
      return m.name === name && m.modelId !== id;
    });
  },
  getNewId: function(){
    return Math.max.apply(this, this.collection.map(function(m){
      return m.modelId;
    })) + 1;
  },
  deleteModelById: function(_id){
    const id = parseInt(_id, 10);
    const newCollection = __.reject(this.collection, function(m){
      return m.modelId === id;
    });
    this.collection = newCollection;
  },
};

module.exports = function(router){

  router.route('/<%= lows %>')
    .get(function (req, res){
      if(req.xhr){
        res.set({'Content-Type': 'application/json'});
        res.json({
          "total": <%= lows %>.collection.length,
          "list" : <%= lows %>.collection,
        });
      } else {
        res.sendFile('index.html', {
          root: path.join(__dirname, '../app'),
        });
      }
    })
    .post(function (req, res){
      res.set({'Content-Type': 'application/json'});
      const newModel = <%= lows %>.createNewModel(req.body.name);
      if ( newModel == undefined ){
        res.sendStatus(409);
        return;
      }
      res.json(newModel);
      console.log(<%= lows %>.collection);
    });

  router.route('/<%= lows %>/:id')
    .get(function (req, res){
      if(req.xhr){
        res.set({'Content-Type': 'application/json'});
        const model = <%= lows %>.getModelById(req.params.id);
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
      const model = <%= lows %>.changeModel(req.params.id,req.body.name);
      if ( model != undefined ){
        res.json({response: 'OK'});
      } else {
        res.sendStatus(409);
      }
      console.log(<%= lows %>.collection);
    })
    .delete(function (req, res){
      res.set({'Content-Type': 'application/json'});
      <%= lows %>.deleteModelById(req.params.id);
      res.json({response:'OK'});
      console.log(<%= lows %>.collection);
    });

  console.log("imported <%= names %> Router");
};

