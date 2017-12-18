<?php
class Db{
	protected $pdo;
	private $sql;

	private $sql_where;

	private $sql_select;
	private $sql_group;
	private $sql_limit;
	private $sql_order;
	private $sql_join;
	private $stml;

	private $sql_set;


	public $table;



	# 配置

	public function __construct($t) {
		$this->table = $t;
		$this->connection();
	}

	private function connection(){

		$host = file_config('host');
		$username = file_config('username');
		$password = file_config('password');
		$dbname = file_config('db_name');
		$prot = file_config('prot');

		$dsn = "mysql:host=$host;prot=$prot;dbname=$dbname";
		$user = $username;
		$password = $password;
		$options = [
	    PDO::ATTR_CASE => PDO::CASE_NATURAL, 
	    /*PDO::CASE_NATURAL | PDO::CASE_LOWER 小写，PDO::CASE_UPPER 大写， */
	    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, 
	    /*是否报错，PDO::ERRMODE_SILENT 只设置错误码，PDO::ERRMODE_WARNING 警告级，如果出错提示警告并继续执行| PDO::ERRMODE_EXCEPTION 异常级，如果出错提示异常并停止执行*/
	    PDO::ATTR_ORACLE_NULLS => PDO::NULL_NATURAL, 
	    /* 空值的转换策略 */
	    PDO::ATTR_STRINGIFY_FETCHES => false, 
	    /* 将数字转换为字符串 */
	    PDO::ATTR_EMULATE_PREPARES => false, 
	    /* 模拟语句准备 */
		];

		$this->pdo = new PDO($dsn,$user,$password,$options);
	}



	# where - like - or

	protected function where($arr,$symbol="="){
		$this->sql_where .= $this->make_sql_compopr($arr,$symbol,'and');
		return $this;
	}

	protected function or_where($arr,$symbol="="){
		$this->sql_where .= $this->make_sql_compopr($arr,$symbol,'or');
		return $this;
	}

	protected function where_in($arr){
		return $this->where_in($arr,"in",'and');
	}

	protected function or_where_in($arr){
		return $this->where_in($arr,"in",'or');
	}

	protected function where_not_in($arr){
		return $this->where_in($arr,"not in",'and');
	}

	protected function or_where_not_in($arr){
		return $this->where_in($arr,"not in",'or');
	}

	protected function like($arr){
		$this->sql_where .= $this->make_sql_compopr($arr,'like','and');
		return $this;
	}

	protected function or_like($arr){
		$this->sql_where .= $this->make_sql_compopr($arr,'like','or');
		return $this;
	}

	protected function not_like($arr){
		$this->sql_where .= $this->make_sql_compopr($arr,'not like','and');
		return $this;
	}

	protected function or_not_like($arr){
		$this->sql_where .= $this->make_sql_compopr($arr,'not like','or');
		return $this;

	}


	#  return  a compopr 'b' and/or ....  ;

	private function make_sql_compopr($arr,$symbol,$andOr){
		foreach($arr as $col=>$val){
			$cond = " $col $symbol '$val' ";
			if($this->count == 0){
				$this->count++;
				$statement .= "$cond";
			}else
				$statement .= "$andOr $cond";
		}
		return $statement;
	}

	# return a,b,c,d.....  or  'a','b','c','d'.....  ;

	private function make_sql_comma($arr,$is_val=false){
		foreach ($arr as $col=>$value) {
			$cond .= $is_val ? "'$value'," : "$col,";
		}
		$cond = trim($cond,',');
		return $cond;
	}


	private function make_sql_in($arr,$compopr,$and){
		$key = key($arr);
		$cond = $this->make_sql_comma($arr[$key],true);
		if($this->sql_where)
			$this->sql_where .= " $and $key $compopr ($cond) ";
		else
			$this->sql_where .= " $key $compopr ($cond) ";
		return $this;
	}


	# inner/left/right join b on a.x = b.x .....;

	protected function join($joinTable,$connection,$inner="inner"){
		foreach($connection as $col=>$val){
			$cond = "$col = $val";
		}
		if(!$this->sql_join){
			$this->sql_join =" $inner JOIN $joinTable ON $cond";	
		}else{
			$this->sql_join .=" $inner JOIN $joinTable ON $cond";
		}
		return $this;
	}

	protected function select($columns){
		$this->sql_select = $this->make_sql_comma($columns);
		return $this;
	}

	protected function concat(){
		$this->sql_select = "CONCAT($this->sql_select)";
		return $this;
	}

	protected function group($by){
		$this->sql_group = "GROUP BY $by";
		return $this;
	}

	protected function having(){

	}

	protected function limit($start,$limit){
		$this->sql_limit = " limit $start,$limit";
		return $this;
	}

	protected function order($by,$sort='desc'){
		if($by == 'rand()'){
			$this->sql_order = " order by $by";
		}else{
			$this->sql_order = " order by $by $sort";
		}
		return $this;
	}


	private function get_column(){
		$this->sql = "desc $this->table";
		$this->execute();
		return $this->fetch();
	}

	protected function getColumnName(){
		$nameList = [];
		foreach ($this->get_column() as $col) {
			$nameList[]= $col['Field'];
		}
		return $nameList;
	}

	protected function get(){
		$this->sql_select = $this->sql_select ?: "*";

		if($this->sql_where)
			$where = 'where';

		$this->sql = "select $this->sql_select from $this->table $this->sql_join $where $this->sql_where $this->sql_group $this->sql_order $this->sql_limit";

		$r = $this->execute();
		$data = $this->fetch();
		$this->re();
		return ['result'=>$r,'data'=>$data];
	}

	protected function insert($arr){
		$sql_col = $this->make_sql_comma($arr);
		$sql_val = $this->make_sql_comma($arr,true);

		$this->sql = "insert into $this->table ($sql_col) values ($sql_val)";


		return $this->execute();
	}

	protected function update($arr){
		unset($arr['id']);
		$sql_set = trim($this->make_sql_compopr($arr,'=',','),',');
	
		if($this->sql_where)
			$where = 'where';
		
		$this->sql = "update $this->table set $sql_set $where $this->sql_where";
		$r = $this->execute();
		$this->re();
		return $r;
	}

	protected function delete(){

		if($this->sql_where)
			$where = 'where';

		$this->sql = "delete from $this->table $where $this->sql_where";

		$r = $this->execute();
		return $r;
	}

	protected function prepare(){
		$this->stml = $this->pdo->prepare($this->sql);
	}

	protected function execute(){
		$this->prepare();
		return $this->stml->execute();
	}

	protected function fetch(){
		return $this->stml->fetchAll(PDO::FETCH_ASSOC);
	}

	protected function exist(){
		return (bool)$this->get()['data'];
	}

	protected function re(){
		 $sql_where = $sql_join ='';
	}

	// public function test(){
		// $this
			// ->where(['username'=>'12w3'],'>')
			// ->where(['a'=>'123','a1'=>'123','a2'=>'123'])
			// ->where_in(['test'=>['1','2','3','4']])
			// ->where_not_in(['test'=>['1','2','3','4']])
			// ->or_where(['username'=>'123'])
			// ->where(['username'=>'12w3'],'>')
			// ->like(['username'=>'%123%'])
			// ->or_like(['username'=>'%123%'])
			// ->not_like(['username'=>'%123%'])
			// ->or_not_like(['username'=>'%123%'])
			// ->join('b',['a.id'=>'b.id'])
			// ->join('c',['a.id'=>'c.id'])
			// ->join('d',['a.id'=>'d.id'])
			// ->select(['a','b','c','d'])
			// ->group('name')
			// ->limit(1,10)
			// ->order('rand()')
			// ->order('id','asc')
			// ->insert(['username'=>'1','a'=>'2','b'=>'3','c'=>'4']);
			// ->get();
			// ->update();
			// ->delete();
	// }

}
