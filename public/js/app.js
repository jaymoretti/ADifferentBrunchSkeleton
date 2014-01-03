(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("core/Application", function(exports, require, module) {
require('events/Events');
QuizModel = require('models/QuizModel');
MapsController = require("controllers/MapsController")
ViewController = require("controllers/ViewController");


function Application(){
	var mapsController, viewController;
	if(window.location.href.indexOf("localhost") > -1){
		var ws;function socket() { ws = new WebSocket("ws://127.0.0.1:8080"); ws.onmessage = function ( e ) { var data = JSON.parse(e.data); if ( data.r ) { location.reload(); } }; }setInterval(function () { if ( ws ) { if ( ws.readyState !== 1 ) { socket(); } } else { socket();} }, 1000);
	}
	
	//$.getJSON("http://glass-ally.appspot.com/api/quizzes", function(data){
	//	QuizModel.init("http://glass-ally.appspot.com/api/quizzes/"+data.quizzes[0].id, function(){
		QuizModel.init("data/questions_CA.json", function(){
			QuizModel.inject("current", 1);
			QuizModel.inject("points", 0);
			var mapsController = new MapsController();
			var viewController = new ViewController();
		});
	//});
	$(".play-now").click(function(e){
		e.preventDefault();
		if($(this).attr("data-quiz") == 1){
		//	QuizModel.init("data/questions_CA.json", function(){
		//		QuizModel.inject("current", 1);
		//		QuizModel.inject("points", 0);
				$(document).trigger(Events.PLAY_GAME);
		//	});
		} else if($(this).attr("data-quiz") == 2){
		//	QuizModel.init("data/questions.json", function(){
		//		QuizModel.inject("current", 1);
		//		QuizModel.inject("points", 0);
		//		$(document).trigger(Events.PLAY_GAME);
		//	});
		}
	});
}

Application.prototype = {};
Application.prototype.constructor = Application;

module.exports = Application;
});

;require.register("main", function(exports, require, module) {
Application = require("core/Application");

var app = new Application();
});

;
//# sourceMappingURL=app.js.map