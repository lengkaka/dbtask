define(function(require, exports, module) {

    var TaskModel = Backbone.Model.extend({

        // Default attributes
        defaults: function() {
            return {
                title: "empty task...",
                done: false
            };
        },

        // Toggle the 'done' state
        toggle: function() {
            this.save({save: !this.get("done")});
        }
    });

    module.exports = TaskModel;
});