<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>Signup</title>
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/admin/pop.php"); ?>
	<link rel="stylesheet" type="text/css" href="/css/view/signup.css">

	<script src="/js/public/signup.js"></script>
</head>
<body>	

	<div class="container ">
		<div class="main col-xs-10 col-sm-9 col-md-5 col-lg-3 clearfix">
			<div class="head text-center">
				<h1 class="page-title">Signup</h1>
			</div>
			<div class="page-body">
				<div class="">
					<form>
						<div class="form-group" data-haha="haha">
							<label for="form-username">用户名</label>
							<input class="form-control" type="text" id="form-username" name="username" placeholder="USERNAME">
							<small class="form-text text-muted">长度大于6个字符，不能包含特殊字符</small>
						</div>
						<div class="form-group">
							<label for="form-email">EMAIL</label>
							<input class="form-control" type="text" id="form-email" name="email" placeholder="EMAIL">
							<small></small>
						</div>
						<div class="form-group">
							<label for="form-password">密码</label>
							<input class="form-control" type="password" id="form-password" name="password" placeholder="PASSWORD">
							<small class="form-text text-muted">长度大于6个字符</small>
						</div>
						<div class="form-group">
							<label for="form-confirm">CONFIRM</label>
							<input class="form-control" type="confirm" id="form-confirm" name="confirm" placeholder="CONFIRMPASSWORD">
							<small class="form-text text-muted">再次输入密码</small>
						</div>	
						<div class="form-group">
							<a href="/login" class="link">已有账号？去登陆。</a>
						</div>
						<div class="form-group">
							<button class="btn col-xs-10 col-xs-offset-1 btn-primary signup" type="submit">注册</button>
						</div>
					</form>
				</div>
			</div>	
		</div>
	</div>
</body>
</html>