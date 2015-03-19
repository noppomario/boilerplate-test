///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/power-assert/power-assert.d.ts" />

'use strict';
<% low = names.replace(/^./,function(e){ return e.toLowerCase(); }) %>
import assert = require('power-assert');

import <%= name %>Model = require('../models/<%= name %>');
import <%= name %> = <%= name %>Model.<%= name %>;
import <%= names %> = require('../collections/<%= names %>');

describe('create <%= names %> collection', function() {
  beforeEach(function() {
  });
  describe('create <%= names %> collection with no <%= name %> models', function() {
    it('<%= low %> length is zero', function() {
      var <%= low %> = new <%= names %>();
      assert(<%= low %>.length === 0);
    });
  });
  describe('create <%= names %> collection with <%= name %> object', function() {
    it('setting object', function(){
      var <%= low %> = new <%= names %>([<<%= name %>>{name:'Mike'}]);
      assert(<%= low %>.length === 1);
    });
  });
});

