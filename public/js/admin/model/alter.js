$(function(){
	'use strict';

	window.pop = function(msg,type){

		let body = _dq('body');
		let pop = _dc('div');
		type = type ? 'alert-danger' : 'alert-success';
		pop.classList.add('popA','alert','alert-dismissible',type);
		pop.innerHTML =`
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong>${msg}</strong>
		`;
		body.appendChild(pop);

		let clearTime = 10;

		pop.__FIND('.close').addEventListener('click',function(e){
			clearInterval(interval);
			pop.remove();
		})

		setTimeout(function(){
			let interval = setInterval(function(){
				if(clearTime == 0){
					pop.style.opacity = 1;
					pop.remove();
					clearInterval(interval);
				}
				clearTime -=1;
				pop.style.opacity = clearTime/10;
			},70);
		},1500)
		
	}
})