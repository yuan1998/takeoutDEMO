$(function(){
	'use strict';

	const u = new URL(window.location.href);

	const dc = document.createElement.bind(document);
	const dq = document.querySelector.bind(document);
	const dqa = document.querySelectorAll.bind(document);

	const cid = u.searchParams.get('cid').split(',');

	const content = dq('.orderContent');

	const payWay = dq('.payWay');
	const payBtn = dq('.payBtn');

	const total = dq('.total');




	let data,
	userId;


	getUserId();
	windowEvent();



	/*		获得用户ID		*/
	function getUserId(){
		$.get('/getUserId').then(function(e){
			userId = e.data;
			getOrder(cid);
		})
	}


	/*		获取订单内容		*/
	function getOrder(id){
		$.post('/api/order/conditionRead',{cond:{id:id},type:'or_w'}).then(function(e){
			data = e.data;
			main(data);
		})
	}

	/*		所有数据操作从这里出发		*/
	function main(data){
		validate(data);

		renderProduct(data[0]);

		payEvent();
	}


	/*		验证数据是否正确		*/
	function validate(data){
		let a = function(){
			if(!data)
				return false;
			for(let item of data){
				if(item.user_id != userId)
					return false;
				if(item.status == 'close' || item.status == 'complete')
					return false;
			}
			return true;
		}
		if(!a())
			window.location.href = '/404';
	}

	/*		渲染商品		*/
	function renderProduct(data){
		let product = json_decode(data['product']);
		for(let item of product){
			let div =dc('div');
			let price = item.count * item.price;
			div.innerHTML = `
				<div class="productItem">
					<div class="product-title col-xs-3">${item.title}</div>
					<div class="product-price col-xs-3">$${item.price}</div>
					<div class="product-price col-xs-1">X</div>
					<div class="product-count col-xs-2">${item.count}</div>
					<div class="product-total col-xs-3">$${price}</div>
				</div>
			`;
			content.appendChild(div);
		}
		total.innerText = '总计 $ '+data.price;
	}

	/*		支付事件		*/
	function payEvent(){
		payBtn.addEventListener('click',function(){
			console.log(getChecked());
			switch(getChecked()){
				case 'Wechat':
					payPop('/storage/QRcode/wechat.png','Wechat');
					break;
				case 'aliPay':
					payPop('/storage/QRcode/wechat.png','aliPay');
					break;
				default:
					alert('请用正确的姿势支付');
					break;
			}
		})
	}

	/*		获得被选中的选框中的数据			*/
	function getChecked(){
		let el = payWay.querySelector('[name=payway]:checked');
		if(el)
			return el.value;
	}

	/*		支付弹窗		*/
	function payPop(src,text){
		let pop = dq('.pop') || dc('div');
		pop.innerHTML = `
			<div class="container">
				<div>请扫描二维码</div>
				<div class="QRcode center">
					<img src="${src}" alt="" />
				</div>
				<div class="center">${text}</div>
				<div class="hideBtn">X</div>
			</div>
		`;
		pop.classList.add('pop');
		dq('body').appendChild(pop);
		pop.style.left = (window.innerWidth - 300)/2 +'px';
		pop.style.top = (window.innerHeight - 300)/2 +'px';  
		let close =pop.querySelector('.hideBtn');
		close.addEventListener('click',function(){
			pop.remove();
		})
	}

	/*		窗口变动事件		*/

	function windowEvent(){
		window.addEventListener('resize',function(){
			let pop = dq('.pop');
			if(pop){
				pop.style.left = (window.innerWidth - 300)/2 +'px';
				pop.style.top = (window.innerHeight - 300)/2 +'px';
			}

		})
	}

	/*		JSON.parse		*/
	function json_decode(json){
		return JSON.parse(json);
	}
})