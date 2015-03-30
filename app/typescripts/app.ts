///<reference path="./typings/jquery/jquery.d.ts" />
///<reference path="./typings/underscore/underscore.d.ts" />
///<reference path="./typings/backbone/backbone.d.ts" />
///<reference path="./typings/marionette/marionette.d.ts" />
///<reference path="./typings/browserify/browserify.d.ts" />
'use strict';

import $ = require('jquery');
import Backbone = require('backbone');
Backbone.$ = $;
import Marionette = require('backbone.marionette');

// for Marionette Inspector
interface Window{
  __agent: any;
}

declare var window:Window;

if (window.__agent){
  window.__agent.start(Backbone, Marionette);
}

import AppRouter = require('./routers/AppRouter');


export class Application extends Marionette.Application {
  MainRegion: Marionette.Region;

  constructor() {
    console.log('initializing application');
    super();

    this.addRegions({
      MainRegion: '#main',
    });

    AppRouter.start();

    if ( Backbone.history ){
      Backbone.history.start({pushState:true});
    }
  }
  /*
  onStart() {
  }
  */
}

(function():void{
  var app: Application = new Application();
  app.start();
})();


