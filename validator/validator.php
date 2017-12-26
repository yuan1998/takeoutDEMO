<?php 
class Validator extends Db{


	public function __construct($t) {
		parent::__construct($t);
	}

	public function iterationRules($val,$rule,&$error = null){
		if(is_string($rule))
			$rule = $this->parseRules($rule);
		foreach($rule as $col => $value){	
			$model = 'validate'.$col;
			$r =$this->$model($val,$value);
			if(!$r){
				$error = $col .' error.';
				return false;
			}
		}
		return true;
	}

	public function parseRules($rule){
		$rule = explode('|',$rule);
		$arr= [];
		foreach ($rule as $item) {
			$list = explode(':',$item);
			if(count($list) == 1)
				$arr[$list[0]] = true;
			$arr[$list[0]] = $list[1];
		}
		return $arr;
	}

	public function validateString($val){
		return is_string($val);
	}

	public function validatePositive($val){
		if(!is_numeric($val))
			return false;
		return $val+0 >= 0;
	}

	public function validateBool($val){
		return ($val == 1 || $val ==0);
	}

	public function validateMaxLength($val,$length){
		return (strlen($val) <= $length);
	}

	public function validateMinLength($val,$length){
		return (strlen($val) >= $length);
	}

	public function validateRegEX($val,$reg){
		return (bool)preg_match($reg,$val,$r);
		 
	}

	public function validateNum($val){
		return is_numeric($val);
	}

	public function validateJSON($val){
		json_decode($val);
		var_dump(json_last_error());
		return (json_last_error()==JSON_ERROR_NONE);
	}

	public function validateFloat($val){
		if(!is_numeric($val))
			return false;
		return is_float($val+0);
	}

	public function validateExist($val,$key){
		return $this->where([$key=>$val])->exist();
	}

	public function validateOnly($val,$key){
		return ! $this->validateExist($val,$key);
	}

	public function validateEmail($val){
		return (bool)filter_var($val, FILTER_VALIDATE_EMAIL);
	}

	public function validateInt($val){
		if(!is_numeric($val))
			return false;
		return is_int($val+0);
	}

	public function superGetType($var){
		if(is_array($var))
			return 'array';
		if(is_string($var))
			return 'string';
		if(is_float($var))
			return 'float';
		if(is_bool($var))
			return 'bool';
		if(is_int($var))
			return 'int';
		if(is_null($var))
			return 'null';
		if(is_numeric($var))
			return 'numeric';
		if(is_object($var))
			return 'object';
		return "konw type";
	}

}
?>