<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/js.model.php"); ?>
	<script src="/js/public/home.js"></script>
	<link rel="stylesheet" href="/css/public/base.css">
	<link rel="stylesheet" type="text/css" href="/css/view/home.css">
</head>
<body>
	<div class="container-fluid">
		<div class="nav">
			<h1 class="title center">HELLO WORLD</h1>
			<div class="nav-bar text-center">
				<div class="logo col-lg-1">LOGO</div>
				<div class="nav-item col-lg-1"><a href="">首页</a></div>
				<div class="nav-item col-lg-1"><a href="">我的订单</a></div>
				<div class="nav-item col-lg-1"><a href="">加盟合作</a></div>
				<?php 
				if(!isLogin()){
					echo "<span class='col-xs-3 col-md-1 col-sm-2  col-xs-offset-6 col-sm-offset-8 col-md-offset-10 col-lg-1 col-lg-offset-10 clearfix'><a href='/login'>登陆</a></span>
			 <span class='col-lg-1 col-xs-3 col-md-1 col-sm-2 '><a href='/signup'>注册</a></span><br>";
				}else{
					$name = getUsername();
					echo "<span class='username col-xs-3 col-md-1 col-sm-2   col-xs-offset-6 col-sm-offset-8 col-md-offset-10 col-xs-1 col-lg-offset-10 clearfix'>$name </span><span class='col-xs-3 col-md-1 col-sm-2  col-lg-1'><a href='/loginout'>登出</a></span><br>";
				}
			 ?>
			</div>
					</div>
		<div class="main-bar clearfix">
			<div class="col-lg-2 col-xs-12 col-sm-3 col-md-3">
				<div class="cat-Bar clearfix center">
				</div>
			</div>
			<div class="col-xs-12 col-lg-10 col-md-9 col-sm-9 clearfix">
				<div class="product-Bar">	
				</div>
			</div>
			<div>
			<div>
				<button class="cartBtn">🚗</button>
			</div>
		 	<div class="max"></div>
			<div id="cart-Bar">
		 		<div class="title">购物车</div>
				<div class="cartList"></div>
		 		<div>
		 			<div class="col-xs-2">
		 				<input type="checkbox" class="allChecked"><span>全选</span>
		 			</div>
		 			<div class="col-xs-8 text-right">
						总计 <span class="allTotal">$ 0</span>
		 			</div>	
		 			<div class="col-xs-2">
		 				<button class="buyBtn" disabled>结算</button>
		 			</div>
	 			</div>
	 		</div>
		 	
		 </div>
	</div>
	</div>
</body>
</html>