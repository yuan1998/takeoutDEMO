$(function(){
	'use strict';


	const product = new ModelUi('product','#form','#list tbody');
	const cat = new ModelUi('cat','_','#form select');

	const img = product.form_el.__FIND('img');
	const fileInput = product.form_el.__FIND('[type=file]');

	init();


	product.tbodyTpl = function(item){
		let tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${item.id}</td>
			<td><img src="${item.coverUrl}" alt="" /></td>
			<td>${item.title}</td>
			<td>${item.price}</td>
			<td>${item.stock}</td>
			<td>${item.sales}</td>
			<td>
				<button class="delBtn btn btn-danger">删除</button>
				<button class="updateBtn btn btn-info">更新</button>
			</td>
		`;
		this.table_el.appendChild(tr);

		let delBtn = tr.querySelector('.delBtn');
		let updateBtn = tr.querySelector('.updateBtn');
		this.addDeleteEvent(delBtn,item.id);
		this.addUpdateEvent(updateBtn,item);
	};
	// product.addFormEvent = function(){
	// 	this.form_el.addEventListener('submit',(e)=>{
	// 		e.preventDefault();
	// 		let data = this.form_el.__GETDATA('[name]');
	// 		if(this.id){
	// 			data['id'] = this.id;
	// 			this.id = null;
	// 			this.update(data);
	// 		}else
	// 			this.add(data);
	// 		fileRead(this.form_el);
	// 	});
	// }

	product.addUpdateEvent = function(el,item){
		el.addEventListener('click',()=>{
			this.id = this.form_el.__FILLDATA(item,'[name]');
			fileRead(this.form_el.__FIND('img'),item.coverUrl);
		})
	}
	cat.tbodyTpl = function(item){
		let tr = document.createElement('option');
		tr.value = item.id;
		tr.innerText = item.title;
		this.table_el.appendChild(tr);
	}

	function init(){
		product.addFormEvent();
		product.read();
		cat.read();
		uploadFileReadEvent();
	}


	function uploadFileReadEvent(){
		fileInput.addEventListener('change',function(e){
			fileRead(img,this);
		})
	}


		// product.addFormEvent();
	

	// const test = a =>{
	// 	console.log(a);
	// }

	// test.__extends(ModelUi);

	// console.log(cat);

	// console.dir(test);
	// console.dir(document);
})