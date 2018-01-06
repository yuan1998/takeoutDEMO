<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Product</title>
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/js.model.php"); ?>
	<link rel="stylesheet" type="text/css" href="/css/public/base.css">

	<script src="/js/admin/product.js"></script>
</head>
<body>
	<div class="container">
		<div class="header">
			HELLO WORLD;
		</div>
		<div class="col-xs-12 col-md-3">
			<?php tmport('public/component/admin/side.php');?>
		</div>
		<div class="col-xs-12 col-md-9">
			<div class="head">
				<h1 class="title">商品管理</h1>
			</div>
			<div class="col-xs-12">
				<div class="formCover col-xs-12">
					<form id="form" class="clearifx">
						<div class="form-group">
							<label class="col-xs-3">封面
								<div class="" class="col-xs-12"><img src=""></div>
								<span style="position:absolute;">点击上传图片</span>
							<input type="file" name="coverUrl" style="display:none;">
							</label>
						</div>
						<div class="col-xs-9">
							<div class="form-group">
								<label for='form-title'>标题</label>
								<input class="form-control" type="text" id="form-title" name="title">
							</div>	
							<div class="form-group">
								<label for='form-price'>价格</label>
								<input class="form-control" type="text" id="form-price" name="price">
							</div>	
							<div class="form-group">
								<label for='form-stock'>库存</label>
								<input class="form-control" type="text" id="form-stock" name="stock">
							</div>
							<div class="form-group">
								<label for='form-sales'>销量</label>
								<input class="form-control" type="text" id="form-sales" name="sales">
							</div>

							<div class="form-group">
								<label for='form-cat'>分类</label>
								<select class="form-control" type="text" id="form-cat" name="cat_id"></select>
							</div>
							<button type="submit" class=" btn btn-primary">提交</button>
						</div>
					</form>
				</div>
				<div class="productList col-xs-12">
					<table id="list" class="table table-striped table-hover">
						<thead>
							<th>ID</th>
							<th>封面</th>
							<th>标题</th>
							<th>价格</th>
							<th>库存</th>
							<th>销量</th>
							<th>操作</th>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	
</body>
</html>