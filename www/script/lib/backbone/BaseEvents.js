define(function(require, exports, module) {

    var BaseEvents = {
        bind : function(ev, callback, context) {
            var bus = this.eventBus || (this.options && this.options.eventBus);
            if (bus) {
                bus.bind(ev, callback, context);

                return this;
            } else {
                Backbone.Events.bind.call(this, ev, callback, context);
                return this;
            }
        },

        unbind : function() {
            var bus = this.eventBus || (this.options && this.options.eventBus);
            if (bus) {
                bus.unbind.apply(this, _.toArray(arguments));
                return this;
            } else {
                Backbone.Events.unbind.apply(this, _.toArray(arguments));
                return this;
            }
        },

        on: function() {
            this.bind.apply(this, _.toArray(arguments));
        },

        off: function() {
            this.unbind.apply(this, _.toArray(arguments));
        },

        trigger : function(eventName) {
            var bus = this.eventBus || (this.options && this.options.eventBus);
            if (bus) {
                bus.trigger.apply(bus, arguments);
                return this;
            } else {
                Backbone.Events.trigger.apply(this, arguments);
                return this;
            }
        }
    };

    // module.exports = BaseView;

    return BaseEvents;
});
