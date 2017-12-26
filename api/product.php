<?php
	tmport('api/api.php');

class Product extends Api{
	public $table = 'product';

	protected $rules = [
		'id'=>'exist:id',
		'title'=>'minlength:5|maxlength:20',
		'price'=>'Positive',
	];

	

	public function test(){
		return 'haha';
	}
 


}