define(function(require, exports, module) {

    var TaskListModel = require('model/TaskListModel');

    var TaskListCollection = Backbone.Collection.extend({

        title: '',

        model: TaskListModel,

        localStorage: new Backbone.LocalStorage("tasks-backbone"),

        done: function() {
            return this.where({done: true});
        },

        remaining: function() {
            return this.where({done: false});
        },

        nextOrder: function() {
            if (!this.length) {
                return 1;
            }
            return this.last().get('order') + 1;
        },

        save: function() {
            this.localStorage.save();
        },

        comparator: 'order'
    });

    module.exports = TaskListCollection;
});