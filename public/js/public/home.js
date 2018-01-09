$(function(){
	'use strict';

	/*  分类Model  */
	const cat = new ModelUi('cat',null,'.cat-List');

	/*  商品Model  */
	const product = new ModelUi('product',null,'.product-Bar');

	let cart;
	// console.log(uCart);


	/*  购物车元素  */
	const cartList = _dq('.cartList');



	/*  购物车结算按钮  */
	const buy = _dq('.buyBtn');

	const cartBtn = _dq('.cartBtn');
	const cartBar = _dq('#cart-Bar');

	const userBar = _dq('.username');

	/*-----------------分类------------------*/

	/*		分类渲染模版		*/
	cat.tbodyTpl = function(item){
		let tr = _dc('div');
		tr.innerHTML = `
			<div class="catItem col-lg-1" data-cid="${item.id}">
				${item.title}
			</div>
		`;
		this.table_el.appendChild(tr);
	};


	/* 		分类点击事件	 */
	cat.renderAfterEvent = function(el){
		let allCat = el.__FINDALL('.catItem'),
		active = el.__FIND('.active');
		for(let item of allCat){
			item.addEventListener('click',function(e){
				active.classList.remove('active');
				active = this;
				active.classList.add('active');
				if(!( active.dataset.cid)){
					product.afterRead();
				}else{
					let list = PorductOnCat(active.dataset.cid);
					product.afterRead(list);
				}
			})
		}
	}

	/*		获得x分类下的所有商品		*/
	function PorductOnCat(id){
		let data = [];
		for(let item of product.list){
			if(item.cat_id == id)
				data.push(item);
		}
		return data;
	}

	/*		通过分类id获得分类名称		*/
	function catidGetTitle(id){
		for(let item of cat.list){
			if(item.id == id)
				return item.title;
		}
	}

	/*-----------------商品------------------*/

	/*   重写商品渲染   */
	product.afterRead = function (list){
		this.table_el.innerHTML = '';
		list = list || this.list;
		if(list.length ==0){
			this.table_el.innerHTML =`
				<div class="center">被吃光了OwO</div>
			`;
		}else{
			for(let item of list){
				this.tbodyTpl(item);
			}
		}
	}

	/*		商品渲染模版		*/
	product.tbodyTpl = function(item){
		let tr = _dc('div');
		tr.classList.add('col');
		tr.innerHTML =`
		<div class="productItem rowd">
				<div class="productImg col">
					<img src="${item.coverUrl}">
				</div>
				<div class="productMainInfo col">
					<div class="title">${item.title}</div>
					<div class="SS">销量 ${item.sales} 库存 ${item.stock}</div>
					<div class="price">$ ${item.price}</div>
				</div>
				<button type="button" class="addCartBtn">加入购物车</button>
			</div>`;
		this.table_el.appendChild(tr);
		addCartEvent(tr.__FIND('.addCartBtn'),item);	
	}


	/*		添加商品到购物车	 */	
	function addCartEvent(addCart,item){
		addCart.addEventListener('click',function(){
			let data = {
				data:{product_id:item.id,count:1},
				duplicate:'count',
				title:item.title,
				price:item.price};
			cart.cart_add(data);
		})
	}


	/*------------------------购物车--------------------------*/



	/* 购物车点击 */
	function cartEvent(){
		let max = _dq('.max');
		cartBtn.addEventListener('click',function(e){
			this.parentNode.style.marginRight = 0;
		})
		_dq('.main-bar').addEventListener('mouseup',function(e){
			cartBtn.parentNode.style.marginRight = '-295px';
		})
	}


	/* 	购物车结算事件  */
	function buyEvent(){
		buy.addEventListener('click',function(e){
			e.preventDefault();
				cart.payEvent();
		})
	}

	function is_login(){
		$.get('/getUserId').then((res)=>{
			cart = uCart(res.data);
			console.log(cart);
		})
	}

	/*		用户栏事件	 */	
	function userBarEvent(){
		if(!userBar)
			return;
		let div = _dq('.userList');
		if(!div){
			div = _dc('div');
			div.classList.add('userList','center');
			div.innerHTML = `
				<div class="ss">
					<div><a href="/user/info">用户信息</a></div>
					<div><a href="/user/order">订单管理</a></div>
					<div><a href="/logout">登出</a></div>
					<div>TEST</div>
					<div>TEST</div>
				</div>
			`;
			userBar.appendChild(div);
		}
		let ss = div.__FIND('.ss');
		ss.style.display = 'none';
		userBar.addEventListener('mouseenter',function(e){
			ss.style.display = 'block';
		})
		userBar.addEventListener('mouseleave',function(e){
			ss.style.display = 'none';
		})
	}

	/*		init				*/
	function init(){
		is_login();
		buyEvent();
		cat.read(true);
		product.read();
		cartEvent();
		userBarEvent();
	}


	init();
	

})