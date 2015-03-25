///<reference path="../typings/mocha/mocha.d.ts" />
///<reference path="../typings/power-assert/power-assert.d.ts" />

'use strict';

import assert = require('power-assert');

import <%= name %>LayoutView = require('../layoutviews/<%= name %>LayoutView');

describe('create <%= name %> layout-view', function() {
  beforeEach(function() {
  });
  describe('create <%= name %> layout-view', function() {
    it('normal make', function() {
      var <%= low %>LayoutView = new <%= name %>LayoutView();
      assert(<%= low %>LayoutView instanceof <%= name %>LayoutView);
    });
  });
});

