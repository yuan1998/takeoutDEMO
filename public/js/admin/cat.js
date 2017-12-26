$(function(){
	'use strict';


	const cat = new ModelUi('cat','#form','#list tbody');

	cat.tbodyTpl = function(item){
		let tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${item.id}</td>
			<td>${item.title}</td>
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
			cat.addFormEvent();


		// cat.addFormEvent();
	
	cat.read();

	// const test = a =>{
	// 	console.log(a);
	// }

	// test.__extends(ModelUi);

	// console.log(cat);

	// console.dir(test);
	// console.dir(document);
})