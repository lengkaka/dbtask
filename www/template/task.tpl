<div task_detail="1">
    <div task_display_wrapper="1">
        <h5 task_display_value="1" class="panel-title" length="{{title.length}}">
            {{#compare title.length '>' 0}}
                {{title}}
            {{else}}
                点击输入内容
            {{/compare}}
        </h5>
    </div>
    <div task_editer_wrapper="1" style="display: none;">
        <input task_edit_value="1" id="new-task" type="text" class="form-control" placeholder="{{#compare title.length '>' 0}}{{title}}{{else}}{{placeHolder}}{{/compare}}">
    </div>
</div>
