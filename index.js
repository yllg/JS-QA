
//父类，可以无限次点击

import "./FP/utils.js";

export class PraiseButton {
	constructor(ele=$('#PraiseButton'),num=0) {
		this.ele = ele;
		this.num = num;
		this.tId = 0;
	}
	click(){
		this.ele.on('click',(()=>{
			this.throttle(this.handleClick.bind(this));
		}).bind(this))
	}
	
	handleClick(){
	    clearTimeout(this.tId);
		this.num = add(this.num);
		console.log(`父类被点了${this.num} 次！可无限点父类，不置灰色！！`);
		console.log('快速点击多次会被稀释成一次！');
	}

	throttle(method,context){
	    clearTimeout(this.tId);
	    this.tId = setTimeout(function(){
	        method.call(context);
	    },500);
	}

}


//子类，点击十次置灰；再点击从1开始
export class Thumb extends PraiseButton {
	constructor(ele=$('#Thumb'),num=0) {
		super(ele,num);
	}
	
	click(){
		this.ele.on('click',(()=>{
			super.throttle(this.handleClick.bind(this));
		}).bind(this))
	}
	handleClick(){
		if(this.num<9){
        this.num = add(this.num);
        }else if(this.num === 9){
        	$('#PraiseButton').addClass('disable');
        	$('#Thumb').addClass('disable');
            this.num = add(this.num);
        }else{
            this.num = 1;
            $('#PraiseButton').removeClass('disable');
        	$('#Thumb').removeClass('disable');
        }
		console.log(`子类被点了${this.num} 次！第10次变灰色，然后从头计数！！`);
		console.log('快速点击多次会被稀释成一次！');
	}
	
}





