<?php
	tmport('db/db.php');
	tmport('validator/validator.php');
class Model extends Db{

	private $filled;

	public $validate;

	public function __construct(){
		parent::__construct($this->table);
		$this->validate = new Validator($this->table);
	}

	public function fill($params){
		$this->filled = $params;
	}

	public function safeFill($params){
		$colName = $this->getColumnName();
		foreach ($params as $key => $value) {
			if(!in_array($key,$colName))
				unset($params[$key]);
		}

		$this->fill($params);
		return $this;
	}

	public function judgedOnParams($p){
		if(count($p) == 2 && !is_array($p[0]) && !is_array($p[1]))
			$this->safeFill([$p[0]=>$p[1]])->where($this->filled);
		else if(count($p) == 3 && !is_array($p[0]) && !is_array($p[1]) && !is_array($p[2]) )
			$this->safeFill([$p[0]=>$p[1]])->where($this->filled,$p[2]);
		else if(count($p) == 1 && is_array($p[0]))
			$this->safeFill($p[0])->runWhere($this->filled);
		else if(count($p) == 2 && is_array($p[0]))
			$this->safeFill($p[0])->runWhere($this->filled,$p[1]);

		return $this;
	}
	private function runWhere($arr,$compopr='='){
		if($arr)
			$this->where($arr,$compopr);

	}

	public function save(&$msg=null){
		if(!$this->validateFill($msg))
			return false;

		if(method_exists($this,'saveBefore'))
			$this->saveBefore($this->filled['password']);

		$id = @$this->filled['id'];
		if($id){
			return $this->setTime('updateTime')
						->where(['id'=>$id])
						->update($this->filled);
		}else{
			$r =$this->setTime('createTime')
					 ->insert($this->filled);
			return $r ? $this->getLastId() : false;
		}
	}

	public function duplicateSave($duplicate,&$msg=null){
		if(!$this->validateFill($msg))
			return false;
		if(!$this->filled[$duplicate]){
			$msg['params'] = "条件与传参不一致。";
			return false;
		}
		$r =$this->setTime('createTime')
					->duplicate($duplicate)
					 ->insert($this->filled);
			return $r ? $this->getLastId() : false;
	}

	public function remove(&$msg=null){
		$arr = ['id' => @$this->filled['id']];
		if(!$arr['id'] || !$this->validateFill($msg,$arr))
			return false;
		return $this->where($arr)->delete();
	}

	private function validateFill(&$msg,$arr=null){
		$arr = $arr ?: $this->filled;
		foreach($arr as $col=>$val){
			$rule = @$this->rules[$col];
			if(!$rule)
				continue;
			if(!$this->validate->iterationRules($val,$rule,$error)){
				$msg[$col] = $error;
				return false;
			}
		}
		return true;
	}

	private function setTime($col){
		date_default_timezone_set('UTC');
		$this->filled[$col] = date('Y-m-d H:i:s',time()+ 8*3600);
		return $this;
	}

	private function getLastId(){
		return $this->pdo->lastInsertId();
	}
}