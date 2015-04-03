///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/underscore/underscore.d.ts" />
///<reference path="../typings/backbone/backbone.d.ts" />
///<reference path="../typings/marionette/marionette.d.ts" />
///<reference path="../typings/browserify/browserify.d.ts" />

'use strict';

/*
import $ = require('jquery');
import Backbone = require('backbone');
Backbone.$ = $;
import Marionette = require('backbone.marionette');
*/

import <%= name %> = require('./<%= name %>');
import <%= names %> = require('./<%= names %>');

import <%= name %>View = require('./<%= name %>View');

class <%= names %>View extends Marionette.CompositeView<<%= name %>> {
  behaviors: any;
  template: (obj?:any) => string;

  constructor(options?: any) {
    this.childView = <%= name %>View;
    this.childViewContainer = 'div';
    this.tagName = 'div';
    this.className = '<%= lows %>Container';
    this.template = require('../../templates/<%= names %>View.ejs');
    this.ui = {
    };
    this.triggers = {
    };
    this.collectionEvents = {
      'sync': 'render',
    };
    this.modelEvents = {
    };
    this.childEvents = {
    };

    options = options || {};

    super(options);
  }
};

export = <%= names %>View;

