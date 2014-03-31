define(function(require, exports, module) {
    var BaseView = require('baseView/base');
    var NavTemplate = require('template/nav.tpl');
    var OperationTemplate = require('template/operation.tpl');
    var HomeView = BaseView.extend({
        actions: {
            'home': 'renderHome'
        },
        events: {
            'click #add_row': 'add',
        },
        init: function() {
            this.$container = $('#app');
        },
        renderHome: function() {

            $('#head').html(NavTemplate());
            $('#head').append(OperationTemplate());
            this.$container.append('<div id="example" class="handsontable"></div>');

            var data = [
                {id: 1, name: {first: 'Joe', last: 'Fabiano'}, ip: '0.0.0.1', email: 'Joe.Fabiano@ex.com'},
                {id: 2, name: {first: 'Fred', last: 'Wecler'}, ip: '0.0.0.1', email: 'Fred.Wecler@ex.com'},
                {id: 3, name: {first: 'Steve', last: 'Wilson'}, ip: '0.0.0.1', email: 'Steve.Wilson@ex.com'},
                {id: 4, name: {first: 'Maria', last: 'Fernandez'}, ip: '0.0.0.1', email: 'M.Fernandez@ex.com'},
                {id: 5, name: {first: 'Pierre', last: 'Barbault'}, ip: '0.0.0.1', email: 'Pierre.Barbault@ex.com'},
                {id: 6, name: {first: 'Nancy', last: 'Moore'}, ip: '0.0.0.1', email: 'Nancy.Moore@ex.com'},
                {id: 7, name: {first: 'Barbara', last: 'MacDonald'}, ip: '0.0.0.1', email: 'B.MacDonald@ex.com'},
                {id: 8, name: {first: 'Wilma', last: 'Williams'}, ip: '0.0.0.1', email: 'Wilma.Williams@ex.com'},
                {id: 9, name: {first: 'Sasha', last: 'Silver'}, ip: '0.0.0.1', email: 'Sasha.Silver@ex.com'},
                {id: 10, name: {first: 'Don', last: 'Pérignon'}, ip: '0.0.0.1', email: 'Don.Pérignon@ex.com'},
                {id: 11, name: {first: 'Aaron', last: 'Kinley'}, ip: '0.0.0.1', email: 'Aaron.Kinley@ex.com'}
            ];

            var self = this;
            $('#example').handsontable({
                data: data,
                width: 800,
                height:600,
                minSpareRows: 1,
                contextMenu: true,
                afterChange: function (changes, source) {
                    if (source !== 'loadData') {
                        console.log(JSON.stringify(changes));
                    }
                },
                colHeaders: ['ID', 'First name', 'Last name', 'IP', 'E-mail'],
                columns: [
                    {data: 'id', type: 'numeric'},
                    {data: 'name.first'},
                    {data: 'name.last'},
                    {data: 'ip'},
                    {data: 'email'}
                ]
            });
            // getData();
            this.handsontableInstance = $('#example').handsontable('getInstance');
            $('#add_row').on('click', function() {
                self.handsontableInstance.alter('insert_row');
            });
        },
        add: function(e) {
            this.handsontableInstance.alert('insert_row');
        }
    });

    module.exports = HomeView;
});
