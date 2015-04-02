///<reference path="../typings/jquery/jquery.d.ts" />
///<reference path="../typings/underscore/underscore.d.ts" />
///<reference path="../typings/backbone/backbone.d.ts" />
///<reference path="../typings/marionette/marionette.d.ts" />
///<reference path="../typings/browserify/browserify.d.ts" />
'use strict';


//import $ = require('jquery');
//import Backbone = require('backbone');
//Backbone.$ = $;
//import Marionette = require('backbone.marionette');

module AppRouter {
  'use strict';

  class AppController extends Marionette.Object {
    router: Marionette.AppRouter;

    constructor(){
      super();
    }

    hello():void{
      console.log('It\'s App Router');
    }
  }

  export function start():void{
    var appController = new AppController();
    var appRouter     = new Marionette.AppRouter({
      appRoutes: {
        '': 'hello',
      },
      routes: {},
      controller: appController
    });
    appController.router = appRouter;
  }
}

export = AppRouter;

