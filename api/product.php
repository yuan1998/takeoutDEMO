<?php
	tmport('api/api.php');

class Product extends Api{
	public $table = '`product`';

	protected $rules = [
		'id'=>'exist:id',
		'title'=>'minlength:5|maxlength:20',
		'price'=>'Positive',
		'stock'=>'Positive',
		'sales'=>'Positive'
	];

	public function add($p,&$msg){
		$this->safeFill($p);
		if( $id = $this->save($msg)){
			$resutl = moveFile('coverUrl',$data) ?
			$this->where(['id'=>$id])->update(['coverUrl'=>$data['name']]) :
			'没有图片';
		}
		return ['id'=>$id,'cover'=>$resutl];

	}

	public function read($p,&$msg){
		$limit = $p['limit'] ?: 10;
		$offset = (($p['page'] ?: 1) - 1)/$limit;
		$by = @$p['by'] ?: 'id';
		if($data = $this->order($by)->limit($limit,$offset)->get()){
			foreach($data as &$item){
				if($item['coverUrl'])
					$item['coverUrl'] = "/storage/files/".$item['coverUrl'];
			}
		}
		return $data;
	}

	// public function del($p,&$msg){
	// 	$id = @$p['id'];
	// 	if(!$id)
	// 		return false;
	// 	$data = $this->idGetItem($id);
	// 	$r = parent::del($p,$msg);
	// 	if($r){
	// 		$filePath =get_path('public/storage/files/'.$data[0]['coverUrl']);
	// 		if(is_file($filePath))
	// 			$file = unlink($filePath);
	// 		else $file = 'unexists file';
	// 	}
	// 	return ['del'=>$r,'file'=>$file];
	// }

	public function test(){
		return 'haha';
	}



}
