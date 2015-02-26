///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/underscore/underscore.d.ts" />
///<reference path="../typings/backbone/backbone.d.ts" />
///<reference path="../typings/marionette/marionette.d.ts" />
///<reference path="../typings/browserify/browserify.d.ts" />
'use strict';
<% low = names.replace(/^./,function(e){ return e.toLowerCase(); }) %>
import $ = require('jquery');
import Backbone = require('backbone');
Backbone.$ = $;
import Marionette = require('backbone.marionette');
import u = require('underscore');

import <%= name %>Model = require('../models/<%= name %>');
import <%= name %> = <%= name %>Model.<%= name %>;
import <%= names %> = require('../collections/<%= names %>');

import <%= name %>View = require('../itemviews/<%= name %>View');

class <%= names %>View extends Marionette.CompositeView<<%= name %>> {
  behaviors: any;
  template: (obj?:any)=>string;

  constructor(options?: any) {
    this.childView = <%= name %>View;
    this.childViewContainer = 'div';
    this.tagName = 'div';
    this.className = '<%= low %>Container';
    this.template = require('../../templates/<%= names %>View.html');
    this.ui = {
    };
    this.triggers = {
    };
    this.collectionEvents = {
      //'sync': 'render',
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

