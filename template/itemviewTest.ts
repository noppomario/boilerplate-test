///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/power-assert/power-assert.d.ts" />

'use strict';

import <%= name %> = require('../<%= low %>/<%= name %>');

import <%= name %>View = require('../<%= low %>/<%= name %>View');

describe('create <%= name %> item-view', function() {
  beforeEach(function() {
    this.model = new <%= name %>({name:'Mike'});
  });
  describe('create <%= name %> item-view with empty model', function() {
    it('undefined model', function() {
      var <%= low %>View = new <%= name %>View();
      assert(<%= low %>View.model === undefined);
    });
  });
  describe('create <%= name %> item-view with <%= name %> model', function() {
    it('model', function() {
      var <%= low %>View = new <%= name %>View({model:this.model});
      assert(<%= low %>View.model === this.model);
    });
  });
});

