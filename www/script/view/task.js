define(function(require, exports, module) {

    var BaseView = require('view/base');

    var Editable = require('component/editable');

    var Template = require('template/task.tpl');

    var TaskView = BaseView.extend({

        tagName: 'li',

        events: {
            'click .toggle': 'toggleDone',
            'dblclick .view': 'edit',
            'click a.destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        },

        init: function(options) {

            this.options = options;
            this.model = this.options.model;
            this.listModel = this.options.listModel;

            this.render();
        },

        render: function() {

            this.$el.html(Template(this.model));

            var self = this;
            // 初始化元素的即时编辑
            Editable(this.$el.find('[task_detail="1"]'), {
                saved: function(data) {
                    // 数据有变化时
                    self.model['title'] = data;
                }
            });
        },

        toggleDone: function() {
            this.model.toggle();
        },

        // into "editing" mode
        edit: function() {
            this.$el.addClass('editing');
            this.input.focus();
        },

        // Close the "editing" mode
        close: function() {
            var value = this.input.val();
            if (!value) {
                this.clear();
            } else {
                this.model.save({title: value});
                this.$el.removeClass("editing");
            }
        },

        // hit "enter", close "editing" mode
        updateOnEnter: function(e) {
            if (e.keyCode == 13) {
                this.close();
            }
        },

        // Remove the content
        clear: function() {
            this.model.destory();
        }
    });

    module.exports = TaskView;
});
