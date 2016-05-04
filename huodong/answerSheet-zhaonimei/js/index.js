(function(window) {
    

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
    }
};

// FastClick
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);


    // 根据高宽比例判断显示范围
    function resizeScene( ){
        var pixelRate = ( $( window).height() ) / $(window).width();
        $( '#slide' ).css( 'width', '100%');
        $( '#finish' ).css( 'width', '100%');
        if( pixelRate > 1 && pixelRate < 1.5 ){
            $( 'body' ).addClass('lowDevice');
        } else if( pixelRate < 1 ) {
            var newWidth = $( window).height() * ( 640 / 1019 );
            $( '#slide' ).css( 'width', newWidth);
            $( '#finish' ).css( 'width', newWidth);
        }
    }
    resizeScene();

    var supportsOrientationChange = "onorientationchange" in window,  
        orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";  
  
    window.addEventListener(orientationEvent, function() {  
        if( window.orientation == -90 || window.orientation == 0 ){
            resizeScene();
        }
        // var pixelRate = ( $( window).height() ) / $(window).width();
        // if( pixelRate > 1 ){
        //     $( '#slide' ).css( 'width', $( window).width() * ( 640 / 1019 ) );
        // }
    }, false); 

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
        isAnimating = true;
        // 动画完成后确认重新定义位置
        setTimeout( checkPosition, 500);
        //checkPosition();
    }

    /**
     * 检测执行动画函数
     * @param  { Zepto obj } target  当前scene
     * @param  {number 1|-1} direction 方向
     * @return {[type]}           [description]
     */
    function checkScroll( target, direction ){
        var target = $( target ),
            className = target.attr( 'class'),
            cycle = eventsConfig.cycle;
        if( !musicPlayed ){
            music.togglePlay();
        }
            
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

    var music = {
        'togglePlay' : function(){
            musicPlayed = true;
            if( window.HTMLAudioElement ){
                try{

                    var oAudio = document.getElementById('bgm'),
                        btn = $( '#button-bgm' );

                    var onEnded = function() {
                        setTimeout(function () {
                            oAudio.play();
                        },300);
                    };
                    oAudio.addEventListener('ended', onEnded, false);
                    // Tests the paused attribute and set state.
                    if (oAudio.paused) {
                        oAudio.play();
                        btn.removeClass('button-bgm-pause').addClass( 'button-bgm-play' );

                    }
                    else {
                        oAudio.pause();
                        btn.removeClass('button-bgm-play').addClass( 'button-bgm-pause' );
                    }


                } catch( e ) {

                }
            }
        },
        'stopPlay' : function(){
            if( window.HTMLAudioElement ){
                try{
                    var oAudio = document.getElementById('bgm'),
                        btn = $( '#button-bgm' );

                    // Tests the paused attribute and set state.
                    oAudio.pause();
                    oAudio.currentTime = 0.0;
                    btn.removeClass('button-bgm-pause button-bgm-play');
                    musicPlayed = false;
                } catch( e ) {

                }
            }
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


    /**
     * 准备final页
     * @param  {[type]} number [description]
     * @return {[type]}        [description]
     */
    /*function preRenderFinal( number ){
        // 重设主动画
        // 
        $( '#labelImg-bg' ).attr( 'src', 'imgs/blank.png' );
        $( '#labelImg-img' ).attr( 'src', 'imgs/blank.png' );
        var randomNumber = number || Math.ceil( Math.random() * 30 );

        if (Utils.queryHref('id') != null) {
            randomNumber = Utils.queryHref('id');
        }

        var randomLabel = getLabelByNum( randomNumber );
        var fakeImg1 = new Image();
        var isImg1Load = false,
            isImg2Load = false;
        fakeImg1.src = randomLabel.imgBg;
        fakeImg1.onload = function(){
            isImg1Load = true;
            $( '#labelImg-bg' ).attr( 'src', randomLabel.imgBg );
        };

        var fakeImg2 = new Image();
        fakeImg2.src = randomLabel.imgBg;
        fakeImg2.onload = function(){
            isImg2Load = true;
            $( '#labelImg-img').attr( 'src', randomLabel.imgImg );
        };
        var leastTime = 0;
        if( !!number ){
            $( '.button-replay').html( '我也要玩' );
            renderFinal( randomLabel );
        } else {
            $( '.button-replay').html( '再玩一次' );
            var checkLoaded = setInterval( function(){
                leastTime ++;
                if( isImg1Load && isImg2Load && leastTime > 16 ){
                    clearInterval( checkLoaded );
                    renderFinal( randomLabel );
                    window.movieIndex = randomNumber;
                    renderUrl( randomNumber );
                }
            }, 100 )
        }
        $.extend(randomLabel, {
            idx: randomNumber
        });

        $('body').trigger('tags:show', randomLabel);
    }*/
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
        var isTouched = false,
            touchStartPos = {
                x: 0,
                y: 0
            },
            touchEndPos = {
                x: 0,
                y: 0
            };

        item.addEventListener( 'touchstart', function( event ){
            isTouched = true;
            touchStartPos.x = event.touches['0'].clientX;
            touchStartPos.y = event.touches['0'].clientY;

            touchEndPos.x = event.touches['0'].clientX;
            touchEndPos.y = event.touches['0'].clientY;
        }, false );

        item.addEventListener( 'touchmove', function(){
            if( isTouched ){
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
    })
    
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

        // 抢光红包
        // $( '.button-hongbao-empty' ).get(0).addEventListener('touchend', function( event ){
        //     event.preventDefault();
        //     return false;
        // }, false )

        $( document ).on( 'touchend', '#button-bgm', function( event ){
            event.stopPropagation();
            music.togglePlay();
        } )

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

        /*// 打板
        $( '.action-board' ).on('touchend', function( event){
            event.stopPropagation();
            $( this ).removeClass('action-board-shaking').addClass( 'action-boarded');
            setTimeout( preRenderFinal, 500 );
        });

        // 重来d
        $( '.button-replay' ).on( 'touchend', function( event ){
            event.stopPropagation();
            // music.stopPlay();
            window.location.href = URL;
            // turnOnSlide();
        })*/
    })();

//    $('body').on('click', '.userAvater', function(event) {
//        wx.chooseImage({
//            success: function (res) {
//                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//            }
//        });
//    });

}(this));
