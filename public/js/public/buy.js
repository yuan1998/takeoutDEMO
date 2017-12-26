$(function(){
	'use strict';

	var uri = new URL(window.location.href);
	console.dir(URL);
	let params;

	init();

	function init(){
		params = parseParameters(uri.search.Strim('?'));
	}

	function parseParameters(params){
		let paramArr = params.split('&');
		let parameters = {};
		for(let item of paramArr){
			let items = item.split('=');
			if(!parameters[items[0]]){
				parameters[items[0]] = [];
			}
			parameters[items[0]].push(items[1]);
		}
		return parameters;
	}




})