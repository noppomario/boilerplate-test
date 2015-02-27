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
import u = require('underscore');

// import SomeModel = require('./models/Some');
// import Some      = SomeModel.Some;

// import SomeView  = require('./itemviews/SomeView');

class MyApplication extends Marionette.Application {
  initialize(options?: any) {
    console.log('initializing application');
    this.layoutView = new AppLayoutView();
  }

  layoutView: AppLayoutView;
  mainRegion: Marionette.Region;

  onStart() {
    this.mainRegion = new Marionette.Region({ el: '#main' });
    this.layoutView.addRegion('main', this.mainRegion);
    this.layoutView.render();


    //this.mainRegion.show(someview);
  }
}

class AppLayoutView extends Marionette.LayoutView<Backbone.Model> {
  template:(obj?:any)=>string;
  constructor() {
    super({ el: '#mainRegion' });
    this.template = u.template('<div id="main"></div>');
  }

  initialize(options?: any) {
    console.log('initializing layoutview');
  }
}

class MainRouter extends Marionette.AppRouter {
  constructor(options?: Marionette.AppRouterOptions){
    super(options);
  }
}

class MainController extends Marionette.Controller {
  router: MainRouter;
  constructor(options?: any){
    super(options);
  }
  hello(){
    console.log('hello');
  }
}

var controller = new MainController();
var router     = new MainRouter({
  appRoutes: {
    '': 'hello',
  },
  routes: {},
  controller: controller
});

controller.router = router;
Backbone.history.start({pushState:true});

var app: MyApplication = new MyApplication();
app.start();



