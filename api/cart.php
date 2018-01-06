<?php
	tmport('api/api.php');

class Cart extends Api{
	public $table = "`cart`";


	public function test(){
		return 'haha';
	}


	public function duplicateAdd($params,&$msg){
		$data = $params['data'];
		$data['user_id'] = getUserId();
		$duplicate = $params['duplicate'];
		return $this->safeFill($data)->duplicateSave($duplicate,$msg);
	}

	public function getUserCart($p,&$msg){
		$user_id = $_SESSION['user']['id'];
		if(!$user_id)
			return false;
		return $this->select(['cart.id'=>'','cart.user_id'=>'','cart.product_id'=>'','product.title'=>'','cart.count'=>'','product.price'=>''])->where(['user_id'=>$user_id])->join('product',["product_id"=>'id'])->get();
	}


}