///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/power-assert/power-assert.d.ts" />

'use strict';
<% low = name.replace(/^./,function(e){ return e.toLowerCase(); }) %>
import assert = require('power-assert');
import <%= name %>Model = require('../models/<%= name %>');
import <%= name %> = <%= name %>Model.<%= name %>;
import <%= names %> = require('../collections/<%= names %>');
import <%= names %>View = require('../collectionviews/<%= names %>View');

describe('create <%= names %> collection-view', function() {
  beforeEach(function() {
    this.collection = new <%= names %>([
      <<%= name %>>{name:'Mike'},
      <<%= name %>>{name:'Mary'},
      <<%= name %>>{name:'Ken'},
    ]);
  });
  describe('create <%= names %> collection-view with empty collection', function() {
    it('undefined collection', function() {
      var <%= low %>View = new <%= names %>View();
      assert(<%= low %>View.collection === undefined);
    });
  });
  describe('create <%= names %> collection-view with <%= names %> collection', function() {
    it('collection', function() {
      var <%= low %>View = new <%= names %>View({collection:this.collection});
      assert(<%= low %>View.collection === this.collection);
    });
  });
});

