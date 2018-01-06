<?php 
	if(isLogin())
		redriect('/');
?>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<title>login</title>
	<?php tmport("public/component/lib.php"); ?>
	<?php tmport("public/component/admin/pop.php"); ?>
	<link rel="stylesheet" type="text/css" href="/css/view/signup.css">

	<script src="/js/public/login.js"></script>
</head>
<body>
	<div class="container">
		<div class="main col-xs-10 col-sm-9 col-md-5 col-lg-3 ">
			<div class="head text-center">
				<h1>Login</h1>
			</div>
			<div class="body">
				<div class="">
					<form>
						<div class="form-group">
							<label for="form-username">用户名</label>
							<input class="form-control" type="text" id="form-username" name="username" placeholder="username">
						</div>
						<div class="form-group">
							<label for="form-password">密码</label>
							<input class="form-control" type="password" id="form-password" name="password" placeholder="PASSWORD">
						</div>
						<div class="form-group">
							<input type="checkbox" id="form-remember" name="remember">
							<label for="form-remember">记住我</label>
						</div>
						<div class="form-group">
							<a href="/signup" class="link">还没有账号？点击注册</a>
						</div>
						<div class="form-group text-center">
							<button class="btn col-xs-10 col-xs-offset-1 btn-primary login" type="submit">登陆</button>
						</div>
						
					</form>
				</div>
			</div>
		</div>	
	</div>
	
</body>
</html>