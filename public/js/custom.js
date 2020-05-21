let status = 'any';
let apiURL = 'api/Work_listing.php';

function buildTable(data)
{
    $("table tbody:first-child").empty();
    for(let i = 0; i < data.length; i++)
    {
        let rowID = 'tr_' + data[i].id;
        let row = $('<tr>', {id: rowID});
        let firstCol = $('<td>');
        let checkDiv = $('<div>', {"class": "round"});
        let checkboxID = 'ch_' + data[i].id;
        let checkboxAttr = {id: checkboxID, "type": "checkbox"};

        let checkbox = $('<input>', checkboxAttr);
        let checkboxLabel = $('<label>', {"for": checkboxID});
        if(data[i].status === 'completed')
        {
            $(checkbox).attr('checked', true);
            $(checkbox).attr('disabled', true);
        }
        else if(data[i].status === 'active')
        {
            $(checkbox).attr('onclick', 'markAsComplete(this.id)');
        }
        $(checkDiv).append(checkbox, checkboxLabel);
        $(firstCol).append(checkDiv);

        let secondColID = 'td2_' + data[i].id;
        let secondCol = $('<td>');
        let taskSpan = $('<span>', {id: secondColID});
        if(data[i].status === 'active')
        {
            $(taskSpan).attr('ondblclick', 'editTask(this.id);');
            $(taskSpan).attr('class', 'active');
        }
        else if(data[i].status === 'completed')
        {
            $(taskSpan).attr('class', 'completed');
        }
        let spanContent = data[i].name;
        if(data[i].status === 'completed')
        {
            spanContent = '<del>' + data[i].name + '</del>';
        }
        taskSpan.append(spanContent);
        secondCol.append(taskSpan);

        let thirdCol = $('<td>');
        let crossBtnID = 'crs_' + data[i].id;
        let crossBtn = $('<button>', {id: crossBtnID, "class": "close cross-button", "aria-label": "Close", "onclick": "deleteTask(this.id)"});
        crossBtn.append('<span aria-hidden="true">&times;</span>');
        thirdCol.append(crossBtn);

        row.append(firstCol, secondCol, thirdCol);
        $("table tbody:first-child").append(row);
    }

}

function markAsComplete(id)
{
    let splitID = id.split("_");
    let taskID = splitID[1];
    $.post(apiURL, {id: taskID, status: "completed"}, function(data, responseStatus){
        if(responseStatus === 'success')
        {
            setTaskTable(status);
        }
    });
}

function editTask(id)
{
    let taskSpan = document.getElementById(id);
    let taskEditBoxID = 'edit_' + id;
    let taskEditBox = $('<input>', {id: taskEditBoxID, 'class': 'form-control task-edit', 'onkeypress': 'updateTask(event, this.id)'});
    $(taskEditBox).val($(taskSpan).html());
    $(taskSpan).empty();
    $(taskSpan).append(taskEditBox);
}

function setLabelClass()
{
    let statusAny = document.getElementById('statusAny');
    let statusActive = document.getElementById('statusActive');
    let statusCompleted = document.getElementById('statusCompleted');

    if($(statusAny).hasClass('badge-light'))
    {
        $(statusAny).toggleClass('badge-light', function(){}, false);
    }
    if($(statusAny).hasClass('badge-dark'))
    {
        $(statusAny).toggleClass('badge-dark', function(){}, false);
    }
    if($(statusActive).hasClass('badge-light'))
    {
        $(statusActive).toggleClass('badge-light', function(){}, false);
    }
    if($(statusActive).hasClass('badge-dark'))
    {
        $(statusActive).toggleClass('badge-dark', function(){}, false);
    }
    if($(statusCompleted).hasClass('badge-light'))
    {
        $(statusCompleted).toggleClass('badge-light', function(){}, false);
    }
    if($(statusCompleted).hasClass('badge-dark'))
    {
        $(statusCompleted).toggleClass('badge-dark', function(){}, false);
    }

    if(status === 'any')
    {
        $(statusAny).addClass('badge-dark');
        $(statusActive).addClass('badge-light');
        $(statusCompleted).addClass('badge-light');
    }
    else if(status === 'active')
    {
        $(statusAny).addClass('badge-light');
        $(statusActive).addClass('badge-dark');
        $(statusCompleted).addClass('badge-light');
    }
    else if(status === 'completed')
    {
        $(statusAny).addClass('badge-light');
        $(statusActive).addClass('badge-light');
        $(statusCompleted).addClass('badge-dark');
    }
}

function setActiveCount()
{
    let message = "";
    let activeTaskCount = 0;
    $.get(apiURL, {status: 'active'}, function(data, status){
        data = JSON.parse(data);
        activeTaskCount = data.length;
        if(activeTaskCount <= 1)
        {
            message = " item left";
        }
        else if(activeTaskCount > 1)
        {
            message = " items left";
        }
        document.getElementById("activeCounter").textContent = activeTaskCount + message;
    });
}

function setupPage(data)
{
    data = JSON.parse(data);
    buildTable(data);
    setActiveCount();
    setLabelClass();
}

function setTaskTable(selectedStatus = 'any')
{
    status = selectedStatus;
    $.get(apiURL, {status: status}, function(data, status){
        console.log(data);
        console.log(status);
        setupPage(data);
    });

}

function clearCompleted()
{
    $.post(apiURL, {clear: true}, function(data, responseStatus){
        if(responseStatus === 'success')
        {
            setTaskTable(status);
        }
    });
}

$(function () {
    setTaskTable();
});

$('#taskInput').keypress(function(event){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        $.post(apiURL, {name: $('#taskInput').val()}, function(data, responseStatus){
            if(responseStatus === 'success')
            {
                setTaskTable(status);
            }
            $('#taskInput').val("");
        });
    }
});

function updateTask(event, id){
    let keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        let editParse = id.split('_');
        let inputBox = document.getElementById(id);
        $.post(apiURL, {id: editParse[2], name: $(inputBox).val()}, function(data, responseStatus){
            if(responseStatus === 'success')
            {
                setTaskTable(status);
            }
        });
    }
}

function deleteTask(id)
{
    let deleteParse = id.split('_');
    $.post(apiURL, {id: deleteParse[1], clear: true}, function(data, responseStatus){
        if(responseStatus === 'success')
        {
            setTaskTable(status);
        }
    });
}
