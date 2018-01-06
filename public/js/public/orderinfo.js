$(function(){
	'use strict';

	const backEL = _dq('.backPage');

	const contentEL = _dq('.orderContent');

	let data;

	init();


	/*	初始化		*/
	function init(){
		let oid = getUri();
		getOrder(oid);
		backPreviousPage();
	}


	/*	获得数据		*/

	function getOrder(id){
		console.log(id);
		$.post('/api/order/getUserOrder',{cond:{id:id}}).then(function(res){
			data = res.data[0];
			validated(data);
			main(data);
		})
	}

	/*	获得地址栏订单id	*/
	function getUri(){
		
		let uri = new URL(_href()),oid = uri.searchParams.get('oid');
		if(isNaN(oid) || !oid)
			_href('/404');
		else return oid;
	}

	/*	数据的出发口	*/
	function main(data){
		render(data);
	}

	/*	验证数据		*/
	function validated(data){
		if(!data)
			_href('/404');
	}

	/*	数据渲染页面	*/
	function render(data){
		let status = {ready:'未付款',complete:"已付款",success:"已收获"}
		contentEL.innerHTML = `
			<div>
				<div class="productContent"></div>
				<div class="text-right product-count-price"></div>
				<div class="text-right operatingBar">
					<button class="removeBtn">删除订单</button>
				</div>
				
				<div class="orderInfo">
					<div class="orderID">订单号 ：${data.order_id}</div>
					<div>
						状态：${status[data.status]}
					</div>
					<div>
						创建时间：${data.createTime}
					</div>
					<div>
						支付时间：${data.payTime || '-'}
					</div>
				</div>
			</div>
		`;
		// let i = getProductInfo(json_decode(data.product),json_decode(data.snapshot));
		// console.log(data);
		orderType(contentEL,data);
	}


	/*	不同类型渲染不同按钮		*/
	function orderType(el,data){
		el.__FIND('.product-count-price')
			.innerHTML =`共${renderProduct(data,el.__FIND('.productContent'))} 件商品,总计$${data.price}`;
		let btn;
		switch(data.status){
			case 'ready':
				btn = _dc('button');
				btn.innerHTML = `<a href="/user/pay?cid=${data.id}">付款</a>`;
				btn.classList.add('payBtn');
				break;
			case 'success':
				btn = _dc('button');
				btn.innerText = '评分';
				btn.classList.add('scoreBtn');
				break;
			default:
				break;
		}
		if(btn){
			el.__FIND('.operatingBar').appendChild(btn);
		}

	}

	/*	订单商品内容渲染		*/
	function renderProduct(data,el){
		data = getProductInfo(json_decode(data.snapshot),json_decode(data.product));
		let count = 0;
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

	/*	删除事件	*/
	function orderRemoveEvent(id,div){
		div.__FIND('.removeBtn').addEventListener('click',function(e){
			let c =  confirm('确定要删除吗？');
			if(c){
				$.post('/api/order/payClose',{id:id}).then(function(res){
					_href('/user/order');
				})
			}
		})
	}

	/*	返回上页事件		*/
	function backPreviousPage(){
		backEL.addEventListener('click',function(){
			_href('/user/order');
		})
	}

	/*	解析json数据	*/
	function json_decode(json){
		return JSON.parse(json);
	}


	/*	组合数据			*/
	function getProductInfo(data,product){
		let list = [];
		for(let item of data){
			let cache = {item:item};
			cache['product'] = product[product.findIndex(function(e){ return item.id == e.product_id})];
			list.push(cache);
		}
		return list;
	}

})