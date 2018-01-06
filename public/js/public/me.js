$(function(){
	'use strict';

	const contentEL = _dq('.userContent');

	let data;

	init();

	function init(){
		getUserData();
	}


	function getUserData(){
		$.get('/api/user/getUserData').then(function(res){
			data = res.data;
			main(data);
		})
	}

	function main(data){
		console.log(data);
	}

})