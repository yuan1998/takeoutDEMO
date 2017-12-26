$(function(){
	'use strict';

	// Object.prototype.__extends = e =>{
	// 	this.prototype = Object.create(e.prototype);
	// 	this.constructor = this;
	// }
	Function.prototype.__extends = function(Klass) {
		this.prototype = Object.create(Klass.prototype);
		this.prototype.constructor = this; 
	}

	HTMLFormElement.prototype.__GETDATA = function(cond){
		let items = this.querySelectorAll(cond);
		let data = {};
		for(let item of items){
			data[item.name] = item.value;
		}
		return data;
	}

	String.prototype.Strim = function(sym){
		let reg = new RegExp('^\\'+sym+'+|\\'+sym+'+$','g');
		return this.trim().replace(reg,'');
	}

	HTMLFormElement.prototype.__FILLDATA = function(data,cond){
		let items = this.querySelectorAll(cond);
		for(let item of items){
			item.value = data[item.name];
		}
		return data.id;
	}
});