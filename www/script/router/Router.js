var TASK = TASK || {};

define(function(require, exports, module) {

    var Router = Backbone.Router.extend({

        action: '',
        params: {},

        routes: {
            '*path': 'home',
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
