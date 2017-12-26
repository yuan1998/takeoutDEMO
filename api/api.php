<?php
tmport('model/model.php');
class Api extends Model{
	public function add($params,&$msg){
		return $this->safeFill($params)->save($msg);
	}

	public function change($params,&$msg){
		return $this->add($params,$msg);
	}

	public function del($params,&$msg){
		return $this->safeFill($params)->remove($msg);
	}

	public function read($p,&$msg){
		$limit = $p['limit'] ?: 10;
		$offset = (($p['page'] ?: 1) - 1)/$limit;
		$by = $p['by'] ?: 'id';
		return $this->order($by)->limit($limit,$offset)->get();
	}

	public function getUserCart($p,&$msg){
		$user_id = $_SESSION['user']['id'];
		if(!$user_id)
			return false;
		return $this->select(['cart.id'=>'','product.title'=>'','cart.count'=>'','product.price'=>''])->where(['user_id'=>$user_id])->join('product',["product_id"=>'id'])->get();
	}

	public function duplicateAdd($params,&$msg){
		$data = $params['data'];
		$data['user_id'] = getUserId();
		$duplicate = $params['duplicate'];
		return $this->safeFill($data)->duplicateSave($duplicate,$msg);
	}
}