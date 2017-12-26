<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Cat</title>
	<script src="/js/lib/jquery.js"></script>
	<script src="/js/util/foundation.js"></script>
	<script src="/js/admin/model/api.js"></script>
	<script src="/js/admin/model/ui.js"></script>
	<script src="/js/admin/cat.js"></script>
</head>
<body>
	<h1>分类管理</h1>
	<form id="form">
		<input type="text" name="title">
		<button type="submit">提交</button>
	</form>
	<table id="list">
		<thead>
			<th>ID</th>
			<th>标题</th>
		</thead>
		<tbody></tbody>
	</table>
</body>
</html>