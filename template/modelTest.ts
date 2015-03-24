///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/power-assert/power-assert.d.ts" />

'use strict';
<% low = name.replace(/^./,function(e){ return e.toLowerCase(); }) %>
import assert = require('power-assert');
import <%= name %> = require('../models/<%= name %>');

describe('create <%= name %> model', function() {
  beforeEach(function() {
  });
  describe('create <%= name %> model with empty options', function() {
    it('undefined name', function() {
      var <%= low %> = new <%= name %>();
      assert(<%= low %>.name === undefined);
    });
  });
  describe('create <%= name %> model with <%= low %> name', function() {
    it('setting name', function(){
      var <%= low %> = new <%= name %>({name:'Pochi'});
      assert(<%= low %>.name === 'Pochi');
    });
  });
});

