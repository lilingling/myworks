(function(window) {

    window.enableTouch = true;
// Utils
window.Utils = {
    'queryHref' : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!==null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    },
    'ShowCanvas': function ( obj1, obj2 ) {
        enableTouch = false;
        var canvas = obj1.get(0);
        var hand= obj2.find('.hand').get(0);
        var box = obj2.find('.box').get(0);
        var arrow=obj2.find('.slide-arrow');
        var img2Src=obj2.find('.p2-pic').attr('src');
        //console.log(img2Src);
        var ctx = canvas.getContext("2d");// 获取图形上下文
        var x1, y1, a = 30, timeout, totimes = 100, jiange = 30;
        canvas.width = document.getElementById("slide").clientWidth;
        canvas.height = document.getElementById("slide").clientHeight;
        var img1 = new Image(),
            img2 = new Image();
        img1.src = "images/p1.jpg";
        img2.src = img2Src;
        var imgHeight = 0;
        var img1Loaded = false,
            img2Loaded = false;
        img1.onload = function () {// 一边装载一边绘制，解决用户加载等待问题
            ctx.drawImage(img1, 0, 0, canvas.width, canvas.height)// 画布中绘制图像
            //ctx.fillRect(0,0,canvas.width,canvas)
            img1Loaded = true;
        }
        img2.onload = function(){
            imgHeight = img2.height * canvas.width / img2.width;
            console.log( imgHeight )
            ctx.drawImage(img2, 0, 0, canvas.width, imgHeight )// 画布中绘制图像
            //ctx.fillRect(0,0,canvas.width,canvas)
            img2Loaded = true;
        }
        var timer = setInterval(function(){
            if( img1Loaded && img2Loaded ){
                tapClip();
            }
        },20);

        //通过修改globalCompositeOperation来达到擦除的效果
        function tapClip() {
            clearInterval( timer )
            var hastouch = "ontouchstart" in window ? true : false,
                tapstart = hastouch ? "touchstart" : "mousedown",
                tapmove = hastouch ? "touchmove" : "mousemove",
                tapend = hastouch ? "touchend" : "mouseup";


            ctx.lineCap = "round"; // 设置或返回线条末端线帽的样式
            ctx.lineJoin = "round"; // 设置或返回两条线相交时，所创建的拐角类型
            ctx.lineWidth = a * 2; // 线宽
            ctx.globalCompositeOperation = "destination-out";  //设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上。  在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。

            canvas.addEventListener(tapstart, function (e) {
                clearTimeout(timeout) //clearTimeout() 方法可取消由 setTimeout() 方法设置的 timeout。
                e.preventDefault();

                x1 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft;
                y1 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop;
                //圆形区域的擦除
                ctx.save();
                ctx.beginPath();
                ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();

                canvas.addEventListener(tapmove, tapmoveHandler);
                canvas.addEventListener(tapend, function () {
                    canvas.removeEventListener(tapmove, tapmoveHandler);

                    timeout = setTimeout(function () {  //如果用户狂点鼠标，就会狂触发mouseup事件，也就是会疯狂的触发那个循环计算像素，导致页面卡住。加个timeout，延迟执行像素计算，而在每一次点击的时候再清除timeout，也就是如果用户点击很快，这个计算也就触发不了了
                        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        var dd = 0;
                        for (var x = 0; x < imgData.width; x += jiange) {  //jiang设置的是30 但不知道是啥
                            for (var y = 0; y < imgData.height; y += jiange) {
                                var i = (y * imgData.width + x) * 4;
                                if (imgData.data[i + 3] > 0) {
                                    dd++
                                }
                            }
                        }
                        if (dd / (imgData.width * imgData.height / (jiange * jiange)) < 0.9) {
                            $(canvas).remove()
                            $(hand).remove()
                            $(arrow).show()
                            enableTouch = true;
                            // canvas.className = "noOp";

                        }
                    }, totimes)
                });
                function tapmoveHandler(e) {
                    clearTimeout(timeout);
                    e.preventDefault();
                    x2 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft;
                    y2 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop;
                    hand.style.left = x2 + 'px';
                    hand.style.top = y2 + 'px';
                    ctx.save();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                    ctx.restore()

                    x1 = x2;
                    y1 = y2;

                    $(box).remove();

                }
            })

        }
    }
};






    var scene = $('.scene'),
        len = scene.length,
        isAnimating = false, // 动画进程
        musicPlayed = false; // 是否滑动播放音乐
    /**
     * loading
     * IIFE
     */
    var loading = (function(){
        $( '.icon-porcess' ).html( '0%' );
        var loadCount = 0,
            preLoadImgs = eventsConfig.preLoadImgs,
            len = preLoadImgs.length;
        if( len < 2 ){
            setTimeout( checkFromShare, 200);
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

                $( '.icon-porcess' ).html( percent + '%' );
                if( loadCount === len ){

                    $( '.icon-porcess' ).html( 100 + '%' );
                    setTimeout( checkFromShare, 200)
                }
            }
            fakeImg.onload = loadSuccess;
        })
    })();

    /**
     * 判断是否由分享过来的
     * --------------
     * 如果是没有生成我的电影分享出去的话
     * 链接是活动的链接
     * --------------
     * 如果生成了我的电影分享出去
     * 需要在URL上增加'from=singlemessage&movie=' + movieIndex
     * --------------
     * @return {[type]} [description]
     */
    function checkFromShare(){
        var refer = Utils.queryHref( 'refer' );
        // 存在refer，直接根据movieIndex跳转至最后一页
        if( !!refer ){
            $( '.mask_loading' ).css('opacity', 0 ).hide();
            var movie = Utils.queryHref( 'movie' );
            preRenderFinal( movie || 1 );
        // 不存在refer，正常流程
        } else {
            $( 'body' ).trigger( 'loadComplete' );
        }
    }


    /**
     * 显示弹层
     * @param  { string } target mask弹窗
     */
    function showMask( target ){
        var target = $( '.mask_' + target );
        $( '.mask').removeAttr( 'showstatus').hide();
        target.show().attr( 'showstatus', 'show');
        //checkMask();
    }

    /**
     * 隐藏弹层
     * @param  { string } target mask弹窗
     */
    function hideMask( target ){
        var target = $( '.mask_' + target );
        target.hide().removeAttr( 'showstatus' );
        //checkMask();
    }

    function checkPosition(){
        var target = $( '.currentScene'),
            currentIdx = target.index();

        var prevItem = target.prev().length ? target.prev() : scene.eq( len - 1 );
        !prevItem.hasClass('goUpScene') && prevItem.removeClass( 'goUpScene goDownScene' ).addClass('goUpScene'); 
        var nextItem = target.next().length ? target.next() : scene.eq( 0 );
        !nextItem.hasClass('goDownScene') && nextItem.removeClass( 'goUpScene goDownScene' ).addClass('goDownScene');
        isAnimating = false;
    }

    /**
     * 动画函数
     * @param  { Zepto Obj } target  当前scene
     * @param  { number } nextIndex 下一个要执行的标签index
     * @return {[type]}          [description]
     */
    function doAnimation( target, nextIndex, direction ){

        var nextScene = $( '#scene_' + nextIndex ); // 即将执行动画的scene

        if( direction === -1  ){ // 下
            target.removeClass('currentScene').addClass( 'goDownScene' );
        } else { // 上
            target.removeClass('currentScene').addClass( 'goUpScene' );
        }

        nextScene.removeClass('currentScene goUpScene goDownScene').addClass('currentScene');
        if( nextScene.find( 'canvas').length){
            var canvas = nextScene.find('canvas');
            Utils.ShowCanvas( canvas, nextScene );
           // console.log(hand.get(0))
        }
        isAnimating = true;
        // 动画完成后确认重新定义位置
        setTimeout( checkPosition, 500);
    }

    /**
     * 检测执行动画函数
     * @param  { Zepto obj } target  当前scene
     * @param  {number 1|-1} direction 方向
     * @return {[type]}           [description]
     */
    function checkScroll( target, direction ){

        if( !enableTouch ){
            return;
        }
        var target = $( target ),
            className = target.attr( 'class'),
            cycle = eventsConfig.cycle;
        //if( !musicPlayed ){
        //    music.togglePlay();
        //}
            
        if( isAnimating ){
            return;
        }

        // 当前scene连续滑动不执行操作
        if( className.indexOf( 'currentScene' ) == -1 ){
            return;
        }

        var idx = parseInt( target.attr( 'id' ).split( '_' )[1] ),
            nextIndex = idx + direction;


        if( cycle === 'false' ){ // 不循环

            // 第一张最后一张不执行操作
            if( (idx + direction) === 0 || (idx + direction) === len + 1 ){ 
                return;
            }
            doAnimation(  target, nextIndex, direction  );

        } else { // 无限循环 && 向下循环

            // 第一张 + 往上滑
            if( (idx + direction) === 0 ){
                if(  cycle === 'cycle' ){ // 无限循环
                    nextIndex = len;
                }
                // cycle = down 不执行任何操作
            // 最后一张 + 往下滑
            } else if ( (idx + direction) === len + 1 ){ 
                nextIndex = 1
            // 普通 
            } else { 
                nextIndex = idx + direction; 
            }

            doAnimation( target, nextIndex, direction );

        }
    };



    /**
     * 根据id查询获取年签详细内容
     * @param  {[type]} number [description]
     * @return {[type]}        [description]
     */
    function getLabelByNum( number ){
        var randomLabel = labelLib[ number ];

        if( typeof randomLabel.imgBg === 'undefined' ){
            $.extend( randomLabel, {
                'imgBg' : 'http://weixin.wepiao.com/huodong/wx/20150215/33333/imgs/label/bg/' + number + '.jpg',
                'imgImg' : 'http://weixin.wepiao.com/huodong/wx/20150215/33333/imgs/label/img/' + number + '.jpg'
            }, true )
        }
        return randomLabel;
    }



    function renderUrl( number ){
    	if( typeof number === 'undefined' ){
    		return;
    	}
    	var originUrl = location.href;
    	var paramString = ( originUrl.indexOf( '?' ) > -1  ? '&' : '?' ) + 'refer=review&movie=' + number;
    	// console.log( paramString ); 
    	eventsConfig.shareOptions.link = originUrl + paramString;
    }
    /**
     * 渲染final页
     * @param  {[type]} randomLabel [description]
     * @return {[type]}             [description]
     */
    function renderFinal( randomLabel ){
        
        $( '#myLabel' ).html( randomLabel.label );
        $( '#finish_loading' ).hide();
        $( '.finish_scene' ).show().addClass('finish_show' );
    }

    scene.each( function( index, item){
        // item.style.background = '#' + randomColor();
       var isTouched = true,
            touchStartPos = {
                x: 0,
                y: 0
            },
            touchEndPos = {
                x: 0,
                y: 0
            };

        item.addEventListener( 'touchstart', function( event ){
            // console.log( $( event.currentTarget )[0].nodeName )
            isTouched = true;
            touchStartPos.x = event.touches['0'].clientX;
            touchStartPos.y = event.touches['0'].clientY;

            touchEndPos.x = event.touches['0'].clientX;
            touchEndPos.y = event.touches['0'].clientY;
        }, false );

        item.addEventListener( 'touchmove', function(){
            if( isTouched ){
                // console.log("isTouched is true");
                touchEndPos.x = event.touches['0'].clientX;
                touchEndPos.y = event.touches['0'].clientY;
            }
        }, false );

        item.addEventListener( 'touchend', function(){
            isTouched = false;
            if( parseInt( touchEndPos.y ) - parseInt( touchStartPos.y ) > 50 ){
                // alert( '向下滑' );
                checkScroll( this, -1 );
            } else if( parseInt( touchEndPos.y ) - parseInt( touchStartPos.y ) < -50 ) {
                // alert( '向上滑' );
                checkScroll( this, 1 );
            } else {
                // alert( '不翻页' );
            }

        }, false );
    });

    // 点击头像大图显示
    function showImage(index) {
        index += 1;
        $('#headPic').attr('src','images/head-pic-0'+index+'.png');
        $('.mask1').show();
    }


    /**
     * 事件绑定
     * IIFE
     */
    var eventsBind = (function(){

        // 禁用body滚动
        document.body.addEventListener('touchmove', function( event ){
            event.preventDefault();
        }, false )

        // 显示弹窗
        $( '.button-text' ).on( 'touchend', function( event ){
            showMask( 'eventDialog' )
        } )

        //点击选择头像
        $('#head-icon').find('li').on('click',function(){
            var index = $(this).index();
            console.log(index);
            showImage(index);
        });
        $('#close').on('click',function(){
            $('.mask1').hide();
        });


        // mask层阻止冒泡，防止点透事件
        $( document ).on( 'touchend touchmove', '.mask', function( event ){
            event.stopPropagation();
            return false;
        })

        // load完成执行动画
        $( 'body' ).on( 'loadComplete', function(){
            $( '.mask_loading' ).hide();
            setTimeout( function(){
                $( '.firstScene' ).addClass( 'currentScene' );
            }, 200 )
        });


    })();



}(this));
