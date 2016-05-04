
var end2=false;
var end3=false;
var section3End = false;
function callBackFun(pid,className,activeId){
	var heads = ['joy','disgust','sadness','fear','anger','bling']
	var pen = $("."+pid); //jquery对象赋值给变量
	var currentObj = $("."+heads[activeId-1]);
	pen.removeClass('penAnimation');
	setTimeout(function(){
		pen.addClass(className); //叠加class 重设笔的坐标位置
		pen.addClass('penAnimation');
		currentObj.addClass("active");
	},500)
}
function openMouth(){
	setTimeout(function(){
		$('.amy_mouth').attr('src','images/amy_openmouth.png');
		$('.pbylis_mouth').attr('src','images/pbylis_openmouth.png');
		$('.mincy_mouth').attr('src','images/mincy_openmouth.png');
		$('.lewis_mouth').attr('src','images/lewis_openmouth.png');
		$('.bill_mouth').attr('src','images/bill_openmouth.png');
		
	},2500);
	end3=true;
}
function section02Anim(){
	var f=1;
	var index=1;
	var drawingT=setInterval(function(){
			f++;
		    if (f > 17) { 
		    	clearInterval(drawingT); 
		    	$('.pen').addClass('pendrawing01');
		    	$('.pen').addClass('penAnimation')
		    	$('.joy').addClass('active');
		    	$('.pen').css('opacity','1');
		    	var headTimer = setInterval(function(){
		    		index++;
		    		/*
		    		$('.pen').removeClass('penAnimation');
					setTimeout(function(){
						$('.pen').addClass('pendrawing02');
						$('.pen').addClass('penAnimation');
		    			$('.disgust').addClass('active');
					},500)*/
		    		
		    		callBackFun('pen','pendrawing0'+index,index);
		    		if(index>=6){
		    			clearInterval(headTimer);
		    		}
		    	},1000);
		    	
		    }
		    else drawing(f);
		    //console.log('f'+f);
		    
		},400);
	end2=true;
}
function section03Anim(){
	var s=0,e=1,n=1;
	var firworkT=setInterval(function(){
			n++;
		    if (n > 8) { 
		    	clearInterval(firworkT); 
		    	$('.firwork').css('opacity','0');
		    }
		    else firwork(n);
		    //console.log(n);
		},500);

	setTimeout(function(){
		var joycolorT=setInterval(function(){
			s++;
		    if (s > 9) { 
		    	clearInterval(joycolorT); 
		    	setTimeout(function(){
		    		$('.disgust_uncolor').attr('src','images/disgust_color.png');

		    	},500);
		    	setTimeout(function(){
		    		$('.sadness_uncolor').attr('src','images/sadness_color.png');
		    	},1000)
		    	setTimeout(function(){
		    		$('.fear_uncolor').attr('src','images/fear_color.png');
		    	},1500)
		    	setTimeout(function(){
		    		$('.anger_uncolor').attr('src','images/anger_color.png');
		    	},2000)
		    }

		    else joycolor(s);
		},100)
	},3500);
	section3End = true;
	
}
function firwork(id){
	$('.firwork').attr('src','images/firwork0'+id+'.jpg');
}
function joycolor(id){
	if(id==9){
		$('.joy_uncolor').css('visibility','hidden');
	}
	$('.joycolor').attr('src','images/color0'+id+'.png');

}
function drawing(id){
	$('.drawing').attr('src','images/draw0'+id+'.png');
}

$(function(){
	/**
 * 图片预加载并显示进度
 * loading
 * IIFE
 */
	var loading = (function(){
	    $( '.icon-process' ).html( '0%' );
	    var loadCount = 0,
	        preLoadImgs = eventsConfig.preLoadImgs,
	        len = preLoadImgs.length;
	    if( len < 2 ){
	        return;
	    }
	    $.each( preLoadImgs, function( index, item ){
	        var fakeImg = new Image();
	        fakeImg.src = item;
	        fakeImg.onerror = function(){
	            loadSuccess();
	        }
	        function loadSuccess(){
	            var percent = parseInt( ( loadCount/len ).toFixed( 2 ) * 100 );
	            loadCount ++;
	            $( '.icon-process' ).html( percent + '%' );
	            if( loadCount === len ){
	                $( '.icon-process' ).html( 100 + '%' );
	                setTimeout(function(){
	                	$( '.mask_loading' ).css('opacity', 0 ).hide();
	                }, 200);
	            }
	        }
	        fakeImg.onload = loadSuccess;
	    })
	})();

	$('.wrapper').scroll(function(){
		var scrollTop = $(this).scrollTop();
		var deviceH=$(window).height();
		for(var i=1;i<=$('section').length;i++){
			var pTop = $('.section0'+i)[0].offsetTop;
        	if((scrollTop+deviceH*(2/3))>=pTop){
      			$('.section0'+i).addClass('show');	
      		}
      	}
      	if($('.section02').hasClass('show')){
      		if(!end2){
      			section02Anim();
      		}
      		
      	}
      	if($('.section03').hasClass('show')){
      		//if(!end){section03Anim();}
      		if(!section3End){section03Anim();}
      		
      	}
      	if($('.section05').hasClass('show')){
			//alert('show');
      		if(!end3){openMouth();}	
      	}
		if($('.section04').hasClass('show')){
			var t2=setTimeout(function(){
				$('.chatwrap').addClass('backgroundHide');
			},2500);
			var t3=setTimeout(function(){
				$('.chatwrap').addClass('changeChatwrap');
			},2650)
		}
      			
	});

	$('.playbutn01').on('tap',function(){
		$('.animation').attr('src','images/anim.gif');
		$(this).hide();
	})
})