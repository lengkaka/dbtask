define(function(require, exports, module) {

    var BaseView = require('view/base');
    var ListView = require('view/list');

    var AddTaskListButtonTemplate = require('template/addNewTaskListButton.tpl');
    var TaskListModel = require('model/TaskListModel');

    // The Application
    var AppView = BaseView.extend({

        tagName: 'div',
        className: 'app_task_lists',

        events: {
            'click #add_empty_panel': 'addEmptyTaskList'
        },

        init: function() {

            // 首选获取列表
            this.lists = TASK.collection;
            this.render();


            this.listenTo(this.lists, 'all', this.saveToLocalStorage);
            this.listenTo(this.lists, 'add', this.render);
        },

        render: function() {

            this.$el.html('');
            _.each(this.lists.models, this.renderTaskList, this);
            this.renderAddTaskListButton();
        },

        // 渲染一个任务列表
        renderTaskList: function(taskListModel) {
            var listView = this.create(ListView, {model: taskListModel});
            this.$el.append(listView.el);
        },

        renderAddTaskListButton: function() {
            this.$el.append(AddTaskListButtonTemplate());
        },

        /**
         * 新创建一个 任务列表
         * 用户自定义 title 和 内容
         *
         */
        addEmptyTaskList: function() {
            var listSetting = {
                title: '点击输入内容',
            };

            var newTaskListModel = new TaskListModel({title: listSetting.title});
            this.lists.create(newTaskListModel);
        },

        saveToLocalStorage: function() {
            // 同步到本地
            // TASK.collection.save();
        }
    });

    module.exports = AppView;
});