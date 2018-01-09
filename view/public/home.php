<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="/css/view/home.css">
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/js.model.php"); ?>
	<script src="/js/public/home-cart.js"></script>
	<script src="/js/public/home.js"></script>
	<link rel="stylesheet" href="/css/public/base.css">
</head>
<body>
	<div class="">
		<div class="nav-bar">
			<div class="head-top clearfix container rowd">
				<div class="head-logo col logo ">LOGO</div>
				<div class="nav-item col active "><a href="/">首页</a></div>
				<div class="nav-item col "><a href="/user/order">我的订单</a></div>
				<div class="nav-item col "><a href="">加盟合作</a></div>

				<?php 
				if(!isLogin()){
					echo "<div class='user-bar nav-item col'><a href='/login'>登陆／注册</a></div>";
				}else{
					$name = getUsername();
					echo "<div class='username user-bar nav-item col'><a href=''>$name</a></div>";
				}
			 ?>
			</div>
		</div>
		<div id="cart">
			<div class="cartBar">
				<div class="cartBtn">
					<div>购物车</div>
				</div>
				<div class="cartContent">
					<div class="titleBar">
						<a href="">购物车</a>
					</div>
					<div class="cartList">
						<div class="head">
							<div></div>
								<div class="emptied"><button class="btn btn-link">[清空]</button>
							</div>
						</div>
						<div class="content"></div>
					</div>
					<div class="payBar">
						<div class="text-right cartInfo"></div>
						<div>
							<button class="btn btn-danger buyBtn">支付</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="main-bar clearfix container">
			<div class="cat-Bar">
				<div class="clearfix">
					<div class="col-lg-1" style="color:rgba(0,0,0,0.5);">商家分类：</div>
					<div class="col-lg-11">
						<div class="cat-List clearfix center">
							<div>
								<div class="col-lg-1 catItem active">ALL</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="clearfix product-Bar rowd">
			</div>
			<div>
			
		 	<div class="max"></div>
		 	
		 </div>
	</div>
	</div>
</body>
</html>