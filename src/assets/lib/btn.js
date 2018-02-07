$(function(){
	var onOff=false;
	var i;

	// 隐藏右侧按钮
	function HideBtn(){
		$('#rightTop').slideUp();
	}
	// 隐藏右侧所有弹出
	function HideBox(){	
		$('#HideMode section').hide();
		$('.coverbtn div').removeClass('sence-btn-hover');
	}

	// 默认第一个隐藏框显示
	function ShowScroll(){
		//$('.coverbtn div').removeClass('sence-btn-hover');
		//$(".sence-btn div").addClass('sence-btn-hover');
		$('#leftHide').show();
	}

	//点击菜单关闭按钮
	$('.plus').addClass('plus-hover').removeClass('plus-blur');
	$(".plus-btn").click(function(){
		if (onOff) {
			$('#rightTop').slideDown();
			$('.plus').addClass('plus-hover').removeClass('plus-blur');
			ShowScroll();
			onOff=false;
		}else{
			$('#rightTop').slideUp();
			$('.plus').removeClass('plus-hover').addClass('plus-blur');
			HideBox();
			HideBtn();
			$('#leftHide').hide();
			onOff=true;
		}
	})	

	//  $('#rightbtn .btn').click(function(){
	//  	var i=$(this).attr('data-index');				
	// 	if ($('div',this).hasClass('sence-btn-hover')) {
	// 		$('div',this).removeClass('sence-btn-hover');
	// 		$('#HideMode section').eq(i).hide();	
	// 	}else{			
	// 		//$('.btn div').removeClass('sence-btn-hover');
	// 		$('div',this).addClass('sence-btn-hover');	
	// 		$('#HideMode section').eq(i).show();	
	// 	}
		
	// })

	//点击图标
	$('.coverbtn').click(function(){
		// HideBox();
		if ($('div',this).hasClass('sence-btn-hover')) {
			$('.coverbtn div').removeClass('sence-btn-hover');
			// ShowScroll();
		}else{			
			$('.coverbtn div').removeClass('sence-btn-hover');
			$('div',this).addClass('sence-btn-hover');		
			// $('.vr-btn').removeClass('sence-btn-hover');
		}
	})
	// $('#topbtn .clickbtn').click(function(){
	// 	// HideBox();
	// 	console.log(1111)
	// 	if ($('div',this).hasClass('sence-btn-hover')) {
	// 		$('.clickbtn div').removeClass('sence-btn-hover');
	// 		// ShowScroll();
	// 	}else{			
	// 		$('.clickbtn div').removeClass('sence-btn-hover');
	// 		$('.clickbtn div',this).addClass('sence-btn-hover');		
	// 		// $('.vr-btn').removeClass('sence-btn-hover');
	// 	}
	// })

	//点击VR提示界面
    $('#percentage').click(function(){
    	HideBox();
    	ShowScroll();
    }) 
	
	// 场景中面板关闭按钮
	$('#board .app-close').click(function(){
		$('#board').hide();
	})

	

})