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

module <%= names %>Router {
  'use strict';

  class <%= names %>Controller extends Marionette.Object {
    router: Marionette.AppRouter;

    constructor(options?:any){
      super();
    }

    hello(){
      console.log('It\'s <%= names %> Router');
    }

    helloId(_id:string){
      var modelId = parseInt(_id, 10);
      console.log('It\'s <%= names %> Router', modelId);
    }
  }

  export function start(options?:any){
    var <%= low %>Controller = new <%= names %>Controller(options);
    var <%= low %>Router     = new Marionette.AppRouter({
      appRoutes: {
        '<%= low %>': 'hello',
        '<%= low %>/:id': 'helloId',
      },
      routes: {},
      controller: <%= low %>Controller
    });

    <%= low %>Controller.router = <%= low %>Router;
  }
}

export = <%= names %>Router;

