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

module <%= names %>Router {
  'use strict';

  class <%= names %>Controller extends Marionette.Object {
    router: Marionette.AppRouter;

    constructor(options?:any){
      super();
    }

    hello():void{
      console.log('It\'s <%= names %> Router');
    }

    helloId(_id:string):void{
      var modelId = parseInt(_id, 10);
      console.log('It\'s <%= names %> Router', modelId);
    }
  }

  export function start(options?:any):void{
    var <%= lows %>Controller = new <%= names %>Controller(options);
    var <%= lows %>Router     = new Marionette.AppRouter({
      appRoutes: {
        '<%= lows %>': 'hello',
        '<%= lows %>/:id': 'helloId',
      },
      routes: {},
      controller: <%= lows %>Controller
    });

    <%= lows %>Controller.router = <%= lows %>Router;
  }
}

export = <%= names %>Router;

