$(function(){
	'use strict';

	const el_form = document.querySelector('form');

	const emailReg =  /^[\w\d\.\-\_]+[@][\w\d]+(\.[0-9a-zA-Z]+)+$/;
	const usernameReg = /^[\w\d]{5}[\w\d].*/


	let p = _dq('[name=password]'),cp = _dq('[name=confirm]'),
		 u = _dq('[name=username]'),
		 e = _dq('[name=email]');


	init();

	function init(){
		addFormEvent();
		validateEvent();
	}

	function addFormEvent(){
		el_form.addEventListener('submit',(e)=>{
			e.preventDefault();
			if(validated()){
				pop('有错误的')
				return;
			}

			$.ajax({
				url:'/api/user/signup',
				processData:false,
				method:"POST",
				contentType:false,
				cache:false,
				data:el_form.__GETDATA('[name]')
			}).then(function(res){
				pop('注册成功.');
				setTimeout(function(e){
					_href('/login');
				},1500)
			},function(res){
				pop('注册失败.');
			});
		})
	}

	function validateEvent(){
		p.addEventListener('blur',function(e){
			validatePassword();
		})
		cp.addEventListener('blur',function(e){
			validateConfirm();
		})
		u.addEventListener('blur',function(e){
			validateUsername();
		})
		e.addEventListener('blur',function(e){
			validateEmail();
		})
	}

	function validated(){
		let ve = validateEmail();
		let vu = validateUsername();
		let vc = validateConfirm();
		let vp = validatePassword();

		if(ve||vu||vc||vp)
			return true;
		return false;
	}

	function validatePassword(){
		return p.parentNode.classList.toggle('has-warning',p.value.length <=5);
	}
	function validateConfirm(){
		return cp.parentNode.classList.toggle('has-warning',(p.value != cp.value || cp.value.length <=5));
	}
	function validateUsername(){
		return u.parentNode.classList.toggle('has-warning',!(usernameReg.test(u.value)));
	}
	function validateEmail(){
		return e.parentNode.classList.toggle('has-warning',!(emailReg.test(e.value)))
	}


});