var TASK = TASK || {};

define(function(require, exports, module) {

    var Router = Backbone.Router.extend({

        action: '',
        params: {},

        routes: {
<<<<<<< HEAD:www/script/router/router.js
            '*path': 'home'
=======
            '*path': 'home',
>>>>>>> 62a8681306c08253bb41fb41e1a6646d568b62f1:www/script/router/Router.js
        },

        // 一旦路由匹配上了，做些操作
        initialize: function() {
            _.each(this.routes, function(action, route) {
                this.on('route:' + action, function() {

                    console.log('action: ' + action);
                    this.params = {};
                    var _arguments = arguments;
                }, this);
            }, this);
        },
    });

    module.exports = Router;
});
