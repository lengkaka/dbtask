define(function(require, exports, module) {

    var TaskModel = Backbone.Model.extend({

        // Default attributes
        defaults: function() {
            return {
                placeHolder: "请输入任务列表标题",
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
