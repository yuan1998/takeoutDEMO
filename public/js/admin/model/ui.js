$(function(){
	'use strict';

	

	window.ModelUi = Ui;

	function Ui(name,form,table){

		ModelApi.call(this,name);

		this.form_el = document.querySelector(form);
		this.table_el = document.querySelector(table);

		this.init = function(){
			// if(!this.userId)
			// 	this.getUserId();
		};
		this.init();
	}

	Ui.__extends(ModelApi);

	const mu = Ui.prototype;

	mu.afterRead = function(){
		this.table_el.innerHTML = '';
		for(let item of this.list){
			this.tbodyTpl(item);
			
		}
	}

	mu.addDeleteEvent = function (el,id){
		el.addEventListener('click',()=>{
			if(!confirm('really?'))
				return;
			this.remove(id);			
		})
	}

	mu.addUpdateEvent = function (el,item){
		el.addEventListener('click',()=>{
			this.id = this.form_el.__FILLDATA(item,'[name]');			
		})
		// this.update(item,'[name]');
	}

	mu.afterRender = function(limit){
		this.read(limit);
	}

	mu.addFormEvent = function(){
		this.form_el.addEventListener('submit',(e)=>{
			e.preventDefault();
			let data = this.form_el.__GETDATA('[name]');
			if(this.id){
				data['id'] = this.id;
				this.id = null;
				this.update(data);
			}else this.add(data);

		});
	}


})