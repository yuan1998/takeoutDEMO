$(function(){
	'use strict';

	window.ModelApi = Api;

	function Api(name){
		this.name = name;
		this.page = 1;
		this.apiUrl = '/api/'+ name +'/';
	}

	const ma = Api.prototype;

	ma.read = function(limit){
		$.post(this.apiUrl +'read',{page:this.page,limit:limit})
			.then((res)=>{
				this.list = res.data;
				if(this.afterRead)
					this.afterRead();
			})
	}

	ma.add = function(params){
		$.post(this.apiUrl +'add',params)
			.then((res)=>{
				this.lastId = res.data;
				this.form_el.reset();
				if(this.afterRender)
					this.afterRender();
		})
	}

	ma.remove = function(id){
		$.post(this.apiUrl +'del',{id:id})
			.then((res)=>{
				if(this.afterRender)
					this.afterRender();
		})
	}

	ma.update = function(params){
		$.post(this.apiUrl+'change',params)
			.then((res)=>{
				this.form_el.reset();
				if(this.afterRender)
					this.afterRender();
		})
	}
	ma.getUserId = function(){
		$.get('/getUserId').then(res=>{
			this.userId = res.data;
			console.log(res);
		})
	}

});