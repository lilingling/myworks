	// 动画部分
	function changeBg(indx){
		$(".p1_page").attr('src','images/p1_page0'+indx+'.jpg');
	}
	function tuzi4(){
		var d=4;
		var tuzimoveT=setInterval(function(){
				d++;
				if(d == 7){d=5;}
				$(".tuzimove").attr('src','images/tuzi4/'+d+'.png');
			},300);
	}
	function tuzi5(indx){
		$(".tuzi5").attr('src','images/tuzi5/'+indx+'.png');
	}
	function light(indx){
		$(".light").attr('src','images/light1/'+indx+'.jpg');
	}
	function walk(indx){
		$(".tuzi4").attr('src','images/tuzi4/'+indx+'.png');
	}

	function tuziday(indx,l){
		$(".tuzi-day"+l).attr('src','images/tuzi2/day'+l+'/'+indx+'.png');
	}
	var lens = [2,11,2,2,2,2,2];
	var dayT=null;
	var steps_rabbit = 0;
	function oneday(i){
		var len = lens[i-1];
		$('.tuzi').hide();
		$('.tuzi').eq(i-1).show();
		dayT=setInterval(function(){
			steps_rabbit++;
			if(steps_rabbit == (len+1) ){
				console.log(steps_rabbit)
				steps_rabbit=1;
			}
			tuziday(steps_rabbit,i);
		},300);

		$('.night').show().addClass('current');
		$('.day').hide().removeClass('current')
		var t=setTimeout(function(){
					$('.night').removeClass('current').hide();

			// if(i%2!==0){
			// 	$('.night').removeClass('current').addClass('hide');
			 	$('.day').show().addClass('current');
			 	if(i==7){
			 		$('.day').show().removeClass('current');
			 	}
			// }
			// else{
			// 	$('.day').removeClass('current').addClass('hide');
			// 	$('.night').removeClass('hide').addClass('current');
			// }
		},400);
	
	}
	function text(){
		var b=0;
		var textT=setInterval(function(){
			b++;
			if(b>7){clearInterval(textT);}
				$(".text03").attr('src','images/text/'+b+'.png');
			},200);
		
	}
	var n=1,f=0,a=0,c=0,j=0,h=2,i=13,k=15,l=17,m=19,p=21;
	var tag1=false,tag2=false,tag4=false;
	var changebgT=setInterval(function(){
		n++;
		changeBg(n);
		if(n == 2){n=0;}
	},200);
	function Animation(){
		var t=setInterval(function(){
		    f++;
		    if(f == 3){f=1;} 
		    tuzi5(f);
		},500);

	if($('#scene_2').hasClass('currentScene')){
		if(!tag4){
		oneday(1);
		var timer=1;
		var onedayT=setInterval(function(){
			clearInterval(dayT);
			steps_rabbit = 0;
			timer++;
			if(timer>6){clearInterval(onedayT);}
			oneday(timer);
			$('.day'+(timer-1)).hide();
			$('.day'+(timer)).show();
		},1000)
		tag4=true;
		}
	}
		
		if($('#scene_4').hasClass('currentScene')){
			if(!tag2){
				var walkT=setInterval(function(){
					c++;
					walk(c);
					if(c == 4){c=0;}
					var t1=setTimeout(function(){
						clearInterval(walkT);
						$('.tuzi4').hide();
						$(".tuzimove").show();
						tuzi4();
		    		},10000);
				},300);
				tag2=true;
				var butnT= setTimeout(function(){
					$('#scene_4 .btn-1').show();
				},10000);
			}
		}
		if($('#scene_3').hasClass('currentScene')){
			if(!tag1){
				var lightT=setInterval(function(){
					a++;
					if(a >14){
						clearInterval(lightT);
						text();
					}	
					light(a);
				
				},200);
				tag1=true;
			}
		};
	}

	//打字部分
	var it = 0;
	var first = 'first',second = 'second',typeText02='typeText02';
	var textstring01 = $('.first').html();
	$('.first').text("");
	var textstring02 = $('.second').html();
	$('.second').text("");
	var textstring03 = $('.typeText02').html();
	$('.typeText02').text("");
	var bool = true;
	function typeit(textstring, f) {
		// debugger
		var val = textstring.charAt(it);
		if(val != "!" ){
			$('.'+f).append(val);
		}
		else{
			$('.'+f).append("<br>");
		}
		if (it < textstring.length - 1) {
		    it++;
		    var typeT = setTimeout(function(){
		    	typeit(textstring, f);
		    }, 200);
		}
		else if(it >= textstring.length - 1){
		    
		    $('.first').css('visibility','hidden');
		    it=0;
		    if(bool){
		    	typeit(textstring02, second);
		    }
		    bool = false;
		    clearTimeout(typeT);
		    
		}
	}
	typeit(textstring01, first);
	var tag3=false;
			//音乐模块
    var papp = {};
    papp.audio = function (para) {
        var _audio = new Audio();
        var target = $(para.target);
        mergeKey(_audio, para, false);
        papp.audio = _audio;
        target.on("click", function () {
            if (target.hasClass("on")) {
                papp.audio.pause();
                target.removeClass("on");
                target.attr('src','images/music-off.png');
            } else {
                papp.audio.play();
                target.addClass("on");
                target.attr('src','images/music-on.png');
            }
        });
    };
    function mergeKey(obj1, obj2, union) {
        union = typeof(union) == "undefined" ? true : union;
        for (var key in obj2) {
            if (obj2.hasOwnProperty(key) && (union || (key in obj1))) {
                obj1[key] = obj2[key];
            }
        }
        return obj1;
    }
    papp.audio({
        target: "#musicButton",
        src:"bg.mp3",
        preload: "auto",
        loop: true,
        autoPlay: true
    });
    papp.audio.play();

      //   var start=0;
      //   var t1=null;
      //   function music(time){
      //       start+=1;
      //      console.log(start);
      //   if(start>time){
      //       clearInterval(t1);
      //       start=0;
      //       t1=0;
      //       papp.audio.pause();
           

      //       }
      //   }
      //   function musicplay(typetime){
    		// t1=setInterval(function(){
    		// 	music(typetime);
      //   	},1000);
      //   	papp.audio.play();   
      //   }
      //   musicplay(4);
             
        

        // 禁用滚动
        // var $page_01 = document.getElementById('page-01');
        // $page_01.addEventListener('touchmove', function (event) {
        //     event.preventDefault();
        // }, false);

        // $('.button').on('click', function () {
        //     $('.page-01').fadeOut(500);
        //     $('.page-02').show('fast');
        //     papp.audio.pause();
        // })



	function dealType(){

		if($('#scene_5').hasClass('currentScene')){
			if(!tag3){
				// musicplay(7);
				typeit(textstring03, typeText02);
				tag3=true;
			}
		}
	}

 