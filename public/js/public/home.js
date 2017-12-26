$(function(){
	'use strict';

	const cat = new ModelUi('cat','_','#catList');
	const product = new ModelUi('product','_','#productList');
	// const cart = new ModelUi('cart','_','#cartList');


	cat.tbodyTpl = function(item){
		let tr = document.createElement('div');
		tr.innerHTML = `
			<div class="catItem">
				<div>${item.title}</div>
			</div>
		`;
		this.table_el.appendChild(tr);
	};

	product.tbodyTpl = function(item){
		let tr = document.createElement('div');
		tr.classList.add('col','col-6','center');
		tr.innerHTML = 
		`
			<div class="productItem col col-12">
				<div>标题 ：${item.title}</div>
				<div>价格 ：${item.price}</div>
				<div>
					<button class="addCart btn" type="button">加入购物车</button>
					<button class="buy btn" type="button">购买</button>
				</div>
			</div>	
		`;
		this.table_el.appendChild(tr);

		let addCart =tr.querySelector('.addCart');
		let buy =tr.querySelector('.buy');

		addCart.addEventListener('click',function(){
			let data = {data:{'product_id':item.id,'count':1},duplicate:'count'};
			$.post('/api/cart/duplicateAdd',data).then(res=>{
				console.log(res);
				getUserCart();
			})
		})
		
	}

	const cartList = document.querySelector('#cartList');
	const buy = document.querySelector('.buyBtn a');



	function getUserCart(){
		$.post('/api/cart/getUserCart').then((res)=>{
			cartRender(res.data);
		})
	}

	function cartRender(data){
		cartList.innerHTML = '';
		for(let item of data){
			console.log(item);
			let div = document.createElement('div');
			div.classList.add("row");
			div.innerHTML = `
				<div class="cartItem row">
					<div class="col col-1"><input type="checkbox" name="${item.id}" /></div>
					<div class="col col-2">${item.id}</div>
					<div class="col col-2">${item.title}</div>
					<div class="col col-2">${item.price}</div>
					<div class="col col-3">
					<ul>
						<li>
							<button class="less">-</button>
						</li>
						<li>
							<span class="count">${item.count}</span>
						</li>
						<li>
							<button class="add">+</button>
						</li>
					</ul>
					</div>
					<div class="col col-2">${item.price * item.count}</div>
					<div><button class="removeBtn">X</button></div>
				</div>
			`;
			cartList.appendChild(div);
			let add = div.querySelector('.add');
			let less = div.querySelector('.less');
			let removeBtn = div.querySelector('.removeBtn');
			let countEL = div.querySelector('.count');

			add.addEventListener('click',function(){
				disabled(true,less,countEL,item.id)
			})

			removeBtn.addEventListener('click',function(){
				$.post('/api/cart/del',{id:item.id}).then((res)=>{
					getUserCart();
				})
			})
			
			less.addEventListener('click',function(){
				disabled(false,this,countEL,item.id);
			})

		}
	}

	function disabled(type,less,countEL,id){
		let count = Number(countEL.textContent);

		type ? count++ : count-- ;

		less.disabled = (count == 1);

		let data = {count:count,id:id};
		countEL.innerText = data.count;
		$.post('/api/cart/change',data).then((res)=>{
			console.log(res);
		})
	}

	function buyEvent(){
		buy.addEventListener('click',function(e){
			e.preventDefault();
			let checkBox = cartList.querySelectorAll('[type=checkbox]');
			let data =  forCheckBox(checkBox);
			window.location.href = "/buy?cid="+data;
		})
	}

	function forCheckBox(arr){
		let data = '';
		let all = '';
		for(let item of arr){
			all = all+','+item.name;
			if(item.checked)
				data = data+','+item.name;
		}
		return (data == '') ? all.Strim(',') : data.Strim(',');
	}


	
	buyEvent();
	getUserCart();
	cat.read();
	product.read();


})