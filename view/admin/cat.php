<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Cat</title>
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/js.model.php"); ?>
	<script src="/js/admin/cat.js"></script>
</head>
<body>
	<div class="container">
		<div class="col-xs-12 col-md-3">
				<?php tmport('public/component/admin/side.php');?>
		</div>
			
		<div class="col-xs-12 col-md-9">
			<div class="main">
				<h1>分类管理</h1>
				<form id="form">
					<div class="form-group">
						<label id="form-title">标题</label>
						<input id="form-title" class="form-control" type="text" name="title">
					</div>
					<button type="submit" class="btn btn-primary">提交</button>
				</form>
			</div>
			<div class="content">
				<table id="list" class="table table-hover table-striped">
					<thead>
						<th>ID</th>
						<th>标题</th>
						<th>操作</th>
					</thead>
					<tbody></tbody>
				</table>		
			</div>
		</div>
	</div>
	
	
</body>
</html>