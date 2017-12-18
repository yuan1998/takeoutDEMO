<?php
	tmport('model/model.php');

class Cat extends Model{
	public $table = 'cat';

	protected $rules = [
		'id'=>'exist:id',
		'title'=>'minlength:5|maxlength:20|only:title',
	];

	public function add($params,&$msg){
		return $this->safeFill($params)->save($msg);
	}

	public function change($params,&$msg){
		return $this->$add($params,$msg);
	}

	public function del($params,&$msg){
		return $this->safeFill($params)->remove($msg);
	}

	public function test(){
		return 'haha';
	}
 


}