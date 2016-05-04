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
      'images/bg-1.png',
      'images/bg-2.png',
      'images/bg.png',
      'images/title.png',
      'images/xiaopiao.png',
      'images/pic-1.png',
      'images/pic-2.png',
      'images/pic-3.png',
      'images/pic-4.png',
      'images/pic-5.png',
      'images/superman.png',
      'images/word.png'
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

$('.swiper-button-next').tap(function(){
  if($(this).hasClass('swiper-button-disabled')){
    $('.swiper-container').css('opacity','0');
    debugger
    $('.mask').hide();
  }
});



//统计
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-58583546-8', 'auto');
ga('send', 'pageview');
