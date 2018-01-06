<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Document</title>
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/js.model.php"); ?>
	<script src="/js/public/pay.js"></script>
	<link rel="stylesheet" href="/css/public/base.css">
	<link rel="stylesheet" type="text/css" href="/css/view/pay.css">
</head>
<body>
	<div class="wrapper">
		<div class="payBar">
			<div class="title">购买</div>
			<div class="orderContent"></div>
			<div class="total"></div>
			<div class="payWay">
				<label>
					<input type="radio" name="payway" value="Wechat">微信支付
				</label>
				<label>
					<input type="radio" name="payway" value="aliPay">支付宝支付
				</label>
			</div>
			<div>
				<button class="payBtn">支付</button>
			</div>
		</div>
	</div>
	
</body>
</html>