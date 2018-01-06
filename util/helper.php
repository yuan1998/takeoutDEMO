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

function dd(){
	$data = func_get_args();
	foreach ($data as $col) {
			var_dump($col);
	}
	die();
}

function validatePermission($k,$m){
	$exist = function ()use($k,$m){
		$public =
		[
			'cat'=>['read','getCount'],'product'=>['read','getCount'],
			'user'=>['signup','login','loginout'],
			'order'=>['getCount']
		];
		$protected = [
			'cat'=>['test'=>1,'change'=>5,'add'=>5,'del'=>5],
			'user'=>['read'=>1,'getUserData'=>1], 
			'product'=>['test'=>1,'change'=>5,'add'=>5,'del'=>5],
			'cart'=>['duplicateAdd'=>1,'getUserCart'=>1,'change'=>1,'del'=>1],
			'order'=>['createOrder'=>1,'getUserOrder'=>1,'conditionRead'=>1,'payClose'=>1,'puyComplete'=>1,'read'=>5,'change'=>5],
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
function getUser($cond = null){
	return $cond ? $_SESSION['user'] : $_SESSION['user'][$cond];

}

function getUserPermission(){
	return isLogin() ? $_SESSION['user']['permission'] : 0 ;
}

function moveFile($name,&$data){
	$file = @$_FILES[$name];
	if(!$file['tmp_name'])
		return false;
	$typeArr = array(
             'image/jpeg' =>'.jpg',
             'image/png' =>'.png',
             'image/gif' =>'.gif',
        );
	$tmpName = $file['tmp_name'];
	$fileName = time().'0'.rand(0,9);
	$fileType = $typeArr[$file['type']];
	$name = $fileName.$fileType;
	var_dump($tmpName);
	if(!move_uploaded_file($tmpName,get_path("public/storage/files/$name"))){
		return false;
	}
	$data = ['name'=>$name];
	return true;
}
function validateUrlFile($path,$per = 0){
	if(!is_file($path))
		return false;
	if($per != 0){
		if(!(getUserPermission() >= $per)){
			return false;
		}
	}
	return true;
}

