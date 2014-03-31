var TASK = TASK || {};
var appName = 'marketReport';

// config require.js
require.config({
    baseUrl: 'www/script/lib/',
    paths: {
        'lib': '.',
        'jquery': 'jquery/jquery',
        'backbone': 'backbone/backbone',
        'localstorage': 'backbone/backbone.localStorage',
        'underscore': 'underscore/underscore',
        'handlebars': 'handlebars/1.0.0/handlebars',
        'handlebars.runtime': 'handlebars/1.0.0/handlebars.runtime',
        'baseView': '../view',
        'collection': '../collection/' + appName,
        'model': '../model/' + appName,
        'view': '../view/' + appName,
        'template': '../template/' + appName,
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

    //var HomeView = require('www/script/view/dbtask/home.js');
    //var Tasks = require('collection/TaskListCollection');

    var HomeView = require('www/script/view/marketReport/home.js');

    $(function() {
       // TASK.collection = new Tasks();
       // TASK.collection.fetch();


        TASK.router = new Router();
        TASK.homeView = new HomeView();
        Backbone.history.start({pushState: true});
    });

});

