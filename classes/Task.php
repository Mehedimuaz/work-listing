<?php

class Task
{
    public static $_dbHelper;

    public function __construct($name, $status = 'active', $id = null)
    {
        $this->name = $name;
        $this->id = $id;
        $this->status = $status;
    }

    public static function get_db_helper()
    {
        if(!isset($_dbHelper))
        {
            try{ // get environment info from .env file
                $env = fopen("./../../.env", "r");
                $env_elements = array();
                while(!feof($env)){
                    $str = explode("=", fgets($env));
                    $env_elements[$str[0]] = trim($str[1]);
                }
                self::$_dbHelper = new mysqli($env_elements["HOST"], $env_elements["USERNAME"], $env_elements["PASSWORD"], $env_elements["DBNAME"]);
            }
            catch (Exception $exception){
                return false;
            }
        }
        return self::$_dbHelper;
    }

    public static function get($id)
    {
        // fetch from db
        // create a Task object and set values
        // return the object
        try
        {
            $result = Task::get_db_helper()->query("select * from tasks where id='{$id}'");
            $task = new stdClass();
            if($result->num_rows > 0){
                $new_task = $result->fetch_assoc();
                $task = new Task($new_task['name'], $new_task['status'], $new_task['id']);
            }
            return $task;
        }
        catch (Exception $exception)
        {
            return $exception;
        }
    }

    public function save()
    {
        // create or update an object (depending on whether it has an id)
        // if create, set the id
        $db = Task::get_db_helper();
        $query = null;
        if(!isset($this->id))
        {
            $query = "insert into tasks (name) values ('{$this->name}')";
        }
        else {
            $query = "update tasks set name = '{$this->name}', status = '{$this->status}' where id = '{$this->id}'";
        }
        try{
            $db->query($query);
            $last_id = !isset($this->id)? $db->insert_id: $this->id;
            return Task::get($last_id);
        }
        catch (Exception $exception)
        {
            return $exception;
        }
    }

    public static function delete($id)
    {
        // delete the entry from db
        // return ok
        try
        {
            Task::get_db_helper()->query("delete from tasks where id='{$id}'");
            $result = true;
            return $result;
        }
        catch(Exception $exception)
        {
            return false;
        }
    }

    public static function get_list($status = 'any')
    {
        // fetch the list from db and make an array of objects
        // return the list
        $query = null;
        if($status == 'active' || $status == 'completed')
        {
            $query = "select * from tasks where status='{$status}' order by id desc";
        }
        else {
            $query = "select * from tasks order by id desc";
        }
        $result = Task::get_db_helper()->query($query);
        $tasks = Array();
        while($row = $result->fetch_object()){
            $tasks[] = $row;
        }
        return $tasks;
    }
}

