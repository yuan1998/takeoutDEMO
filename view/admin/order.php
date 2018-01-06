<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>订单管理</title>
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/js.model.php"); ?>
	<?php tmport("public/component/admin/pop.php"); ?>
	<script src="/js/admin/order.js"></script>
</head>
<body>

	<div class="container">
		<div class="col-xs-12 col-md-3">
				<?php tmport('public/component/admin/side.php');?>
		</div>
			
		<div class="col-xs-12 col-md-9">
			<div class="main">
				<h1>订单管理</h1>
			</div>
			<div class="content">
				<table id="list" class="table table-hover table-striped">
					<thead>
						<th>ID</th>
						<th>订单号</th>
						<th>状态</th>
						<th>订单内容</th>
						<th>物品件数</th>
						<th>价格</t1h>
						<th>操作</t1h>
					</thead>
					<tbody></tbody>
				</table>
				<div class="page">
					<div>
						<ul class="pagination">
							<li class="page-item disabled">
							  <a class="page-link" href="#">&laquo;</a>
							</li>
							<li class="page-item active">
							  <a class="page-link" href="#">1</a>
							</li>
							<li class="page-item">
							  <a class="page-link" href="#">2</a>
							</li>
							<li class="page-item">
							  <a class="page-link" href="#">3</a>
							</li>
							<li class="page-item">
							  <a class="page-link" href="#">4</a>
							</li>
							<li class="page-item">
							  <a class="page-link" href="#">5</a>
							</li>
							<li class="page-item">
							  <a class="page-link" href="#">&raquo;</a>
							</li>
						</ul>
					</div>
				</div>	
			</div>
		</div>
	</div>
	
</body>
</html>