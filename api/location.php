<?php
class Location extends Api{
	public $table = '`location`';


	public function add($p,&$msg){
		$p['user_id'] = getUserId();
		return parent::add($p,$msg);
	}

}