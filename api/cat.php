<?php
	tmport('api/api.php');

class Cat extends Api{
	public $table = '`cat`';

	protected $rules = [
		'id'=>'exist:id',
		'title'=>'minlength:5|maxlength:20|only:title',
	];

	

	public function test(){
		return 'haha';
	}
 


}