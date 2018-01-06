$(function(){
	'use strict';

	const content = _dq('.content');

	const backPage = _dq('.backPage');


	const pageBtn =_dqa('.page');

	let data;

	init();

	function init(){
		$.get('/api/order/getUserOrder').then(function(e){
			data = e.data;
			if(!data)
				_href('/404');
			main(data);
		})
		backHomePage();
	}

	function main(data){
		if(data != false)
			data = formatData(data);
		let active;
		for(let item of pageBtn){
			item.addEventListener('click',function(e){
				if(active)
					active.classList.remove('active');
				this.classList.add('active');
				active = this;
				pageRender(data[this.dataset.type],this.dataset.type);
			})
			if(item.dataset.type == 'complete')
				item.click();
		}
	}

	function pageRender(data,name){
		if(!data){
			content.innerHTML = `
				<div class="center">
					<div class="orderItem">空空如也,回去<a href="/home">下单</a>吧</div>
				</div>`;
		}else{
			content.innerHTML = '';
			for(let item of data){
				let div = _dc('div');
				div.innerHTML=`
				<div class="orderItem">
					<div class="product">
						<div class="title">${item.createTime}</div>
						<div class="productInfo"></div>
					</div>
					<div class="text-right product-count-price"></div>
					<div class="text-right operatingBar">
						<button class="removeBtn">删除订单</button>
						<button class="readBtn"><a href="/user/orderinfo?oid=${item.id}">查看详细</a></button>
					</div>
				</div>`;
				pageType(div,item,name);
				orderRemoveEvent(item.id,div);
				content.appendChild(div);
			}
		}
	}

	function orderRemoveEvent(id,div){
		div.__FIND('.removeBtn').addEventListener('click',function(e){
			let c =  confirm('确定要删除吗？');
			if(c){
				$.post('/api/order/payClose',{id:id}).then(function(res){
					div.remove();
				})
			}
		})
	}

	function pageType(div,item,name){
		div.__FIND('.product-count-price')
			.innerHTML =`共${productInfoRender(div.__FIND('.productInfo'),item)} 件商品,总计$${item.price}`;

		let btn;
		switch(name){
			case 'ready':
				btn = _dc('button');
				btn.innerHTML = `<a href="/user/pay?cid=${item.id}">付款</a>`;
				btn.classList.add('payBtn');
				break;
			case 'success':
				btn = _dc('button');
				btn.innerText = '评分';
				btn.classList.add('payBtn');
				break;
			default:
				break;
		}
		if(btn){
			div.__FIND('.operatingBar').appendChild(btn);
		}
	}

	function productInfoRender(el,item){
		let snapshot = json_decode(item.snapshot),
		 product = json_decode(item.product),
		 data = getProductInfo(snapshot,product),
		 count = 0;
		 for(let i of data){
		 	let snap = i.item,product = i.product;
		 	let div = _dc('div');
		 	div.innerHTML = `
				<div class="productItem clearfix">
					<div class="col-xs-2 align-middle center"><img src="/storage/files/${snap.coverUrl}" alt="" /></div>
					<div class="col-xs-4 align-middle center">${product.title}</div>
					<div class="col-xs-3 align-middle center">X${product.count}</div>
					<div class="col-xs-3 align-middle center">${snap.price}</div>
				</div>
		 	`;
		 	count += product.count;
		 	el.appendChild(div);
		 }
		 return count;
	}
	//   [{x:{id:1},y:{x_id:1}}]
	function getProductInfo(data,product){
		let list = [];
		for(let item of data){
			let cache = {item:item};
			cache['product'] = product[product.findIndex(function(e){ return item.id == e.product_id})];
			list.push(cache);
		}
		return list;
	}

	function json_decode(json){
		return JSON.parse(json);
	}

	function getUserId(){
		return $.get('/getUserId');
	}

	function backHomePage(){
		backPage.addEventListener('click',function(){
			_href('/');
		})
	}

	function formatData(data){
		let obj ={};
		for(let item of data){
			if(!obj[item.status])
				obj[item.status] = [];
			obj[item.status].push(item);
		}
		return obj;
	}

	
})