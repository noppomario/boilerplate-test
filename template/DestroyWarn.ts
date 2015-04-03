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
import u = require('underscore');
*/

class DestroyWarn extends Marionette.Behavior {
  defaults = {
    'message': 'you are destroying!'
  };

  events = {
    'click @ui.destroy': 'warnBeforeDestroy'
  }

  warnBeforeDestroy() {
    alert(this.options.message);
    this.view.destroy();
  }
}

export = DestroyWarn;
