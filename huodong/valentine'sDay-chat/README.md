### 年终2C总结
1. **background-size:**  
语法：  
cover: 缩放背景图片以完全覆盖背景区，可能背景图片部分看不见。  
contain: 缩放背景图片以完全装入背景区，可能背景区部分空白
2. 两个值的属性 是水平 垂直/ 垂直 水平  
background-position 水平 垂直
margin 垂直 水平
box-shadow 水平 垂直
3. 逐帧动画  
  * 雪碧图不要有缝隙
  * steps(n) background-position:整个图高度的位置
4. 设计图的尺寸  
宽：640
高：1009  
微信端会减去64的标题条高度
5. fixed定位缩放相对于屏幕，而不是相对于父元素
6. 有边框的图切图时尽量切大一点，让边框完全显示
7. animation-direction:动画播放顺序
  * normal:动画顺序播放，结束状态从0开始播放
  * alternate 交替反向运行，时间功能函数也反向
  * reverse 反向运行
  * alternate-reverse 反向交替
8. transform:多个合写
  `transform:scale(.5,.5) translateX(-50%);`
9. 用绝对定位让元素居中的-webkit-transform:translateX(-50%)定位，再写动画transform:scale()
等等会覆盖translateX(-50%),合写会导致transform-origin不正确显示。可以用margin-left:偏移
一半的宽度居中。
10. 用transform上移，每次上移的高度，是依据于最初的参照，而不是依据一个关键帧。
11. 页面的尺寸  
  document.body.clientHeight (可见区域高度 即屏幕高度)  
  document.body.offsetheight(可见区域高度 包括边线高度)  
  document.getElementById(“div”).offsetHeight 元素实际高度  
12. 父级元素设置opacity:0 子元素设置opacity:1子元素依旧不显示
---
1. jq each  迭代  
$.each() 在迭代数组的情况下，回调函数每次传递一个数组索引和相应的数组值作为参数
2. 预加载图片  
```
function preLoadImg(url) {
  var img = new Image();
  img.src = url;
}
```
通过调用preLoadImg函数，传入图片的url，就能使图片预先下载下来了。
3. 取background-position水平值 css('background-position-x')  
  取到的值是字符串，需parseInt()转化为数字
4. attr()访问dom 是最费时的
5. trigger()事件自触发特定事件
```
$().trigger('click');
```
但无法触发音乐的播放事件
6. audio play()方法是原生的js
```
var message = $('#music_message')[0];
message.play();
```
---
待解决
1. 页面标题
2. 分享内容
position:absolute;浮动元素，脱离文档流，但还是可以用margin
