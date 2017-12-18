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

function e($msg=null){
	if(is_callable($msg))
		$msg = $msg();
	return ['succes'=>false,'msg'=>$msg];
}

function json($data){
	header('ContentType: appLication/json');
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
	$public =[
		'cat'=>['add','remove'],
	];

	$protected = [
		'cat'=>['test'=>1],
	];

	$vali = function($a){
		return ($a && $a <= $_SESSION['user']['permission']);
	};

	return in_array($m,@$public[$k]) ? true : ($vali(@$protected[$k][$m]) ? true : false);
}

function file_config($key){

	if(! $config = @$GLOBALS['_config']){
		$file = file_get_contents(get_path('.config.json'));
		$config = json_decode($file,true);
		$GLOBALS['_config'] = $config;
	}

	return $config[$key];
}