<!DOCTYPE html>
<html lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>👤</title>
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/js.model.php"); ?>
	<script src="/js/public/order.js"></script>
	<link rel="stylesheet" href="/css/public/base.css">
	<link rel="stylesheet" type="text/css" href="/css/view/order.css">
</head>
<body>
	<div class="wrapper">
		<div>
			<div class="head">
				<div class="backPage"><返回</div>
				<div class="navBar text-center">
					<div id="page1" data-type="ready" class="navItem col-xs-4 page">待付款</div>
					<div id="page2" data-type="complete" class="navItem col-xs-4 page">待收货</div>
					<div id="page3" data-type="success" class="navItem col-xs-4 page">已完成</div>
				</div>
			</div>
			<div class="main">
				<div class="content"></div>
			</div>
		</div>
	</div>
	
</body>
</html>