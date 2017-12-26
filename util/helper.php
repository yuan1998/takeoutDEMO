<?php

function tmport($path){
	require_once(get_path($path));
}

function get_path($path){
	return dirname(__FILE__).'/../'.$path;
}

function s($data=null){
	return ['succes'=>true,'data'=>$data];
}

function e($msg=null,$status=403){
	http_response_code($status);
	return ['succes'=>false,'msg'=>$msg];
}

function json($data){
	header('content-type: appLication/json');
	return json_encode($data);
}

function echoDie($data){
	echo json($data);
	die();
}

function dd($data){
	if(is_array($data)){
		foreach ($data as $col) {
			var_dump($col);
		}
	}else{
		var_dump($data);
	}
	die();
}

function validatePermission($k,$m){

	$exist = function ()use($k,$m){
		$public =
		[
			'cat'=>['read'],'product'=>['read'],
			'user'=>['signup','login','loginout']
		];
		$protected = [
			'cat'=>['test'=>1,'change'=>5,'add'=>5,'del'=>5],
			'user'=>['read'],
			'product'=>['test'=>1,'change'=>5,'add'=>5,'remove'=>5],
			'cart'=>['duplicateAdd'=>1,'getUserCart'=>1,'change'=>1,'del'=>1],
		];
		return ( in_array($m,$public[$k] ?: [])) ?: @$protected[$k][$m];
	};

	$p = @$_SESSION['user']['permission'];

	// $r = $exist();
	return (($r = $exist()) === true) ?: ($r && $r <= $p);

	// return in_array($m,@$public[$k]) ? true : (($v && $v <= $p) ? true : false);
}

function file_config($key){

	if(! $config = @$GLOBALS['_config']){
		$file = file_get_contents(get_path('.config.json'));
		$config = json_decode($file,true);
		$GLOBALS['_config'] = $config;
	}

	return $config[$key];
}

function redriect($url){
	header("Location: $url");
}


function isLogin(){
	return (bool) @$_SESSION['user'];
}

function getUserId(){
	return $_SESSION['user']['id'];
}

function getUsername(){
	return isLogin() ? $_SESSION['user']['username'] : '游客' ;
}

function getUserPermission(){
	return isLogin() ? $_SESSION['user']['permission'] : 0 ;
}

