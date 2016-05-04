$(function(){

    var startStayingTime = new Date().getTime();
    // hash变化时发送统计数据到ga

    $('#fullpage').fullpage({
        loopHorizontal: false,
        scrollOverflow: true,
        scrollingSpeed: 500,
        lockAnchors: true,
        anchors: ['view'],
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
            console.log(anchorLink, index, slideAnchor, slideIndex);
        (function() {
          alert(slideAnchor)
            var nowTime = new Date().getTime();
            var stayTime = nowTime - startStayingTime;
            // 重置现在时间
            startStayingTime = nowTime;
            // 发送每个页面访问次数
            ga('send', 'pageview', {
              page: '观影秘籍寻龙诀' + slideAnchor,
              title: '观影秘籍寻龙诀' + slideAnchor
            });
            console.log(slideAnchor)
            // 发送停留时间
            ga('send', 'timing', '观影秘籍寻龙诀page' + slideIndex, 'Staying Time', stayTime);
        }());

            // 调整左上角
            (function(){

                if (slideIndex === 0) {
                    $('#head-icon').hide();
                }
                if (slideIndex === 1) {
                    $('#head-icon').show();
                }
                var pageIndex = (slideIndex < 10) ? ('0' + slideIndex) : slideIndex;
                $('#num').html(pageIndex);
            }());

            if (slideIndex === 8) {
                // 最后一页视频播放
                $('#videoarea').click(function(){
                    $('#mask').show();
                    $('#mask_bg').css('opacity', '0.9');
                    $('#mask_container').html('<iframe style="position:absolute;top:50%;transform:translate3d(0, -50%, 0)" frameborder="0" width="100%" height="40%" src="http://v.qq.com/iframe/player.html?vid=h0175vj6vpz&tiny=0&auto=0" allowfullscreen></iframe>');
                    $('#mask_container').click(function(){
                        $('#mask_container').html('');
                        $('#mask_bg').removeAttr('style');
                        $('#mask').hide();
                    });
                });

                // 弹窗
                var startX = 0;
                var endX = 0;
                $('#s9')[0].addEventListener('touchstart', function(e){
                    console.log(e.changedTouches[0].clientX);
                    startX = e.changedTouches[0].clientX;
                });
                $('#s9')[0].addEventListener('touchend', function(e){
                    console.log(e.changedTouches[0].clientX);
                    endX = e.changedTouches[0].clientX;
                    if (startX - endX > 100) {
                        // 最后一页如果向右滑动出现弹窗

                        // 发送停留时间
                        var nowTime = new Date().getTime();
                        var stayTime = nowTime - startStayingTime;
                        ga('send', 'timing', '观影秘籍寻龙诀page8', 'Staying Time', stayTime);
                        // 阻止滑动
                        $('body')[0].addEventListener('touchmove', function(e){
                            e.preventDefault();
                        });
                        $('#mask').show();
                        $('#mask_bg').css('opacity', '0.9');
                        $('#mask_info').show();
                        $('#ticket').show();

                        // 点击弹层返回
                        $('#mask_container').click(function(){
                            // $('#mask_container').html('');
                            $('#mask_bg').removeAttr('style');
                            $('#mask').hide();
                            $('#mask_info').hide();
                            $('.share1').hide();
                        });
                        // 点击分享到朋友圈提示
                        $('#share').on('click',function(){
                          $('.share1').show();
                          ga('send', 'event', 'attitudeBtn', 'click', 'share', 1);
                        })
                        //点击购票
                        $('#ticket').on('click',function(e){
                          e.preventDefault();
                          window.location.href = 'http://wx.wepiao.com/cinema_list.html?showwxpaytitle=1&channel=wxmovie&movie_id=5742';
                          ga('send', 'event', 'attitudeBtn', 'click', 'buy-ticket', 1);
                        })

                        // $('#h-1').click(function(){
                        // // 点击喜爱按钮
                        //     ga('send', 'event', 'attitudeBtn', 'click', 'like', 1);
                        //     $('#helpful-2').show();
                        //     $('#h-2').unbind('click');
                        //     $('.share1').show();
                        // });
                        // $('#h-2').click(function(){
                        // // 点击没卵用按钮
                        //     ga('send', 'event', 'attitudeBtn', 'click', 'dislike', 1);
                        //     $('#nohelpful-2').show();
                        //     $('#h-1').unbind('click');
                        // });
                    }
                });
            }
        }
    });

    (function (window){
        // Utils
        Utils = {
            'queryHref' : function(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
                var r = window.location.search.substr(1).match(reg);
                if (r!==null) {
                    return unescape(r[2]);
                } else {
                    return null;
                }
            },
            '_getQueryString' : function (name) {
                var param = decodeURIComponent(window.location.search);
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = param.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
            }
        };

        var eventsConfig = {
            'preLoadImgs' : [
                'images/1.jpg',
                'images/2.jpg',
                'images/3.jpg',
                'images/4.jpg'
            ],
            // 是否循环
            // cycle 上下都循环
            // down  无限往下，往上只能到第一页
            // false 不循环
            'cycle' : 'down'
        };

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
            '_getQueryString' : function (name) {
                var param = decodeURIComponent(window.location.search);
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = param.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
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
                $( '.mask_loading' ).css('opacity', 0 ).hide();
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
                        $( '.mask_loading' ).css('opacity', 0 ).hide();
                    }
                }
                fakeImg.onload = loadSuccess;
            })
        })();

        /** 增加from值 **/
        var FROM = Utils._getQueryString('from') || '';
        if ($('.link').attr('href').indexOf('?') > -1) {
            var fromStr = $('.link').attr('href') + '&from=' + FROM;
        } else {
            var fromStr = $('.link').attr('href') + '?from=' + FROM;
        }
        $('.link').attr('href', fromStr);


    }(this));

    setTimeout(function(){
        $( '.mask_loading' ).css('opacity', 0 ).hide();
    }, 4000);

});
