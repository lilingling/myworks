/****************************
* 适配
/****************************/
(function(id){
  var screenW = $(window).width();
  var screenH = $(window).height();
  var pageW = 750;
  var scale = screenW/pageW;
  $('#'+id).css('-webkit-transform','scale3d('+scale+','+scale+',1)');
  $('#'+id).css('-webkit-transform-origin','0 0');
  $('body').css('height',screenH);
}('wrapper'));
/****************************
* loading
/****************************/
var eventsConfig = {
  'preLoadImgs' : [
      'images/bg_loading.jpg',
      'images/loading_xiaopiao.png',
      'images/bg.png',
      'images/title.png',
      'images/word.png',
      'images/pic-1.png',
      'images/pic-2.png',
      'images/pic-3.png',
      'images/pic-4.png',
      'images/pic-5.png',
      'images/pic-6.png',
      'images/pic-7.png',
      'images/pic-8.png',
      'images/superman.png',
      'images/xiaopiao.png'
  ]
};
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
    loadCount ++;
    if( loadCount === len ){
        $( '.mask_loading' ).css('opacity', 0 ).hide();
        $('.getBonus').addClass('current');
    }
  }
  fakeImg.onload = loadSuccess;
})
})();

/****************************
* doAnimation
/****************************/
(function(){
  $('.swiper-button-next').on('click',function(){
    if($(this).hasClass('swiper-button-disabled')){
      $('.swiper-container').hide(1000);
      $('.blackboard').css('-webkit-transition','-webkit-transform 1s cubic-bezier(0.17, 0.5, 0.58, 1) 0s');
        $('.mask').hide();
      $('.blackboard,.butn_Renzui').addClass('active');
    }
  });
  $('#butnCheck').on('click',function(){
    $('.wrapper').addClass('start');
    // Soundmessage.playSound('camera');
    $('.swiper-container').css('pointer-events','visible');
    $('.butn_check').hide();
    // var t = setTimeout(function(){
    //   Soundmessage.stopSound('camera');
    // },2500)
  })
  $('.butn_Renzui').on('click',function(){
    $('.wrap-xiaopiao').css('visibility','hidden');
    $('.wrap-superman').show().addClass('startSuper');
    // Soundmessage.playSound('lightning');
  });
  /****************************
  * 音频
  /****************************/
  // var Soundmessage = {
  //   playSound:function(param){
  //     $('#'+param).get(0).play();
  //   },
  //   stopSound:function(param){
  //     $('#'+param).get(0).pause();
  //   }
  // }

})();

// 音乐
var audioCtrl = $('#audio')[0];
document.addEventListener("WeixinJSBridgeReady", function () {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            audioCtrl.play();
        });
}, false);
var isOn = true;
$('.music_icon').click(function(){
  if(isOn){
    audioCtrl.pause();
    isOn = false;
    $(this).addClass('play');
  }
  else{
    audioCtrl.play();
    isOn = true;
    $(this).removeClass('play');
  }
});


//统计
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-58583546-8', 'auto');
ga('send', 'pageview');
// //按钮点击统计
// $('#button').on('click',function(){
//   ga('send', 'event', 'button', 'click', 'download-button');
// });
