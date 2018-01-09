$(function(){
	'use strict';

	const Cart = function(){
		this.coverEL = _dq('#cart .cartList .content');
		this.totalEL = _dq('.cartBar .cartInfo');
		this.init = function(){
			this.getList();
		};
		this.init();
	}

	const cp = Cart.prototype;

	cp.listEmpty = function(){
		this.coverEL.innerHTML = `<div class="cartItem center">购物车空空如也.</div>`;
	}

	cp.cartTmp = function(item){
		let div = _dc('div');
		div.innerHTML = `
			<div class="cartItem clearfix center">
				<div class="col-xs-4">
					<div>${item.title}</div>
				</div>
				<div class="col-xs-4">
					<div class="control rowd">
						<span class="less">-</span>
						<input class="count" value="${item.count}">
						<span class="add">+</span>
					</div>
				</div>
				<div class="col-xs-2">
					<div class="total">$${item.count * item.price}</div>
				</div>
				<div class="col-xs-1">
					<button class="removeBtn">x</button>
				</div>
			</div>`;
		this.coverEL.appendChild(div);
		this.cartEvent(div,item);
	}

	cp.cart_total = function(){
		let curre =0;
		let count =0;
		for(let item of this.list){
			curre += item.count * item.price;
			count += item.count;
		}
		this.totalEL.innerText = '共 '+count+'份，总计$ '+curre;
	}

	cp.cartEvent = function(div,item){
		div = {
			el : div,
			control : div.__FIND('.control'),
			count:div.__FIND('.count'),
			addBtn : div.__FIND('.add'),
			lessBtn : div.__FIND('.less'),
			removeBtn : div.__FIND('.removeBtn')
		};

		div.addBtn.addEventListener('click',()=>{
			this.cart_btn_event(item,true);
		})

		div.lessBtn.addEventListener('click',()=>{
			this.cart_btn_event(item);
		})

		div.removeBtn.addEventListener('click',()=>{
			this.cart_btn_remove(item);
		})

		div.count.addEventListener('blur',(e)=>{
			this.blurEvent(item,e.target.value);
		})
		div.count.addEventListener('keydown',function(e){
			if(e.keyCode == 13)
				this.blur();
		})


		div.control.addEventListener('mouseleave',function(){
			div.lessBtn.style.opacity = 
			div.addBtn.style.opacity = 0;
		})
		div.control.addEventListener('mouseenter',function(){
			div.lessBtn.style.opacity = 
			div.addBtn.style.opacity = 1;
		})
	}




	/*		未登录			*/

	function NotLogin(){
		this.getList = function(){
			this.list = _s.get('cartList') || [];
			if(this.list == false)
				this.listEmpty();
			else {

				this.coverEL.innerHTML='';
				this.render();
				this.cart_total();
			}
		}

		this.blurEvent = function(item,val){
			item.count = val;
			this.localStorageSave();
			this.getList();
		}

		this.payEvent = function(){
			_href('/login');
		}

		this.render = function(){
			for(let item of this.list){
				Object.defineProperty(item,'count',{
					configurable:true,
					get:function(){
						return this.data.count;
					},
					set:function(value){
						this.data.count = value;
					}
				})
				this.cartTmp(item);
			}
		}

		//			删除按钮事件
		this.cart_btn_remove = function(item){
			let index = findIndex(item.data.product_id);
			if(index == -1)
				throw('ERROR');
			this.list.splice(index,1);
			this.localStorageSave();
			this.getList();
		}


		//			加减事件
		this.cart_btn_event = function(item,type){
			if(type)
				item.count++;
			else item.count--;
			this.localStorageSave();
			this.getList();
		}

		//  	get localstorage index
		this.findIndex = function(id){
			return this.list.findIndex(function(e){
				return e.data.product_id == id;
			})
		}

		//			localstorage save
		this.localStorageSave = function(){
			_s.set('cartList',this.list);
		}

		//		添加购物车
		this.cart_add = function(item){
			let index = findIndex(item.data.product_id);
			if(index == -1)
				this.list.push(item);
			else this.list[index].data.count++; 
			this.localStorageSave();
			this.getList();
		}
		Cart.call(this);
	}

	NotLogin.__extends(Cart);

	/*		已登陆		*/
	function IsLogin(){
		//			加减事件
		this.cart_btn_event = function(item,type){
			if(type)
				item.count++;
			else item.count--;
			$.post('/api/cart/change',{count:item.count,id:item.id}).then((res)=>{
				this.getList();
			})
		}

		this.blurEvent = function(item,val){
			item.count = val;
			$.post('/api/cart/change',{count:item.count,id:item.id}).then((res)=>{
				this.getList();
			})
		}

		//		获得数据列表
		this.getList = function(){
			$.post('/api/cart/getUserCart').then((res)=>{
					this.list = res.data;
					if(this.list == false)
						this.listEmpty();
					else {
						this.coverEL.innerHTML='';
						this.render();
						this.cart_total();
					}	
			})
		}

		//			删除按钮事件
		this.cart_btn_remove = function(item){
			$.post('/api/cart/del',{id:item.id}).then((res)=>{
				this.getList();
			 })
		}
		//			添加购物车
		this.cart_add = function(item){
			$.post('/api/cart/duplicateAdd',item).then(res=>{
				this.getList();
			})
		}

		//			渲染
		this.render = function(){
			for(let item of this.list){
				this.cartTmp(item);
			}
		}
		

		this.payEvent = function(){
			$.get('/api/order/createOrder').then(function(e){
					_href("/user/pay?cid="+e.data);
			})
		}


		Cart.call(this);
	}

	IsLogin.__extends(Cart);

	window.uCart = function(login){
		if(login)
			return new IsLogin;
		else
			return new NotLogin;
	};




})

