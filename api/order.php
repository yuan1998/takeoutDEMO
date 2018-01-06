<?php
	tmport('api/api.php');

class Order extends Api{
	public $table = '`order`';

	protected $rules = [
		'id'=>'exist:id',
	];

	public function test(){
		return 'haha';
	}

	public function payComplete($p,&$msg){
		$id = $p['id'];
		if(!$id)
			return false;
		$status = 'complete';
		return $this->add(['id'=>$id,'$status'=>$status],$msg);
	}

	public function paySuccess($p,&$msg){
		$id = $p['id'];
		if(!$id)
			return false;
		$status = 'success';
		return $this->add(['id'=>$id,'$status'=>$status],$msg);
	}

	public function payClose($p,&$msg){
		$id = $p['id'];
		if(!$id)
			return false;
		$status = 'close';
		return $this->add(['id'=>$id,'status'=>$status],$msg);
	}

	public function getUserOrder($p,&$msg){
		$this->where(['status'=>'close'],'<>')->where(['user_id'=>getUserId()]);
		$this->order('id');
		return $this->conditionRead($p,$msg);
	}

	public function createOrder($p,&$msg){
		if(!$p['list']){
			$msg = '请用正确姿势购买';
			return false;
		}
		$cart = new Cart();
		foreach($p['list'] as $key=>$value){
			$cart->or_where(['cart.id'=>$value]);
		}
		$data = $cart->getUserCart($p,$msg);
		if(count($data) !== count($p['list'])){
			$msg = '请用正确姿势购买';
			return false;
		}
		$userid = getUserId();
		$product = new Product();
		foreach($data as $key=>$value){
			$price += $value['count'] * $value['price'];
			$product->or_where(['id'=>$value['product_id']]);
		}
		$snapshot = $product->get();
		$order_id = 'TO-'.rand(0,9).pow(time(),2);
		$r = $this->add(['order_id'=>$order_id,'snapshot'=>json_encode($snapshot,JSON_UNESCAPED_UNICODE),'product'=>json_encode($data,JSON_UNESCAPED_UNICODE),'price'=>$price,'user_id'=>$userid],$msg);
		if($r !== false){
			foreach($p['list'] as $key=>$value){
				$cart->or_where(['id'=>$value]);
			}
			$cart->delete();
		}
		return $r;
		// var_dump($snapshot,$order_id,$userid,$product,$data);
	}
 


}