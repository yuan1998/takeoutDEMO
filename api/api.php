<?php
tmport('model/model.php');
class Api extends Model{

	public function add($params,&$msg){
		// var_dump($params);
		return $this->safeFill($params)->save($msg);
	}

	public function change($params,&$msg){
		if(!$params['id']){
			$msg = 'id错误';
			return false;
		}
		return $this->add($params,$msg);
	}

	public function del($params,&$msg){
		return $this->safeFill($params)->remove($msg);
	}

	public function read($p,&$msg){
		$limit = $p['limit'] ?: 10;
		$offset = (($p['page'] ?: 1) - 1)*$limit;
		$by = @$p['by'] ?: 'id';
		return $this->order($by)->limit($limit,$offset)->get();
	}

	public function conditionRead($p,&$msg){
		$cond = $p['cond'];
		if($cond)
			foreach($cond as $key=>$value){
				$this->forCond($value,$key,@$p['type']);
			}
		return $this->get();
	}

	public function forCond($arr,$col,$type){
		if(!$arr)
			return;
		if(is_array($arr)){
			foreach($arr as $key=>$value){
				$this->whereSwitch($col,$value,$type);
			}
		}else $this->whereSwitch($col,$arr,$type);
	}

	private function whereSwitch($colname,$value,$type){
		switch($type){
				case 'or_w':
					$this->or_where([$colname=>$value]);
					break;
				case 'or_w':
					$this->or_where([$colname=>$value]);
					break;
				case 'or_l':
					$this->or_like([$colname=>$value]);
					break;
				case 'like':
					$this->like([$colname=>$value]);
					break;
				default:
					$this->where([$colname=>$value]);
					break;
			}
	}






}
