$(function(){

	$('.button_search').button({
		icons : {
			primary : 'ui-icon-search',
		}
	});

	$('.button_ques').button({
		icons : {
			primary : 'ui-icon-lightbulb',
		}
	})


/* 轮播器实现 */	

    var screenX = document.body.clientWidth||document.documentElement.clientWidth;
		
	var img_width = -$('#slide_img').width();
		
	var img_per = 265;

	/*获取当前的图片定位值*/
	function getCurrentLeft(){
		var temp = $('#slide_img').css('left');
		//var arr = temp.split(' ');
		var current_left = temp;
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


/* 文本框获取焦点处理 */

	//失去焦点  页面载入不获取焦点
	$('#top_search_text,#another_search_text').blur();
	$('#top_search_text,#another_search_text').focus(function(event) {
		$('#top_search_text,#another_search_text').val('');
	}).blur(function(event) {
		$('#top_search_text,#another_search_text').css('color','#666').val('请输入问题、话题、或者关注的用户名');
	});;



/* 滚动条处理 如果页面向下拉到看不到轮播图  则搜索框置顶*/
	//alert($(document).scrollTop());

	$(window).scroll(function(){

		if($(document).scrollTop() < 95 ){
			$('#top_information span.another_search').css('display','none');
		}

		if($(document).scrollTop() > 130 ){
	    	//如果下拉遮住问题框  则问题框显示
	    	$('#top_information span.another_search').css('display','inline');
    	}
	});
    



/* 用户注册功能   先注册登录以后再显示个人中心  可以设置头像  昵称  完整个人信息等等 */
	/* <a href="#" class="reg_a">注册</a> */

	$('#reg').dialog({
		autoOpen: false,
		width:345,
		height:360,
		modal:true,
		buttons:{
			'Submit':function(){
				$(this).submit();   //创建一个提交按钮

			}, 
		},
	});


	//单选样式设置
	$('#reg').buttonset();

	/* 点击注册按钮弹出reg dialog */
	$('.reg_a').click(function(){
		$('#reg').resetForm();
		$('#reg').dialog('open');

	});


/* 用户登录窗口 */
/*<a href="#" class="login_a">登录</a>*/
	$('#login').dialog({
		autoOpen:false,
		width:340,
		height:290,
		modal:true,
		buttons:{
			'Login':function(){
				$(this).submit();   //创建一个提交按钮

			}, 
		},
	});

	//点击登录 打开login dialog
	$('.login_a').click(function(){
		$('#login').resetForm();
		$('#login').dialog('open');
	});


/* 用户注册 功能： 信息验证报错  邮箱补全  日历插件 */
	
	/* 邮箱补全 */
	$('#email').autocomplete({
		delay : 0,   //补全延迟时间
		autoFocus : true,  //第一行是否默认选中   
		source : function(request,response){
			//request 你的输入
			//补全结果数组
			
			/*alert(request.term);*/
			// 创建本地数据域    匹配的域名
			var hosts = ['qq.com','163.com', '263.com', 'gmail.com', 'hotmail.com','sina.com','126.com','foxmail.com','21CN.com','189.com'],
				name = [],   //用户名
				host = [],   //域名
				term = request.term,
				ix = term.indexOf('@');  //查找用户是否已经输入了@字符


			var result = [];  //最终结果
			
			result.push(request.term);  //将用户当前输入添加到首项

			name = request.term; 

			if (ix > -1) {
				//说明找到了@  则分割字符
				name = term.slice(0, ix);   //name @前面的
				host = term.slice(ix+1);    //host @后面的


			}

			
			if (name) {   //用户名不为空 
				var findedHosts = [];
				if (host) {
					findedHosts = $.grep(hosts,function(value,index){
						return value.indexOf(host) > -1;
					});
				}else{
					findedHosts = hosts;
				}
				
				
			}

			//修改查询到的域名结果加上用户名
			var findedResults = $.map(findedHosts,function(value,index){
					return name + '@' + value;
				})


			result = result.concat(findedResults);

			response(result);
		}
	});



	/* 日历插件 */
	$('#date').datepicker({
		dateFormat:'yy-mm-dd',
		dayNamesMin:['日','一','二','三','四','五','六'],
		monthNames : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		//showWeek:true,
		//weekHeader:'周',
		yearRange:'1900:', //1900至今
		changeYear: true,
		changeMonth: true,
		showButtonPanel:true,
		closeText: '关闭',
		currentText:'今天',
		maxDate:0,    //设置一个最大的可选日期  生日只能到当前日期为止
	});

	


	/* 数据加载中制作 */
	$('#loading').dialog({
		autoOpen:false,
		width:230,
		height:50,
		modal:true,
		closeOnEscape: false,    //esc键不能退出
		resizable: false,        //不可随意更改大小
		draggable:false,         //不可移动
	});

	$('#loading').parent().find('.ui-widget-header').hide();

	/* 将用户和退出功能在未登录前隐藏 */
	$('#user_a,#exit_a').hide();


	/* 登录cookie操作 */
	//cookie存在默认登录
	if($.cookie('login_user')){
		$('#user_a').html($.cookie('login_user'));
		$('#reg_a,#login_a').hide();
		$('#user_a,#exit_a').show();



	}else{
		$('#reg_a,#login_a').show();
		$('#user_a,#exit_a').hide();

	}

	//用户点击退出 则删除cookie
	$('#exit_a').click(function(){
		
		$.removeCookie('login_user');
		$('#reg_a,#login_a').show();
		$('#user_a,#exit_a').hide();

	});

	$('#login').dialog('widget').find('button').eq(0).click(function(event) {
		$('#login').find('ol').hide();
		$('#login').find('span.star').html('*').css('color','maroon').removeClass('reg_succ');
		$('#login').find('input').css('border','1px solid #ccc');
	});





	/* 注册验证 */
	$('#reg').validate({
		rules: {   //验证规则
			user : {
				required : true,
				minlength : 2,
				remote : {
					url:'./php/is_user.php',
					type: 'POST',
				}

			},
			passwd : {
				required : true,
				minlength: 6,
			},
			email : {
				required : true,
				email:true,
			}
		},
		messages: {  //验证提示信息
			user : {
				required: '账号不得为空！',
				minlength: jQuery.format("账号不得少于{0}位！"),
				remote : '账号已存在！请重新填写！',
			},
			passwd : {
				required: '密码不得为空！',
				minlength: jQuery.format("密码不得少于{0}位！")
			},
			email : {
				required : '邮箱地址不得为空！',
				minlength: '请输入正确的邮箱地址！',
			}

		},

		/* 验证错误信息包裹在 ol 里面 */
		errorLabelContainer: 'ol.reg_error',
		wrapper: 'li',

		//有错误不用提交的时候获取及时值
		showErrors: function(errorMap,errorList){
			var errors = this.numberOfInvalids();
			if (errors > 0) {
				$('#reg').dialog('option','height', errors * 20 + 360);
			}else{
				$('#reg').dialog('option','height', 360);
			}

			this.defaultShowErrors();  //执行默认错误
		},

		//错误行号高亮处理
		highlight: function(element,errorClass){
			
			$(element).css('border','1px solid maroon');
			$(element).parent().find('span').html('*').css('color','maroon').removeClass('reg_succ');
		},

		unhighlight:function(element,errorClass){
			$(element).css('border','1px solid #ccc');
			$(element).parent().find('span').html('').addClass('reg_succ');
		},

		/* 验证通过后调用 */
		submitHandler : function(form){
			/* 执行ajax提交 */
			$(form).ajaxSubmit({
				url: 'php/add_regMsg.php',
				type: 'POST',
				beforeSubmit:function(formdata,jform,options){
					$('#reg').dialog('widget').find('button').eq(1).button('disable');   //提交时禁用提交按钮
					$('#loading').dialog('open');

				},
				success:function(responseText,statusText){
					if (responseText) {
						$('#reg').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background','url(./img/success.gif) no-repeat 25px 8px').html('数据提交成功！');

						/*数据提交成功后直接用用户名登录*/
						/*先创建一个用户cookie*/
						$.cookie('login_user',$('#user').val());
						//alert($.cookie('login_user'));
						setTimeout(function(){
							/*延迟一秒 如果提交成功后台执行一些操作 */
							$('#reg').resetForm();
							$('#reg').dialog('close');
							$('#loading').dialog('close'); 
							/*移除上次注册成功预留的标志*/
							$('#reg').find('span.star').html('*').css('color','maroon').removeClass('reg_succ');
							$('#loading').css('background','url(./img/loading.gif) no-repeat 25px 8px').html('数据交互中...');


							/*设置注册完直接登录*/
							$('#user_a').html($.cookie('login_user'));
							$('#reg_a,#login_a').hide();
							$('#user_a,#exit_a').show();

						},1000);
					}
					
				},

			});
		},

		

	});


	/* 登录验证 */
	$('#login').validate({
		rules: {
			login_user:{
				required:true,
			},
			login_passwd:{
				required:true,
				remote: {
					url:'php/check_login.php',
					type: 'POST',
					data: {  //验证密码的时候同时匹配账户
						login_user: function(){
							return $('#login_user').val();
						}
					},

				},
			},

		},
		messages: {
			login_user:{
				required: "账号不得为空！",
			},
			login_passwd:{
				required:"密码不得为空！",
				remote: "账号或密码不正确！"
			},
		},


		/* 错误行包裹 */
		errorLabelContainer:'ol.login_error',
		wrapper:'li',

		/* 不同提交及时获取错误信息 */
		showErrors: function(errorMap,errorList){
			var errors = this.numberOfInvalids();   //错误数量
			if (errors) {
				$('#login').dialog('option','height', errors * 20 + 290);
			}else{
				$('#login').dialog('option','height', 290);
			}

		    this.defaultShowErrors();
		},

		/*高亮错误信息*/
		highlight:function(element,errorClass){
			$(element).css('border','1px solid maroon');
			$(element).parent().find('span').html('*').css('color','maroon').removeClass('reg_succ');
		},

		/*取消高亮*/
		unhighlight:function(element,errorClass){
			$(element).css('border','1px solid #ccc');
			$(element).parent().find('span').html('').addClass('reg_succ');
		},


		/* 通过验证后执行 */
		submitHandler : function(form){
			$(form).ajaxSubmit({
				url:'php/check_login.php',
				type:'POST',

				beforeSubmit:function(formData,jForm,options){
					$('#login').dialog('widget').find('button').eq(1).button('disable');   //提交时禁用login按钮
					$('#loading').css('background','url(./img/loading.gif) no-repeat 25px 8px').html('正在登录...');
					$('#loading').dialog('open');
				},
				success:function(responseText,statusText){
					if (responseText) {
						$('#login').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background','url(./img/success.gif) no-repeat 25px 8px').html('登录成功！');

						//创建一个保存用户名的cookie user
						if($('#expires').is(':checked')){
							$.cookie('login_user',$('#login_user').val(),{
								expires:7,    //登录七天有效
							});
						}else{
							$.cookie('login_user',$('#login_user').val());
						}

						setTimeout(function(){
							/*延迟一秒 如果登录成功后台执行一些操作 */
							$('#login').resetForm();
							$('#loading').dialog('close');
							$('#login').dialog('close');	
							$('#login').find('span.star').html('*').css('color','maroon').removeClass('reg_succ');
							$('#loading').css('background','url(./img/loading.gif) no-repeat 25px 8px').html('正在登录...');


							/*显示登录信息*/
							$('#user_a').html($.cookie('login_user'));
							$('#reg_a,#login_a').hide();
							$('#user_a,#exit_a').show();

						},1000);

					}

				},

			});

		}

	});

	$('#question_tips').dialog({
		autoOpen:false,
		width:230,
		height:50,
		modal:true,
		closeOnEscape: false,    //esc键不能退出
		resizable: false,        //不可随意更改大小
		draggable:false,         //不可移动
	}).parent().find('.ui-widget-header').hide();

	/* 提问操作框 请登录后操作  用户只有登录后才有提问权限 */
	$('#button_ques').click(function(){
		/*如果用户名保存 则自动登陆*/

		if($.cookie('login_user')){
			$('#question').dialog('open');
		}else{
			$('#question_tips').dialog('open');
			setTimeout(function(){
				$('#question_tips').dialog('close');
				$('#login').dialog('open');
			},1000);
		}
		
	});

/*	$('#button_ques').click(function(){
		$('#question').dialog('open');
	});*/
	/*提问窗口制作*/
	/*$('#content_ques').click(function(){
		alert('ddd');
		$('.uEditorIframe').contents().find('#iframeBody').html('');
	});*/

	$('#question').dialog({
		autoOpen: false,
		width:500,
		height:400,
		modal:true,
		buttons:{
			'发布':function(){
				$(this).ajaxSubmit({
					 url:'php/add_question.php',
					 type:'POST',
					 data:{
					 	login_user:function(){
					 		return $.cookie('login_user');
					 	},
					 	content_ques: $('.uEditorIframe').contents().find('#iframeBody').html(),  //从框架里面的内容查找
					 },
					 beforeSubmit:function(formData,jForm,options){
						$('#question').dialog('widget').find('button').eq(1).button('disable');
						$('#loading').dialog('open');
					 },
					 success:function(responseText,statusText){
						if (responseText) {
							$('#question').dialog('widget').find('button').eq(1).button('enable');
							$('#loading').css('background','url(./img/success.gif) no-repeat 25px 8px').html('问题发布成功...');

						    setTimeout(function(){
								/*延迟一秒 如果问题发布成功后台执行一些操作 */
								$('#question').resetForm();
								$('#loading').dialog('close');
								$('#question').dialog('close');	
								$('.uEditorIframe').contents().find('#iframeBody').html('请输入问题描述！');
								$('#loading').css('background','url(./img/loading.gif) no-repeat 25px 8px').html('数据交互中...');
								

							},1000);

						}

					 },

				});
			},
		},
	});

	$('#content_ques').uEditor();

	/* 加载主界面数据 */
	$.ajax({
		url: 'php/show_contents.php',
		type: 'POST',
		success:function(response,status,xhr){
			var arr = [];  //用于存放当前内容的高度
			//alert(response);
			var json = $.parseJSON(response);
			var html = '';
			var summary = [];
			for(var i=0;i<json.length;i++){
				html += "<div class='info'>" + json[i].user + "发表于" + json[i].quesdate + 
				        "</div><h3>"+ json[i].title + "</h3><div class='s_editor'>" +  
				        json[i].content + '</div><div class="bottom"><span class="comment" data-id=" '+ json[i].id +' "  data-user="'+ json[i].user +' ">'+ json[i].count +'条评论</span><span class="focusques" style="position:relative"><img src="./img/ico/plus_white.ico" style="position:absolute;"><span style="margin-left:19px">关注问题</span></span><span class="share" style="position:relative"><img src="./img/ico/heart_black.ico" style="position:absolute;top:1px;"><span style="margin-left:19px">感谢</span></span><span class="collection" style="position:relative"><img src="./img/ico/collect_in.ico" style="position:absolute;top:-1px;"><span style="margin-left:19px">收藏</span></span><span class="up" style="position:relative"><img style="position:absolute;top:2px;" src="./img/ico/up.ico" >&nbsp;&nbsp;收起</span></div><hr noshade="noshade" size="1" />'+
				'<div class="comment_list"></div>' ;
			}
			

			$('#s_contents').append(html);

			/* 对字符串进行截取 只显示前200个字符 其他隐藏 */
			//alert($('.s_editor').length);         //显示的条数
			$.each($('.s_editor'),function(index,value){
				arr[index] = $(value).html();       //保存数据

				summary[index] = arr[index].substr(0,200);  //截取200个字符

				if (summary[index].substring(199,200) == '<') {
					summary[index] = replacePos(summary[index],200,'');
				};
				if (summary[index].substring(198,200) == '</') {

					summary[index] = replacePos(summary[index],200,'');
					summary[index] = replacePos(summary[index],199,'');
				};

				if (arr[index].length < 200) {
					 $('.bottom').find('.up').eq(index).hide();
				}

				if (arr[index].length > 200) {
					/*在需要显示的200字符后面加上 显示全部 标签*/
					summary[index] += "<span class='down' style='position:relative'><img src='./img/ico/down.ico' style='position:absolute;top:1px;'>&nbsp;&nbsp;显示全部</span>";
					/*用summary替换arr*/
					 $(value).html(summary[index]);

					 $('.bottom').find('.up').eq(index).hide();
				}

		

			});

			/*点击显示更多 显示数据  收起标签显示*/
			$.each($('.s_editor'),function(index,value){
				$(this).on('click', '.down', function(event) {   //事件委托
					$(this).hide();
					$(value).html(arr[index]);
					 $('.bottom').find('.up').eq(index).show();
				});

			});

			/*点击收起 收起数据 显示更多出现*/
			$.each($('.bottom'),function(index,value){
				$(this).on('click', '.up', function(event) {   //事件委托
					
					$(this).hide();
					$('.s_editor').eq(index).html(summary[index]);
					 $('.down').eq(index).show();
				});

			});



			/* 关注问题点击 */
			$.each($('.bottom'),function(index,value){
				$(this).on('click', '.focusques', function(event) {   //事件委托
					
					if ($(this).find('span').html()=='关注问题') {

						$(this).find('img').eq(0).hide();
						$(this).find('span').html('取消关注');
					
					}else{		
						$(this).find('img').eq(0).css({
							display: 'inline',
							top: '1px'
						}).show();
						
						$(this).find('span').html('关注问题');

					}		
					
				});
			});

			/* 感谢分享点击 */

			$.each($('.bottom'),function(index,value){
				$(this).on('click', '.share', function(event) {   //事件委托
					
					if ($(this).find('span').html()=='感谢') {
						$(this).find('img').eq(0).attr('src','./img/ico/heart_red.ico');
						$(this).find('span').html('取消感谢');
					
					}else{		
						$(this).find('img').eq(0).attr('src','./img/ico/heart_black.ico')
						
						$(this).find('span').html('感谢');

					}
					
					
				});
			});


			/* 收藏点击 */

			$.each($('.bottom'),function(index,value){
				$(this).on('click', '.collection', function(event) {   //事件委托
					//alert($(this).find('span').html());
					if ($(this).find('span').html()=='收藏') {
						$(this).find('img').eq(0).attr('src','./img/ico/collect_out.ico');
						$(this).find('span').html('取消收藏');
					
					}else{		
						$(this).find('img').eq(0).attr('src','./img/ico/collect_in.ico')
						
						$(this).find('span').html('收藏');

					}
					
					
				});
			});


			/* 鼠标经过效果 */
		    $.each($('.bottom'),function(index,value){


				$(this).on('mouseover', '.focusques', function(event) {   
					$(this).find('span').css('color','#0c9');
					
				});

				$(this).on('mouseout', '.focusques', function(event) {   
					$(this).find('span').css('color','#399');
					
				});


				$(this).on('mouseover', '.share', function(event) {   
					$(this).find('span').css('color','#0c9');
					
				});

				$(this).on('mouseout', '.share', function(event) {   
					$(this).find('span').css('color','#399');
					
				});

				$(this).on('mouseover', '.collection', function(event) {   
					$(this).find('span').css('color','#0c9');
					
				});

				$(this).on('mouseout', '.collection', function(event) {   
					$(this).find('span').css('color','#399');
					
				});

				$(this).on('mouseover', '.comment', function(event) {   
					$(this).css('color','#0c9');
					
				});

				$(this).on('mouseout', '.comment', function(event) {   
					$(this).css('color','#399');
					
				});
			});


		    /* .bottom 底部评论加载模块 */
		    $.each($('.bottom'),function(index,value){
		    	$(this).on('click','.comment',function(event){
		    		var comment_this = this;
		    		if ($.cookie('login_user')) { //用户登录后方可进行查看评论操作
		    			/*先判断 评论的form是否已动态创建  保证只创建一次评论表单 */
		    			if (!$('.comment_list').eq(index).has('form').length) {  //不存在表单才进行ajax加载评论列表和评论框
		    				$.ajax({
		    					url:'php/show_comments.php',
		    					type:'POST',
		    					data:{
		    						questionid : $(comment_this).attr('data-id'),   //把要加载评论的问题的id号传给comment数据表  用于查询里面的对于问题的评论条数
		    					},
		    					beforeSend:function(jqXHR,settings){
		    						$('.comment_list').eq(index).append("<dl class='comment_load'><dd>正在加载评论</dd><dl>");
		    						
		    					},
		    					success:function(response,status){
		    						$('.comment_list').eq(index).find('dl.comment_load').hide();

		    						//分页显示评论

		    						
		    						
		    						//取得json
		    						var comment_json = $.parseJSON(response);
		    						var count = 0;
		    						//向评论列表里面加入内容
		    						$.each(comment_json,function(index2,value){  //防止index冲突
		    							count = value.count;   //分页页数
		    							$('.comment_list').eq(index).append('<dl class="comment_contents"><dd class="comment_user">' + value.commentuser + '</dd><dd class="comment_text">' + value.comment + '</dd><dd class="comment_time">'+ value.commentdate +'<dd><hr noshade="noshade" width="100%" size="1" style="color:#ccc;margin-left:0" /><dl>');
		    						});

		    						$('.comment_list').eq(index).append('<dl class="comment_more"><dd><span class="load_more">加载更多评论</span></dd></dl>');
		    						
		    						var page = 2;

		    						if(page > count){  //只有一页
		    							$('.comment_list').eq(index).find('.load_more').button().off('click');
		    							$('.comment_list').eq(index).find('.load_more').hide();
		    						}

		    						$('.comment_list').eq(index).find('.load_more').button().click(function(event) {
		    							$('.comment_list').eq(index).find('.load_more').button('disable');  //加载更多评论禁用

		    							$.ajax({
		    								url:'php/show_comments.php',
		    								type:'POST',
		    								data:{
		    									questionid : $(comment_this).attr('data-id'),
		    									page: page,
		    								},
		    								beforeSend:function(jqXHR,settings){
					    						$('.comment_list').eq(index).find('.load_more').html('<img src="./img/load_more.gif" />');
					    						
					    					},
					    					success:function(response,status){
								    			var comment_json_more = $.parseJSON(response);
					    						
					    						//向评论列表里面加入更多内容
					    						$.each(comment_json_more,function(index3,value){  //防止index冲突
					    							
					    							$('.comment_list').eq(index).find('.comment_contents').last().after('<dl class="comment_contents"><dd class="comment_user">' + value.commentuser + '</dd><dd class="comment_text">' + value.comment + '</dd><dd class="comment_time">'+ value.commentdate +'<dd><hr noshade="noshade" width="100%" size="1" style="color:#ccc;margin-left:0" /><dl>');
					    						});

					    						$('.comment_list').eq(index).find('.load_more').html('加载更多评论');
												$('.comment_list').eq(index).find('.load_more').button('enable');

												page++;

												if(page > count){  //只有一页
					    							$('.comment_list').eq(index).find('.load_more').button().off('click');
					    							$('.comment_list').eq(index).find('.load_more').hide();
					    						}
					    					},




		    							});
		    						});





		    						//alert($(comment_this).attr('data-id'));
		    						//加载评论表单  
		    						$('.comment_list').eq(index).append('<form><dl class="add_comment"><dd><textarea class="add_text" name="comment" >请输入评论内容:</textarea></dd><dd><input type="hidden" name="commentuser" value="'+$.cookie('login_user')+'"><input type="hidden" name="questionid" value="' + $(comment_this).attr('data-id') + '"><input type="button" value="评论" class="add_comment_button"></dd></dl></form>');
		    						
		    						$('.comment_list').eq(index).find('form').on('focus', '.add_text', function(event) {
		    							if ($(this).val() == '请输入评论内容:') {
		    								$(this).val('');
		    								$(this).css('color','black');
		    							}
		    						});

		    						$('.comment_list').eq(index).find('form').on('blur', '.add_text', function(event) {
		    							if (!$(this).val()) {
		    								$(this).val('请输入评论内容:');
			    							$(this).css('color','#ccc');
		    							}
		    						});
								
									/* 评论按钮 处理 */
									$('.comment_list').eq(index).find('form').find('input[type=button]').button().click(function(event) {
										//执行ajax提交整个表单
										$('.comment_list').eq(index).find('form').ajaxSubmit({
											url: 'php/add_comment.php',
											type: 'POST',
									

											beforeSubmit: function(formData,jqForm,options){
												$('.comment_list').eq(index).find('form').find('input[type=button]').button('disable');   //发布评论时禁用提交按钮
												$('#loading').dialog('open');

											},
											success: function(responseText,statusText){
												
												if(responseText){
													$('.comment_list').eq(index).find('form').find('input[type=button]').button('enable');   
													
													$('#loading').css('background','url(./img/success.gif) no-repeat 20px center').html('评论成功...');
													

													setTimeout(function(){   //延迟一秒 如果发布成功则关闭窗口
														$('#loading').dialog('close');
														
														//将新评论添加到评论列表的开头
														var date = new Date();
														var format_date = date.getFullYear()+'-'+(date.getMonth()+1>=10?(date.getMonth()+1):'0'+(date.getMonth()+1))+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
														$('.comment_list').eq(index).prepend('<dl class="comment_contents"><dd class="comment_user">' + $.cookie('login_user') + '</dd><dd class="comment_text">' + $('.comment_list').eq(index).find('textarea').val() + '</dd><dd class="comment_time">'+ format_date +'<dd><hr noshade="noshade" width="100%" size="1" style="color:#ccc;margin-left:0" /><dl>');

														$('.comment_list').eq(index).find('form').resetForm();
														$('.comment_list').eq(index).find('form').find('textarea').css('color','#ccc');
														$('#loading').css('background','url(./img/loading.gif) no-repeat 20px center').html('数据交互中...');
														
													},1000);
												};
											},
										});
									});
		    						

		    						

		    					},



		    				});
		    			}


		    			if ($('.comment_list').eq(index).is(':hidden')) {   //初始是隐藏状态
		    				$('.comment_list').eq(index).show();
		    			}else{
		    				$('.comment_list').eq(index).hide();
		    			}
						

		    		}else{  
		    		    //如果用户没登录的则不能查看评论

		    			if(!$.cookie('login_user')){
							$('#question_tips').dialog('open');
							setTimeout(function(){
								$('#question_tips').dialog('close');
								$('#login').dialog('open');
							},1000);
						}
						


		    		}
		    		
		    	});
		    });



		}


	});





});

function replacePos(strObj,pos,replaceText){
	var str = strObj.subStr(0,pos-1) + replaceText +  strObj.subStr(pos, strObj.length);
	return str;
}