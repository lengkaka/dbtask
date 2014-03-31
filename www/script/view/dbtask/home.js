define(function(require, exports, module) {

    var BaseView = require('baseView/base');
    var AppView = require('view/app');
    // The HomeView
    var HomeView = BaseView.extend({

        actions: {
            'home': 'renderHome'
        },

        init: function() {
            this.$container = $('#app');
        },

        render: function(view) {
            if (_.isObject(view) && _.isObject(view.el)) {
                this.$container.html(view.el);
            }
        },

        renderHome: function() {

            console.log('renderHome');
            this.render(new AppView());
        }
    });

    module.exports = HomeView;
});
