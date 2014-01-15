var TASK = TASK || {};

// 配置requirejs
require.config({

    baseUrl: 'www/script/lib/',
    paths: {
        'lib': '.',
        'jquery': 'jquery/jquery',
        'backbone': 'backbone/backbone',
        'localstorage': 'backbone/backbone.localStorage',
        'underscore': 'underscore/underscore',
        'template': '../template',
        'handlebars': 'handlebars/1.0.0/handlebars',
        'handlebars.runtime': 'handlebars/1.0.0/handlebars.runtime',
        'collection': '../collection',
        'model': '../model',
        'view': '../view',
        'component': '../component'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        }
    },
    waitSeconds: 15
});

define(function(require, exports, module) {

    var Router = require('www/script/router/router.js');
    var HomeView = require('www/script/view/home.js');
    var Tasks = require('collection/TaskListCollection');

    $(function() {

        TASK.collection = new Tasks();
        TASK.collection.fetch();

        TASK.router = new Router();
        TASK.homeView = new HomeView();
        Backbone.history.start({pushState: true});
    });

});

