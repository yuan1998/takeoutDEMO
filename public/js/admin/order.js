$(function(){
	'use strict';


	const table = _dq('#list');
	const pageList = _dq('.pagination');

	const order = new ModelUi('order',null,'#list tbody');


	init();

	function init(){
		order.limit = 3;
		order.read();
		order.getCount();
	}

	order.tbodyTpl = function(item){
		let tr = document.createElement('tr');
		tr.innerHTML = `
			<td>${item.id}</td>
			<td>${item.order_id}</td>
			<td>
				<select name="status">
					<option value="ready">已下单,未支付</option>
					<option value="paid">已下单,已支付</option>
					<option value="accept">商家已接单</option>
					<option value="delivery">送货中</option>
					<option value="success">订单已完成</option>
					<option value="close">订单已关闭</option>
				</select>
			</td>
			<td class="productContent"></td>
			<td class="allCount"></td>
			<td class="price">${item.price}</td>
			<td>
				${control(item.status)}
				<button class="delBtn btn btn-danger">删除</button>
			</td>
		`;
		this.table_el.appendChild(tr);
		let select = tr.__FIND('[name=status]');

		select.value = item.status;

		addSelectEvent(select,item.id,select.value);
		this.addDeleteEvent(tr.__FIND('.delBtn'),item.id);
	};

	function addSelectEvent(el,id,oVal){
		el.addEventListener('change',function(e){
			$.post('/api/order/change',{id:id,status:this.value}).then((e)=>{
				pop('操作成功');
			},e=>{
				pop('操作失败');
				this.value = oVal;
			})
			
		})
	}

	function control(string){
		let r ;
		switch(string){
			case "success":
			case 'ready':
				r = `<button class="btn btn-danger">关闭订单</button>`;
				break;
			case "paid":
				r = `<button class="btn btn-success">接受订单</button>`;
				break;
			case "accept":
				r = `<button class="btn btn-info">发货</button>`;
				break;
			case "delivery":
				r = `<button class="btn btn-info">订单完成</button>`;
				break;
			default :
				r = '';
				break;
		}
		return r;
	}

	order.afterGetCount = function(){
		pageList.innerHTML = `<li class="page-item disabled" id="previous"><a class="page-link" href="#">&laquo;</a></li>`;
		let page = this.count / this.limit;
		this.pages = Math.ceil(page);
		for(let i=1 ; i <= this.pages ;i++){
			let li = _dc('li');
			li.classList.add('page-item','page');
			li.id = i;
			li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
			pageList.appendChild(li);
		}
		let li = _dc('li');
		li.classList.add('page-item');
		li.id = 'next';
		li.innerHTML = `<a class="page-link" href="#">&raquo;</a>`;
		pageList.appendChild(li);
		paginationEvent(pageList);
	}

	function paginationEvent(el){
		let active = el.__FIND('.active');
		let disabled = el.__FIND('.disabled');


		let page = el.__FINDALL('.page > a');
		active = activePage(active,page);
		let next = el.__FIND('#next'),previous = el.__FIND('#previous');
		for(let item of page){
			item.addEventListener('click',function(e){
				let id = this.parentNode.id;
				order.page = id;
				active = activePage(active,page);
			})
		}
		next.addEventListener('click',function(e){
			if(order.page == order.pages)
				return;
			order.page++;
			active = activePage(active,page);
		})

		previous.addEventListener('click',function(e){
			if(order.page <= 1)
				return;
			order.page--;
			active = activePage(active,page);
		})
	}

	function activePage(active,page){
		if(active)
			active.classList.remove('active');
		active = page[order.page-1].parentNode;
		active.classList.add('active');

		if(order.page == 1){
			previous.classList.add('disabled');
		}else previous.classList.remove('disabled');

		if(order.page == order.pages){
			next.classList.add('disabled');
		}else next.classList.remove('disabled');
		order.read();
		return active;
	}


})