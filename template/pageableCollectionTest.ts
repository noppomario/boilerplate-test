///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/power-assert/power-assert.d.ts" />

'use strict';

import assert = require('power-assert');

import <%= name %> = require('../<%= low %>/<%= name %>');
import <%= names %> = require('../<%= low %>/<%= names %>');

describe('create <%= names %> collection', function() {
  beforeEach(function() {
  });
  describe('create <%= names %> collection with no <%= name %> models', function() {
    it('<%= lows %> length is zero', function() {
      var <%= lows %> = new <%= names %>();
      assert(<%= lows %>.length === 0);
    });
  });
  describe('create <%= names %> collection with <%= name %> object', function() {
    it('setting object', function(){
      var <%= lows %> = new <%= names %>([<<%= name %>>{name:'Mike'}]);
      assert(<%= lows %>.length === 1);
    });
  });
});

