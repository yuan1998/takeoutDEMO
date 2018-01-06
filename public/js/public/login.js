$(function(){
	'use strict';

	const el_form = _dq('form');
	const el_signup = _dq('.signup');

	init();

	function init(){
		addFormEvent();
	}

	function addFormEvent(){
		el_form.addEventListener('submit',(e)=>{
			e.preventDefault();
			$.ajax({
				url:'/api/user/login',
				processData:false,
				method:"POST",
				contentType:false,
				cache:false,
				data:el_form.__GETDATA('[name]')
			}).then(function(res){
					pop('登陆成功.');
					setTimeout(function(e){
						_href('/');						
					},1000)
				},function(res){
					pop('用户名或密码有误.');
				})
		})
	}
});