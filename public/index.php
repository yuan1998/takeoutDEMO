<?php
session_start();
require_once('../util/helper.php');
tmport('api/cat.php');
tmport('api/user.php');
tmport('api/product.php');
tmport('api/cart.php');
tmport('api/order.php');
tmport('api/location.php');

init();

// $db = new Db('`test`');

// $data = ['tt'=>"红红公"];
// $data = json_encode($data,JSON_UNESCAPED_UNICODE);
// var_dump($data);
// $r = $db->insert(['test'=>$data]);
// var_dump($r);


function init(){
	praseUri();
}

function praseUri(){
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
				return $r !== false ? s($r) :e($msg);
			case '':
				tmport('view/public/home.php');
				die();
			case 'admin':
				if(validateUrlFile(get_path("view/admin/".$uri[1].".php"),5))
					tmport("view/admin/".$uri[1].".php");
				else tmport('view/public/404.php');
				die();
			case 'login':
				tmport('view/public/login.php');
				die();
			case 'signup':
				tmport('view/public/signup.php');
				die();
			case 'loginout':
				User::loginout();
				redriect('/');
				die();
			case 'getUserId':
				return s(@$_SESSION['user']['id']);
			case 'user':
				if(validateUrlFile(get_path("view/user/".$uri[1].".php"),1))
					tmport("view/user/".$uri[1].".php");
				else tmport('view/public/404.php');
				die();
			default:
				tmport('view/public/404.php');
				die();
		} 
	};
	echoDie($result());
}



// $ins = new cat('cat');
// $r =
 // $ins->add(['title'=>'3asdasd']);
// $ins->del(['id'=>1]);


// var_dump($r);