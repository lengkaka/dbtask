define(function(require, exports, module) {

    var __viewCache = {};

    var BaseView = Backbone.View.extend({
        tagName: 'div',
        initialize: function(options) {

            this._bindActions();

            if (_.isFunction(this.init)) {
                this.init.apply(this, arguments);
            }
        },

        navigate: function(link) {
            _.defer(function(link) {
                TASK.router.navigate(link, {trigger: true, replace: true});
            });
        },

        /**
         * action map operation
         * backbone匹配路由后，会触发 'route:action'，所以，监听，即可进入事件处理
         */
        _bindActions: function() {

            if (_.isArray(this.actions)) {
                _(this.actions).each(function(func) {
                    this.listenTo(TASK.router, 'route:' + func, this[func]);
                }, this);
            } else if (_.isObject(this.actions)) {
                _(this.actions).each(function(func, route) {
                    this.listenTo(TASK.router, 'route:' + route, this[func]);
                }, this);
            }
        },

        /**
         * 创建一个view对象
         *
         * @param function View view对象构造函数
         * @param object params 传给构造函数的参数
         * @param object options 配置
         *  + unique 对象是否唯一
         * @return object
         */
        create: function(View, params, options) {

            if (!_.isObject(options)) {
                options = {};
            }

            var cid = this.cid;
            // 如果要求对象唯一且有缓存，销毁之前缓存中的所有view对象
            if (!_.isEmpty(__viewCache[cid]) && options.unique) {
                _.each(__viewCache[cid], function(view) {
                    if (view instanceof View) {
                        this.undelegateEvents();
                        this.remove();
                    }
                });
            }

            if (_.isUndefined(__viewCache[cid])) {
                __viewCache[cid] = [];
            }
            var view = new View(params);
            __viewCache[cid].push(view);

            return view;
        },

        /**
         * cleanup
         * 清理工作
         */
        cleanup: function() {

            _.defer(function(cid) {
                if (_.isArray(__viewCache[cid])) {
                    _.each(__viewCache[cid], function(view, index) {
                        if (_.isFunction(view.cleanup)) {
                            view.cleanup();
                        } else {
                            view.undelegateEvents();
                            view.remove();
                        }
                        __viewCache[cid][index] = null;
                    });

                    __viewCache[cid] = null;
                    delete __viewCache[cid];
                }
            }, this.cid);
            this.undelegateEvents();
            this.remove();
        }
    });

    module.exports = BaseView;
});