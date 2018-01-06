<?php
class User extends Api{
	public $table = '`user`';

	protected $rules = [
		'username'=>'maxlength:25|minlength:5|only:username',
		'password'=>'maxlength:128|minlength:6'
	];

	public function signup($p,&$m){
		$username = $p['username'];
		$password = $p['password'];
		if(!$username || !$password){
			$m['login'] = "格式有误.";
			return false;
		}
		return $this->add($p,$m);
	}

	public function saveBefore(&$p){
		$p = $this->hash_password($p);
	}

	public function hash_password($password){
		return md5(md5($password).'xyee');
	}

	public function login($p,&$m){
		$username = $p['username'];
		$password = $p['password'];
		if(!$username || !$password){
			$m['login'] = "格式有误.";
			return false;
		}
		$user =  $this->where(['username'=>$username,'password'=>$this->	hash_password($password)])->frist();
		if(!$user){
			$m['login'] = "用户名或密码有误";
			return false;
		}
		unset($user['password'],$user['createTime'],$user['updateTime']);
		$_SESSION['user'] = $user;
		return true;
	}

	public static function loginout(){
		unset($_SESSION['user']);
		return isset($_SESSION['user']) ? false : true;
	}
	public function getUserData(){
		$id = getUserId();
		$r = $this->where(['id'=>$id])->get();
		return $r;
	}

	public function test(){
		return 'haha';
	}
}