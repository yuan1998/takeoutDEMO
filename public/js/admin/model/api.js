$(function(){
	'use strict';

	window.ModelApi = Api;

	function Api(name){
		this.name = name;
		this.page = 1;
		this.limit = 10;
		this.apiUrl = '/api/'+ name +'/';
	}

	const ma = Api.prototype;

	ma.read = function(){
		$.post(this.apiUrl +'read',{page:this.page,limit:this.limit})
			.then((res)=>{
				this.list = res.data;
				if(this.afterRead)
					this.afterRead();
			})
	}

	ma.getCount = function(){
		$.get(this.apiUrl +'getCount').then(res=>{
			this.count = res.data;
			if(this.afterGetCount)
				this.afterGetCount();
		})
	}

	ma.add = function(params){
		$.ajax({
			url:this.apiUrl +'add',
			method:"POST",
			contentType:false,
			processData:false,
			cache:false,
			data:params
		}).then((res)=>{
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
		$.ajax({
			url:this.apiUrl +'change',
			method:"POST",
			contentType:false,
			processData:false,
			cache:false,
			data:params
		}).then((res)=>{
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