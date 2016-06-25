$(function(){
	
	$('#button_search').button({
		icons : {
			primary : 'ui-icon-search',
		}
	});

/* 轮播器实现 */	

    var screenX = document.body.clientWidth||document.documentElement.clientWidth;
		
	var img_width = -$('#slide_img').width();
		
	var img_per = 265;

	/*获取当前的图片定位值*/
	function getCurrentLeft(){
		var temp = $('#slide_img').css('left');
		var arr = temp.split(' ');
		var current_left = arr[0];
		return parseInt(current_left);
	}
		
	var time = setInterval(function(){
		var lefttemp = getCurrentLeft();
		if (parseInt(lefttemp) > 0 || parseInt(lefttemp) - 265 < -1020) {
			lefttemp = 0;
		}else{
			lefttemp -= img_per;
				
		}
		change_To(lefttemp);

	},3000);


        /*鼠标经过箭头的效果*/
	$('#goleft').hover(function() {
		clearInterval(time);
		$('#goleft').attr({
			"src": "./img/ico/left2.ico",	
		});
			
	}, function() {
		$('#goleft').attr({
			"src": "./img/ico/goleft.ico",	
		});

		time = setInterval(function(){
			var lefttemp = getCurrentLeft();
			if (parseInt(lefttemp) > 0 || parseInt(lefttemp) - 265 < -1020) {
				lefttemp = 0;
			}else{
				lefttemp -= img_per;		
			}
			change_To(lefttemp);
		},3000);
			
	});

	$('#goright').hover(function(){
		clearInterval(time);
		$('#goright').attr({
			"src": "./img/ico/right2.ico",		
		});
	},function(){
		time = setInterval(function(){
			var lefttemp = getCurrentLeft();
			if (parseInt(lefttemp) > 0 || parseInt(lefttemp) - 265 < -1020) {
					lefttemp = 0;
			}else{
				lefttemp -= img_per;	
			}
			change_To(lefttemp);
		},3000);

		$('#goright').attr({
			"src": "./img/ico/goright.ico",		
		});
	});
		
		/*鼠标点击效果*/
	$('#goleft').click(function(){
		movePrev(getCurrentLeft());
	});

	$('#goright').click(function(){
		moveNext(getCurrentLeft());
	});

	function change_To(current_left){
		//$('#slide_img').css('background-position',current_width+'px');
		$('#slide_img').animate({
				'left': current_left+'px',
			},1000);
	}

	function movePrev(current_left){
			
		//alert(current_left);
		if (parseInt(current_left) >= 0 ) {
			current_left = -img_per * 3;
				
		}else{
			current_left += img_per;	
		}
		change_To(current_left);
	}

	function moveNext(current_left){

		if (parseInt(current_left) > 0 || parseInt(current_left) - 265 < -1020) {
			current_left = 0;
		}else{
			current_left -= img_per;	
		}
		change_To(current_left);
	}


/* 搜索框的button 设置*/






})