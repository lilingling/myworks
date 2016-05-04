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
    }
};

    var scene = $('.scene'),
        downBtn = $('.btn-down'),
        len = scene.length,
        isAnimating = false, // 动画进程
        musicPlayed = false; // 是否滑动播放音乐
    /**
     * loading
     * IIFE
     */
     var eventsConfig = {
        'preLoadImgs' : [
            'images/p1_page01.jpg',
            'images/p1_page02.jpg',
            'images/p5_page.jpg',
            'images/subway1.jpg',
            'images/room.png',
            'images/day.jpg',
            'images/night.jpg',
        //     'images/book03.png',
        //     'images/clean01.jpg',
        //     'images/clean02.jpg',
        //     'images/clean03.jpg',
        //     'images/clean04.jpg',
        //     'images/clean05.jpg',
        //     'images/clean06.jpg',
        //     'images/clean07.jpg',
        //     'images/ball01.png',
        //     'images/ball02.png',
        //     'images/ball03.png',
        //     'images/ball04.png',
        //     'images/ball05.png',
        //     'images/ball06.png',
        //     'images/ball07.png',
        //     'images/ball08.png',
        //     'images/phone.gif',
        
        ],
        // 是否循环
        // cycle 上下都循环
        // down  无限往下，往上只能到第一页
        // false 不循环
        'cycle' : 'down'
    }
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
        nextScene.removeClass('currentScene goUpScene goDownScene').addClass('currentScene actived');
        //判断页面动画开始执行
        Animation();
        dealType();
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

        console.log( idx, nextIndex )
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
                } else {
                    return;
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

    // var 
    downBtn.each( function( index, item){
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
            // alert('111')
            var sceneItem = $(item).closest('.scene').get(0);
            var moveDistance = parseInt( touchEndPos.y ) - parseInt( touchStartPos.y );
            // alert( moveDistance );
            // alert( $(item).attr('id') );
            isTouched = false;

            checkScroll( sceneItem, 1 );
            // if( moveDistance > 50 ){
            //    // alert( '向下滑' );
            //    checkScroll( sceneItem, -1 );
            // } else if( moveDistance < -50 ) {
            //     if( $(item).attr('id') == 'scene_3' ){
            //         return;
            //     }
            //    // alert( '向上滑' );
            //    checkScroll( sceneItem, 1 );
            // } else {
            //    // alert( '不翻页' );
            // }
            var _this = sceneItem;

            // $('.anim-button01').on('',function(){
            //     checkScroll( sceneItem, 1 );
            // });
            // if( parseInt( touchEndPos.x ) - parseInt( touchStartPos.x ) > 50 ){
            //     // alert( '向左滑' );
            //     checkScroll( this, -1 );
            // } else if( parseInt( touchEndPos.x ) - parseInt( touchStartPos.x ) < -50 ) {
            //     // alert( '向右滑' );
            //     checkScroll( this, 1 );
            // } else {
            //     // alert( '不翻页' );
            // }

        }, false );
    });



    /**
     * 事件绑定
     * IIFE
     */
    var eventsBind = (function(){

        // load完成执行动画
        $( 'body' ).on( 'loadComplete', function(){
            $( '.mask_loading' ).hide();
            setTimeout( function(){
                $( '.firstScene' ).addClass( 'currentScene' );
            }, 200 )
        });


    })();



}(this));
