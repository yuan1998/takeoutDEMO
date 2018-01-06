$(function(){
	'use strict';

	/*  分类Model  */
	const cat = new ModelUi('cat',null,'.cat-Bar');

	/*  商品Model  */
	const product = new ModelUi('product',null,'.product-Bar');

	/*  购物车元素  */
	const cartList = _dq('.cartList');

	/*  购物车结算按钮  */
	const buy = _dq('.buyBtn');

	const total = _dq('.allTotal');
	const cartBtn = _dq('.cartBtn');
	const cartBar = _dq('#cart-Bar');

	const userBar = _dq('.username');

	

	/*-----------------分类------------------*/

	/*		分类渲染模版		*/
	cat.tbodyTpl = function(item){
		let tr = _dc('div');
		tr.innerHTML = `
			<div class="catItem" data-cid="${item.id}">
				${item.title}
			</div>
		`;
		this.table_el.appendChild(tr);
	};

	cat.afterRead = function(){
		this.table_el.innerHTML = `<div><div class="catItem active">
				ALL
			</div></div>`;
		for(let item of this.list){
			this.tbodyTpl(item);
			
		}
		catClickEvent(this.table_el);
	}


	/* 		分类点击事件	 */
	function catClickEvent(el){
		let allCat = el.__FINDALL('.catItem'),
		active = allCat[0];
		for(let item of allCat){
			console.log(item);
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
				<div class="center">被吃光了0w0</div>
			`;
		}
		for(let item of list){
			this.tbodyTpl(item);
		}
	}

	/*		商品渲染模版		*/
	product.tbodyTpl = function(item){
		let tr = _dc('div');
		tr.innerHTML = 
		`
			<div class="productItem clearfix">
				<div class="col-xs-2 clearfix productImg">
					<img src="${item.coverUrl}">
				</div>
				<div class="col-xs-10 clearfix productMainInfo">
					<div class="title">${item.title}</div>
					<div class="SS">销量 ${item.sales} 库存 ${item.stock}</div>
					<div class="price">$ ${item.price}</div>
				</div>
				<button type="button" class="addCartBtn"><span>+</span></button>
			</div>	
		`;
		this.table_el.appendChild(tr);
		addCartEvent(tr.__FIND('.addCartBtn'),item.id);	
	}


	/*		添加商品到购物车	 */	
	function addCartEvent(addCart,id){
		addCart.addEventListener('click',function(){
			let data = {data:{'product_id':id,'count':1},duplicate:'count'};
			$.post('/api/cart/duplicateAdd',data).then(res=>{
				getUserCart();
			})
		})
	}


	/*    滚轮事件   */
	function mouseWheelEvent(){

	}


	/*------------------------购物车--------------------------*/

	/* 购物车点击 */
	function cartEvent(){
		let max = _dq('.max');
		cartBtn.addEventListener('click',function(e){
			max.style.display = cartBar.style.display = 'block';
		})
		max.addEventListener('mouseup',function(e){
			max.style.display = cartBar.style.display = 'none';
		})
	}

	/* 	获得购物车选框*/
	function cartCheckboxEvent(){
		let checkbox = _dqa('#cart-Bar [type=checkbox]');
	}


	/* 获得用户购物车 */
	function getUserCart(){
		$.post('/api/cart/getUserCart').then((res)=>{
			cartRender(res.data);
		})
	}


	/* 购物车渲染模版 */
	function cartRender(data){
		if(data == false){
			cartList.innerHTML = `
				<div class="cartItem center">
					购物车空的就像你的肚子.
				</div>
			`;
		}else {
			cartList.innerHTML = '';
			for(let item of data){
				console.log(item);
				let div = _dc('div');
				div.innerHTML = `
					<div class="cartItem clearfix center">
								<div class="col-xs-1"><input type="checkbox" /></div>
								<div class="col-xs-4">
									<div>${item.title}</div>
								</div>
								<div class="col-xs-4">
									<div class="row">
										<span data-type="less">-</span>
										<span class="count">${item.count}</span>
										<span data-type="add">+</span>
									</div>
								</div>
								<div class="col-xs-2">
									<div class="total">$${item.count * item.price}</div>
								</div>
								<div class="col-xs-1">
									<button class="removeBtn">x</button>
								</div>
							</div>
				`;
				cartList.appendChild(div);
				
				countEvent(div,item);

			}
		}
	}

	function countTotal(price,type){
		let t = Number(total.textContent.Strim('$'));
		if(type){

		}
		t = '$' + String(type ? t+price : t-price);
		total.innerText = t;
	}


	/* 购物车商品删减事件 */
	function countEvent(div,item){
		let id = item.id,
		btn = div.__FINDALL('[data-type]'),
		removeBtn = div.__FIND('.removeBtn'),
		countEL = div.__FIND('.count'),
		sum = div.__FIND('.total'),
		check = div.__FIND('[type=checkbox]');

		for(let i of btn){
			i.addEventListener('click',function(){
				(this.dataset.type == 'add') ? item.count++ : item.count--;
				if(item.count <= 0){
					removeBtn.click();
				}else{
					$.post('/api/cart/change',{count:item.count,id:id}).then((res)=>{
						countEL.innerText = item.count;
						sum.innerText ='$'+ item.count * item.price;
					})
				}
				if(check.checked){
					countTotal(item.price,this.dataset.type == 'add');
				}
			})
		}

		removeBtn.addEventListener('click',function(){
			$.post('/api/cart/del',{id:id}).then((res)=>{
		 		div.remove();
		 	})
		})
		check.addEventListener('change',function(e){
			countTotal(item.count * item.price,this.checked);
			if(this.checked){
				cartIdList.push(item.id);
			}else{
				cartIdList.__UNSET(item.id);				
			}
			console.log(cartIdList);
			buy.disabled = !monitorChecked();
		})
	}
	const cartIdList = [];
	

	/*		全选事件		*/
	function allChecked(){
		_dq('.allChecked').addEventListener('click',function(){
		 	let checkbox = getCheckBox();
			for(let item of checkbox){
				item.click();
			}
		})
	}

	/*	getAllCheckBox		*/
	function getCheckBox(){
		return cartList.__FINDALL('[type=checkbox]');
	}

	/*		获得所有选框是否有一项被选中			*/
	function monitorChecked(){
		let checkbox = getCheckBox();
		for(let item of checkbox){
			if(item.checked == true)
				return true;
		}
		return false;
	}


	/* 	购物车结算事件  */
	function buyEvent(){
		buy.addEventListener('click',function(e){
			e.preventDefault();
			$.post('/api/order/createOrder',{list:cartIdList}).then(function(e){
				_href("/user/pay?cid="+e.data);
			})
		})
	}

	/* 	获得购物车选中商品id  */
	function getCartsId(){
		let checkbox = getCheckBox();
	}


	/*----------------------------必要-------------------------*/

	/*   监听窗口大小    */
	function monitorWindowSize(){
		divHeight();
		_w.addEventListener('resize',function(){
			divHeight();
		},true);
	}

	/*	保持视窗高度与浏览器高度一致		*/
	function divHeight(){
		 cat.table_el.style.height =
		 product.table_el.style.height =
		 getHeight() -5-
		 getHeight(_dq('.nav')) + 'px';
	}


	/*		监听滚轮		*/
	function monitorScroll(){
		window.addEventListener('scroll',function(){
			console.log(cartBtn.parentNode.scrollHeight);
			console.log(window.scrollTop)
		})
	}

	/*		用户栏事件		*/
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
					<div>TEST</div>
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
	
	buyEvent(); 
	getUserCart();
	cat.read();
	product.read();
	monitorWindowSize();
	monitorScroll();
	cartEvent();

	allChecked();
	userBarEvent()

})