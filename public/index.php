<?php
require_once('../util/helper.php');
tmport('api/cat.php');

$params = array_merge($_GET,$_POST);

$URI = trim($_SERVER['REQUEST_URI'],'/');

$uri = split('[/]',explode('?',$URI)[0]);



$result = function()use($uri,$params){
	switch($uri[0]){
		case 'api':
			if(!validatePermission($uri[1],$uri[2]))
				return e('权限不足.');
			$class = new $uri[1];
			$r = $class->$uri[2]($params,$msg);
			return $r != false ? s($r) :e($msg);
		default:
			tmport('view/404.php');
			die();
	}
};

echoDie($result());

// $ins = new cat('cat');
// $r =
 // $ins->add(['title'=>'3asdasd']);
// $ins->del(['id'=>1]);


// var_dump($r);