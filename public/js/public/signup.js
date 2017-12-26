$(function(){
	'use strict';

	const el_form = document.querySelector('form');

	init();

	function init(){
		addFormEvent();
	}


	function addFormEvent(){
		el_form.addEventListener('submit',(e)=>{
			e.preventDefault();
			$.post('/api/user/signup',el_form.__GETDATA('[name]'))
				.then(function(res){
					location.href = '/login';
				},function(res){
					console.log('2',res.responseJSON);
				});
		})
	}
});