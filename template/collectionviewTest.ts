///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/power-assert/power-assert.d.ts" />

'use strict';

import <%= name %> = require('../<%= low %>/<%= name %>');
import <%= names %> = require('../<%= low %>/<%= names %>');
import <%= names %>View = require('../<%= low %>/<%= names %>View');

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
      var <%= lows %>View = new <%= names %>View();
      assert(<%= lows %>View.collection === undefined);
    });
  });
  describe('create <%= names %> collection-view with <%= names %> collection', function() {
    it('collection', function() {
      var <%= lows %>View = new <%= names %>View({collection:this.collection});
      assert(<%= lows %>View.collection === this.collection);
    });
  });
});

