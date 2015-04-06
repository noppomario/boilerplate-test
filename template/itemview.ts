///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/underscore/underscore.d.ts" />
///<reference path="../typings/backbone/backbone.d.ts" />
///<reference path="../typings/marionette/marionette.d.ts" />
///<reference path="../typings/browserify/browserify.d.ts" />

'use strict';

import <%= name %> = require('./<%= name %>');

class <%= name %>View extends Marionette.ItemView<<%= name %>> {
  behaviors: any;
  template: (obj?:any) => string;

  constructor(options?: any) {
    this.tagName = 'div';
    this.className = '<%= low %>Container';
    this.template = require('./<%= name %>View.ejs');
    this.ui = {
    };
    this.triggers = {
    };
    this.modelEvents = {
      change: 'render',
    };
    this.behaviors = {
    };

    options = options || {};

    super(options);
  }
};

export = <%= name %>View;

