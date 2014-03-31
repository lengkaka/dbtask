define(function(require, exports, module) {

    var BaseView = require('baseView/base');
    var TaskView = require('view/task');

    var Template = require('template/listpanel.tpl');

    var TaskModel = require('model/TaskModel');

    var Editable = require('component/editable');

    var listPanel = BaseView.extend({

        tagName: 'div',

        className: 'task_list',

        events: {
            'keypress #new-task': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete',
            'click #add_task': 'addNewTask'
        },

        init: function(options) {

            this.options = options;
            this.model = this.options.model;
            this.render();
        },

        render: function() {

            this.$el.html(Template(this.model.toJSON()));

            this.input = this.$el.find('#new-task');
            this.footer = this.$el.find('footer');
            this.main = this.$el.find('#main');

            this.renderTasks();

            var self = this;
            // 初始化元素的即时编辑
            Editable(this.$el.find('[task_list_title="1"]'), {
                saved: function(data) {
                    // 数据有变化时
                    self.model.save({title: data});
                    self.render();
                }
            });
        },

        renderTasks: function() {
            var tasks = this.model.get('tasks');
            if (_.isUndefined(tasks)) {
                tasks = [];
                this.model.set({tasks: tasks});
            }
            // 渲染任务列表
            _.each(tasks, this.addOne, this);
        },

        addOne: function(task) {
            var view = new TaskView({model: task, listModel: this.model});
            this.$el.find('#task-list').append(view.el);
        },

        createOnEnter: function(e) {

            if (e.keyCode != 13) return;

            var val = this.input.val();
            if (!val) return;

            var newTaskModel = new TaskModel({title: val});
            this.input.val('');
        },

        addNewTask: function() {

            var tasks = this.model.get('tasks');
            if (_.isUndefined(tasks)) {
                tasks = [];
            }

            // 增加一个空得task
            tasks.push({});
            this.model.save({tasks: tasks});

            this.$el.find('#task-list').html('');

            // 渲染任务列表
            _.each(tasks, this.addOne, this);

            // TODO, 最新的task处于 编辑状态
            this.$el.find('#task-list').children().last().find('[task_display_wrapper]').click();
        },

        clearCompleted: function() {
            _.invoke(Tasks.done(), 'destroy');
            return false;
        },

        toggleAllComplete: function() {
            var done = this.allCheckbox.checked;
            Todos.each(function(task) { todo.save({done: done}); });
        }
    });

    module.exports = listPanel;
});
