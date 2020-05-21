<?php

require __DIR__ . '/../../vendor/autoload.php';

$method = $_SERVER["REQUEST_METHOD"];
$task = null;
$id = null;
$name = null;
$status = null;
$clear = false;
if(isset($_REQUEST["task"]))
{
    $task = $_REQUEST["task"];
}

if(isset($_REQUEST["id"]))
{
    $id = $_REQUEST["id"];
}
if(isset($_REQUEST["status"]))
{
    $status = $_REQUEST["status"];
}
if(isset($_REQUEST["name"]))
{
    $name = $_REQUEST["name"];
}
if(isset($_REQUEST["clear"]))
{
    $clear = $_REQUEST["clear"];
}

if($method == 'POST')
{
    if($clear) // clear completed tasks
    {
        if($id == null)
        {
            $tasks = Task::get_list('completed'); // getting all completed tasks
            $success = true;
            foreach ($tasks as $task)
            {
                if(!Task::delete($task->id))
                {
                    $success = false;
                }
            }
            echo json_encode($success);
        }
        else{
            $success = true;
            if(!Task::delete($id))
            {
                $success = false;
            }
            echo json_encode($success);
        }
    }
    else if($id == null) // insert
    {
        try
        {
            $task = new Task($_REQUEST["name"]);
            $result = $task->save();
            echo json_encode($result);
        }
        catch (Exception $exception)
        {
            echo json_encode($exception);
        }
    }
    else if($id != null) // edit
    {
        $task = Task::get($id);
        if(isset($name))
        {
            $task->name = $name;
        }
        if(isset($status))
        {
            $task->status = $status;
        }
        echo json_encode($task->save());
    }
}
else if($method == 'GET')
{
    echo json_encode(Task::get_list($status));
}
//echo 'h';
