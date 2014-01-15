define(function(require, exports, module) {

    function editable($selector, options) {

        var $editableSelectors = $selector;
        if (!$editableSelectors.length) {
            return false;
        }

        if (!_.isObject(options)) {
            options = {};
        }

        // 对所有可编辑的field做配置
        $editableSelectors.each(function() {

            var $display_wrapper = $(this);

            _handle_text($display_wrapper);
        });

        function _handle_text($content_wrapper) {

            var form_element = 'input';

            var $display_wrapper = _get_display_wrapper($content_wrapper);
            var $display_value_element = _get_display_value_element($display_wrapper);

            var $edit_wrapper = _get_edit_wrapper($content_wrapper);
            var $edit_value_element = _get_edit_value_element($edit_wrapper);

            // 当前内容
            var get_old_text = function() {
                return $.trim($display_value_element.text());
            };

            // 编辑后的内容
            var get_new_text = function() {
                return $.trim($edit_value_element.val());
            };

            // 显示实时编辑输入框
            var show_edit_wrapper = function() {

                var text = get_old_text();
                $display_wrapper.hide();
                $edit_wrapper.show();

                if (text == '点击输入内容') {
                    text = '';
                }
                // 这个text应该是实际的内容
                $edit_value_element.val(text).focus();
            };

            // 显示编辑后正常的内容
            var show_display_wrapper = function(text) {

                $edit_wrapper.hide();
                $edit_value_element.text(text);

                $display_value_element.text(text);
                $display_wrapper.show();
            };

            // 保存编辑后的新值
            var save_new_value = function() {
                // 组织要提交的数据
                var new_text = get_new_text();

                if (!new_text) {
                    new_text = '点击输入内容';
                }

                show_display_wrapper(new_text);
                if (_.isFunction(options.saved)) {
                    options.saved(new_text);
                }
            };

            var old_value = get_old_text();

            $display_wrapper.on('click', function(e) {
                show_edit_wrapper();
            });

            $edit_value_element.on('blur', function() {
                save_new_value();
            });
        }

        function _get_display_wrapper($content_wrapper) {
            return $content_wrapper.find('[task_display_wrapper]');
        }

        function _get_display_value_element($display_wrapper) {
            return $display_wrapper.find('[task_display_value]');
        }

        function _get_edit_wrapper($content_wrapper) {
            return $content_wrapper.find('[task_editer_wrapper]');
        }

        function _get_edit_value_element($edit_wrapper) {
            return $edit_wrapper.find('[task_edit_value]');
        }
    }

    module.exports = editable;
});