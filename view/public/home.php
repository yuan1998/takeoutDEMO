<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="/js/lib/jquery.js"></script>
	<script src="/js/util/foundation.js"></script>
	<script src="/js/admin/model/api.js"></script>
	<script src="/js/admin/model/ui.js"></script>
	<script src="/js/public/home.js"></script>
	<link rel="stylesheet" href="/css/public/base.css">
	<style>
		.productItem{
			padding: 10px;
		}
		.addCart,.buy{
			font-size: 0.5em;

		}
</style>
</head>
<body>
	<h1>HELLO WORD</h1>
	<?php 
		if(!isLogin()){
			echo "<span><a href='/login'>登陆</a></span>
	 <span><a href='/signup'>注册</a></span><br>";
		}else{
			$name = getUsername();
			echo "<span>$name </span><span><a href='/loginout'>登出</a></span><br>";
		}
	 ?>
	 <div>
	 	<div id="cat">
	 		<div class="title">分类</div>
			<div id="catList" class="row"></div>
	 	</div>	
	 	<div id="product">
	 		<div class="title">商品</div>
			<div id="productList" class="row"></div>	
	 	</div>

	 	<div id="cart">
	 		<div class="title">购物车</div>
			<div id="cartList">
			</div>
	 		<div class=""><button class="buyBtn"><a href="">结算</a></button></div>
	 	</div>
	 </div>

</body>
</html>