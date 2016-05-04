/****************************
* 适配
/****************************/
(function(id){
  var screenW = $(window).width();
  var screenH = $(window).height();
  var pageW = 640;
  var scale = screenW/640;
  $('#'+id).css('-webkit-transform','scale3d('+scale+','+scale+',1)');
  $('#'+id).css('-webkit-transform-origin','0 0');
  $('body').css('height',screenH);

}('wrapper'));


/****************************
* append演出列表
/****************************/
(function(){
  for(var item in show_list){
    var show_item = '<ul class="show_item bb-25063A">'
                    +'<img class="pic" src="images/pic-'+show_list[item].pic+'.png"/>'
                    +'<div class="info">'
                    +'<h2 class="show_name">'+show_list[item].name+'</h2>'
                    +'<span class="show_time mt-15">'+show_list[item].time+'</span>'
                    +'<span class="show_desc mt-15">'+show_list[item].desc+'</span>'
                    +'<span class="show_price">'+show_list[item].price+'</span>'
                    +'<a class="butn" href="'+show_list[item].link+'">购票</a>'
                    +'</div>'
                    '</ul>';
    $('#show-list-wrapper').append(show_item);
  }
})();
var $show_item = $('.show_item');
$show_item.eq(0).siblings().hide();
$show_item.eq(1).show();
$('#tab li').on('click',function(){
  var index = $(this).index(); //索引
  $('#show-list-wrapper').show();
  // $('.showList-mask').show();
  $show_item.hide();
  $show_item.eq(2*index).show();
  $show_item.eq(2*index+1).show();
  $('.tab li').find('span').addClass('hide');
  $(this).find('span').removeClass('hide');
  // $('#tab li').removeClass('animation');
});

/****************************
* 热门影片跳到相应的影片详情
/****************************/
$('.swiper-wrapper').delegate('#s1','click',function(){
  window.location.href="wxmovie://filmdetail?movieid=5753";
})
$('.swiper-wrapper').delegate('#s2','click',function(){
  window.location.href="wxmovie://filmdetail?movieid=5742";
})
$('.swiper-wrapper').delegate('#s3','click',function(){
  window.location.href="wxmovie://filmdetail?movieid=5963";
})
$('.swiper-wrapper').delegate('#s4','click',function(){
  window.location.href="wxmovie://filmdetail?movieid=5830";
})
$('.swiper-wrapper').delegate('#s5','click',function(){
  window.location.href="wxmovie://filmdetail?movieid=5932";
})
/****************************
 *
 * 轮播图
 *
 ****************************/

 var swiper = new Swiper('.swiper-container', {
     //pagination: '.swiper-pagination',
     effect: 'coverflow',
     grabCursor: true,
     centeredSlides: true,
     slidesPerView: 2,
     loop:true,
     coverflow: {
         rotate: 0,
         stretch: 50,
         depth: 100,
         modifier: 1,
         slideShadows : true
     }
 });
/****************************
* 点击关闭按钮关闭弹层
/****************************/
var $movieList_butn = $('.movie-list-butn'),
    $movieList_mask = $('.movieList-mask'),
    $showList_wrapper = $('#show-list-wrapper'),
    $close1 = $('#closeButn1'),
    $close2 = $('#closeButn2');

$movieList_butn.on('click',function(){
  $movieList_mask.show();
});
$close2.on('click',function(){
  $movieList_mask.hide();
});
$close1.on('click',function(){
  $showList_wrapper.hide();
  $('.showList-mask').hide();
  $('#tab li').removeClass('topIndex');
  $('#tab li').addClass('animation');
});


//统计
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-58583546-8', 'auto');
ga('send', 'pageview');
