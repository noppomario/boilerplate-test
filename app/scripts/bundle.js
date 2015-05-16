/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="./typings/jquery/jquery.d.ts" />
	///<reference path="./typings/underscore/underscore.d.ts" />
	///<reference path="./typings/backbone/backbone.d.ts" />
	///<reference path="./typings/marionette/marionette.d.ts" />
	///<reference path="./typings/browserify/browserify.d.ts" />
	'use strict';
	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	if (window.__agent) {
	    window.__agent.start(Backbone, Marionette);
	}
	var AppRouter = __webpack_require__(1);
	var Application = (function (_super) {
	    __extends(Application, _super);
	    function Application() {
	        console.log('initializing application');
	        _super.call(this);
	        this.addRegions({
	            MainRegion: '#main',
	        });
	        AppRouter.start();
	        if (Backbone.history) {
	            Backbone.history.start({ pushState: true });
	        }
	    }
	    return Application;
	})(Marionette.Application);
	exports.Application = Application;
	(function () {
	    var app = new Application();
	    app.start();
	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	///<reference path="../typings/jquery/jquery.d.ts" />
	///<reference path="../typings/underscore/underscore.d.ts" />
	///<reference path="../typings/backbone/backbone.d.ts" />
	///<reference path="../typings/marionette/marionette.d.ts" />
	///<reference path="../typings/browserify/browserify.d.ts" />
	'use strict';
	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var AppRouter;
	(function (AppRouter) {
	    'use strict';
	    var AppController = (function (_super) {
	        __extends(AppController, _super);
	        function AppController() {
	            _super.call(this);
	        }
	        AppController.prototype.hello = function () {
	            console.log('It\'s App Router');
	        };
	        return AppController;
	    })(Marionette.Object);
	    function start() {
	        var appController = new AppController();
	        var appRouter = new Marionette.AppRouter({
	            appRoutes: {
	                '': 'hello',
	            },
	            routes: {},
	            controller: appController
	        });
	        appController.router = appRouter;
	    }
	    AppRouter.start = start;
	})(AppRouter || (AppRouter = {}));
	module.exports = AppRouter;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map