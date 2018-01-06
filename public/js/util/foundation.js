$(function(){
	'use strict';

	// Object.prototype.__extends = e =>{
	// 	this.prototype = Object.create(e.prototype);
	// 	this.constructor = this;
	// }
	window._d = document;
	window._w = window;

	window._dq = _d.querySelector.bind(_d);

	window._dqa = _d.querySelectorAll.bind(_d);

	window._dc = _d.createElement.bind(_d);

	window._href = u =>{
		if(!u)
			return _w.location.href;
		_w.location.href = u;
	}

	window.getHeight = el =>{
		if(!el)
			return _w.innerHeight;
		else if(el instanceof HTMLElement || el instanceof _d)
			return el.clientHeight;
		else if(el == 'scroll')
			return _w.scrollY;
		else return false;
	}

	window.getWidth = el =>{
		if(!el)
			return _w.innerWidth;
		else if(el instanceof HTMLElement || el instanceof _d)
			return el.clientWidth;
		else if(el == 'scroll')
			return _w.scrollX;
		else return false;
	}

	window.fileRead = (el,input)=>{
		if(el && !input){
			el.setAttribute('src','');
		}else if(typeof(input) == 'string')
			el.setAttribute('src',input);
		else if(input.files && input.files[0]){
			let reader = new FileReader();
			reader.addEventListener('load',function(e){
				el.setAttribute('src',e.target.result);
			})
			reader.readAsDataURL(input.files[0]);
		}
	}


	Function.prototype.__extends = function(Klass) {
		this.prototype = Object.create(Klass.prototype);
		this.prototype.constructor = this; 
	}

	HTMLFormElement.prototype.__GETDATA = function(cond){
		let items = this.querySelectorAll(cond);
		let data = new FormData(this);
		for(let item of items){
			if(item.type == 'file'){
				if(!item.files[0])
					continue;
				data.append(item.name,item.files[0]);
			}else{
				data.append(item.name,item.value);
			}
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
			if(item.type == 'file')
				continue;
			item.value = data[item.name];
		}
		return data.id;
	}


	HTMLElement.prototype.__FIND = function(sm){
		return this.querySelector(sm);
	}

	HTMLElement.prototype.__FINDALL = function(sm){
		return this.querySelectorAll(sm);
	}

	Array.prototype.__UNSET = function(data){
		let index = this.indexOf(function(e){
			return e == data;
		})
		if(index == false)
			return;
		return this.splice(index,1);
	}

});