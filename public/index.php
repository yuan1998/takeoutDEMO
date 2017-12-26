<?php
session_start();
require_once('../util/helper.php');
tmport('api/cat.php');
tmport('api/user.php');
tmport('api/product.php');
tmport('api/cart.php');

init();


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
			case 'buy':
				tmport('view/user/buy.php');
				die();
			case 'admin':
				$permission = getUserPermission();
				if(!($permission > 5))
					redriect('404');
				tmport('view/admin/'.$uri[1].'.php');
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