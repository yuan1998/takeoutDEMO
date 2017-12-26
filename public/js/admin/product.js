$(function(){
	'use strict';


	const product = new ModelUi('product','#form','#list tbody');

	product.tbodyTpl = function(item){
		let tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${item.id}</td>
			<td>${item.title}</td>
			<td>${item.price}</td>
			<td>
				<button class="delBtn">删除</button>
				<button class="updateBtn">更新</button>
			</td>
		`;
		this.table_el.appendChild(tr);

		let delBtn = tr.querySelector('.delBtn');
		let updateBtn = tr.querySelector('.updateBtn');
		this.addDeleteEvent(delBtn,item.id);
		this.addUpdateEvent(updateBtn,item);
	};
	product.addFormEvent();


		// product.addFormEvent();
	
	product.read();

	// const test = a =>{
	// 	console.log(a);
	// }

	// test.__extends(ModelUi);

	// console.log(cat);

	// console.dir(test);
	// console.dir(document);
})