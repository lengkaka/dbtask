<div id="tasklist" class="panel panel-default">

    <div task_list_title="1" class="panel-heading">
        <div task_display_wrapper="1">
            <h3 task_display_value="1" class="panel-title">
            {{#compare title.length ">" 0}}{{title}}{{else}}{{placeHolder}}{{/compare}}
            </h3>
        </div>
        <div task_editer_wrapper="1" style="display: none;">
            <input task_edit_value="1" id="new-task" type="text" class="form-control" placeholder="{{#compare title.length ">" 0}}{{title}}{{else}}{{placeHolder}}{{/compare}}">
        </div>
    </div>

    <div class="panel-body">
        <ul id="task-list"></ul>
        <button id="add_task" type="button" class="btn btn-default">add Task</button>
    </div>
</div>
