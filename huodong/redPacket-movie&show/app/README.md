### 超级红包第二十期电影+演出红包连连看

1. 分析psd设计图，布局，找出公有的类
        .mb-30{
          margin-bottom:30px;
        }
2. 函数传参 $(id)`$('#'+id)`
3. 移动端H5页面适配的两种方法

  1. 改html的font-size大小 以rem为单位
          $(window).on('resize', function () {
             var width = document.documentElement.clientWidth;
                 $('html').css('font-size', (width / 640 * 100) + 'px');
           }).triggerHandler('resize');
   2. 用css3的scale()整体缩小
           (function(id){
             var screenW = $(window).width();
             var screenH = $(window).height();
             var pageW = 640;
             var pageH = 2600;
             var scale = screenW/640;
             $('#'+id).css('-webkit-transform','scale3d('+scale+','+scale+',1)');
             $('#'+id).css('-webkit-transform-origin','0 0');
             $('body').css('height',screenH);
           }('wrapper'));
2015-11-24 end
---
1. vertical-align:top/middle/bottom 什么时候起作用？
  指定了**行内（inline）元素**或**表格单元格（table-cell）元素**的垂直对齐方式，多数值是**相对于父元素**
  与同辈元素也有关系。
2. ul ol list-style-type 不含在宽度里，需要在设置margin
3. 设置float:left元素变为block元素
4. 行内元素 margin padding
**margin、padding的左右起作用，上下不起作用**若改变高度，可用line-height，fong-size，vertical-align
>延伸
#### 外边距合并
inline-block margin 和 padding

5. ：after清除浮动
        content: "";
        display: block;

        clear: both;
6. 数据对象
**数据对象格式不是json文件，引入json文件，需要require()(在node下)或ajax请求，格式以{}开头**
可以直接建保存数据对象的js文件，
        var show_list = {
          "1":{
            "name":"开心麻花经典爆笑舞台剧《乌龙山伯爵》第三十五轮",
            "pic":"1",
            "time":"2015.11.24-12.13",
            "desc":"开心麻花戏剧结构最精致的舞台剧，巡演数十轮，热度依旧不减。",
            "price":"180元起",
            "link":"wxmovie://showdetail?onlineid=2b5c47b22c674d70aaa8092995144424"
          }
        }
遍历对象：
        //方式一
        for(var item in show_list){
          var show_item = '<ul class="show_item">'
                          +'img.pic(src="images/pic-'+show_list[item].pic+'.png")'
        //方式二
        $.each(show_list,function(key,value) {
          console.log(key);
          console.log(value);
2015-11-25 end
---
1. 变量名不能以中连线命名，可以以下划线
2. posiiton:fixed 是根据浏览器的 即body 但若父元素是wrapper,则会根据wrapper来定位的 --mask总出现的问题
3. box-shadow:水平 垂直
4. 用到transform时，一定要设置transform-origin 这个属性的不同，影响的效果是不同的。
5. animation书写顺序 name run-time function delay-time
---
*轮播图效果*
1. 插件 swiper
```
  //dom
  .swiper-container
    .swiper-wrapper
      .swiper-slide(style="background-image:url(./images/movie-1.jpg)")
      .swiper-slide(style="background-image:url(./images/movie-2.png)")
      .swiper-slide(style="background-image:url(./images/movie-3.png)")
      .swiper-slide(style="background-image:url(./images/movie-4.png)")
      .swiper-slide(style="background-image:url(./images/movie-5.png)")
    .swiper-pagination
    //调用
    var swiper = new Swiper('.swiper-container', {
        //pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3,
        loop:true,
        coverflow: {
            rotate: 0,
            stretch: 50,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    });
    //样式
    引用swiper.min.css
```
