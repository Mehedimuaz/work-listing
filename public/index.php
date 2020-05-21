<html>
<head>
    <link rel="stylesheet" href="./css/bootstrap.min.css">
    <link rel="stylesheet" href="css/custom.css">
</head>
<body>




<div class="offset-sm-4 col-sm-4 pt-5">
    <div class="card text-center">
        <div class="card-header">
            <input class="form-control" id="taskInput" type="text" placeholder="What needs to be done?">
        </div>
        <div class="card-body">
            <div class="text-left">
                <table id="taskTable" class="table">
                    <tbody>
                    </tbody>
                </table>
            </div>

        </div>
        <div class="card-footer text-muted clearfix">
            <span id="activeCounter" class="badge badge-light float-left pt-2"></span>
            <a href="#" id="statusAny" class="badge" onclick="setTaskTable('any');">All</a>
            <a href="#" id="statusActive" class="badge" onclick="setTaskTable('active');">Active</a>
            <a href="#" id="statusCompleted" class="badge" onclick="setTaskTable('completed');">Completed</a>
            <a href="#" class="badge badge-light float-right pt-2" onclick="clearCompleted();">Clear completed</a>
        </div>
    </div>
</div>



<script src="js/jquery-3.5.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/custom.js"></script>
</body>
</html>