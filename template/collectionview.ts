///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/underscore/underscore.d.ts" />
///<reference path="../typings/backbone/backbone.d.ts" />
///<reference path="../typings/marionette/marionette.d.ts" />
///<reference path="../typings/browserify/browserify.d.ts" />

'use strict';

import <%= name %> = require('./<%= name %>');
import <%= names %> = require('./<%= names %>');

import <%= name %>View = require('./<%= name %>View');

class <%= names %>View extends Marionette.CollectionView<<%= name %>> {
  behaviors: any;

  constructor(options?: any) {
    this.childView = <%= name %>View;
    this.tagName = 'div';
    this.className = '<%= lows %>Container';
    this.ui = {
    };
    this.triggers = {
    };
    this.collectionEvents = {
      // 'sync': 'render',
    };
    this.modelEvents = {
    };
    this.childEvents = {
    };
    this.behaviors = {
    };

    options = options || {};

    super(options);
  }
};

export = <%= names %>View;

