///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/underscore/underscore.d.ts" />
///<reference path="../typings/backbone/backbone.d.ts" />
///<reference path="../typings/marionette/marionette.d.ts" />
///<reference path="../typings/browserify/browserify.d.ts" />
'use strict';

import $ = require('jquery');
import Backbone = require('backbone');
Backbone.$ = $;
import Marionette = require('backbone.marionette');

class <%= name %>LayoutView extends Marionette.LayoutView<Backbone.Model> {
  template:(obj?:any) => string;
  constructor(options?: any) {
    super(options);
    this.template = require('../../templates/<%= name %>LayoutView.ejs');
    this.addRegions({
    });
  }

  // initialize(options?: any) {
  // }
}

export = <%= name %>LayoutView;
