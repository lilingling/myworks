/****************************
* 适配
/****************************/
(function() {
  var screenW = $(window).width();
  var pageW = 640;
  var scale = screenW / pageW;
  $('html').css('font-size', scale * 100 + 'px');
})();

/****************************
* loading
/****************************/
var eventsConfig = {
  'preLoadImgs': [
    'images/bg_loading.jpg',
    'images/loading_xiaopiao.png',
    'images/bonus.png',
    'images/chat_user.png',
    'images/chat_xiaopiao.png',
    'images/get_result.png',
    'images/curtain1.png',
    'images/curtain2.png',
    'images/curtain3.png',
    'images/curtain4.png',
    'images/curtain5.png',
    'images/curtain6.png',
    'images/curtain7.png',
    'images/curtain8.png'

  ]
};
var loading = (function() {
  $('.icon-porcess').html('0%');
  var loadCount = 0,
    preLoadImgs = eventsConfig.preLoadImgs,
    len = preLoadImgs.length;
  if (len < 2) {
    $('.mask_loading').css('opacity', 0).hide();
    return;
  }
  $.each(preLoadImgs, function(index, item) {
    var fakeImg = new Image();
    fakeImg.src = item;
    fakeImg.onerror = function() {
      loadSuccess();
    }

    function loadSuccess() {
      loadCount++;
      if (loadCount === len) {
        $('.mask_loading').css('opacity', 0).hide();
        $('.wrapper_chat').addClass('current');
      }
    }
    fakeImg.onload = loadSuccess;
  })
})();

/****************************
* 动画
/****************************/

var chats = [
  {'msg':'你这过了年回北京，妈又得大半年见不到你了…天冷，记得多加几件衣服','flag':0},
  {'msg':'知道啦[抠鼻]～这不能视频吗，您随叫随到。倒是您和我爸多注意点身体','flag':1},
  {'msg':'我们好着呢。','flag':0},
  {'msg':'看，你爸送我的情人节礼物','flag':0},
  {'msg':'<img class="emoji1" src="images/emoji1.jpg">','flag':0},
  {'msg':'<img class="emoji2" src="images/emoji2.gif">','flag':0},
  {'msg':'<img class="emoji3" src="images/emoji3.jpg">','flag':1},
  {'msg':'你今年情人节打算怎么过？','flag':0},
  {'msg':'我…一个人怒吞狗粮','flag':1},
  {'msg':'你说说，过年回来没钱也没女朋友，你也就还剩…有脸回来了','flag':0},
  {'msg':'咱们的母子关系也是走到了尽头了[再见]','flag':1},
  {'msg':'你还记得你爸发小儿李叔叔吗？他家女儿也单身，人也挺不错，要不要…[坏笑]','flag':0},
  {'msg':'您别为我操心了  ，还是和我爸好好过节吧 ','flag':1},
  {'msg':'<img class="emoji4" src="images/emoji4.gif">','flag':0},
  {'msg':'对了，你爸还打算约我去看电影。最近有啥好看的？','flag':0},
  {'msg':'有我偶像郭富城的《三打白骨精》，还有《美人鱼》《澳门风云》什么的','flag':1},
  {'msg':'你爱看爱情片儿，要不看看章子怡的《奔爱》？','flag':1},
  {'msg':'听着不错，帮我俩买个电影票吧','flag':0},
];
var num = 0;
function chating(){
  var t = setTimeout(function(){
    $('.input').css('height','auto');
    $('.button_send').addClass('active');
    var chart = chats[num];
    var flag = chart.flag;
    var msg = chart.msg;
    if(flag==0){
      show(flag,msg);
      num ++;
      chating();

    }
    if(flag==1){
      print(msg);
      num ++;
    }

  },800);
}
chating();
function render_mom(msg){
    var mom = '<div class="chat_mother">'
              + '<img class="portrait" src="images/portrait-mother.png" />'
              + '<div class="chat_box">'+msg+'</div>'
              + '</div>';
    //$('.wrapper_chat').append(mom);
    return mom;
}
function render_son(msg){
    var son = '<div class="chat_son">'
              + '<div class="chat_box">'+msg+'</div>'
              + '<img class="portrait" src="images/portrait-son.png" />'
                + '</div>'
              + '<div class="clear"></div>';
    //$('.wrapper_chat').append(mom);
    return son;
}

var keyboardH;
function print(msg){
  $('.input').html(msg+'<span class="cursor"></span>');
  // if(msg.indexOf('img')){
  //   console.log('有图片');
  //   $('.input').html('');
  // }
  keyboardH = $('.box_keyboard').height();
  return keyboardH;

}
function show(flag,msg){
  //表情显示
  var s1 = msg.indexOf('[');
  var s2 = msg.indexOf(']');
  var str = msg.substring(s1+1,s2);
  console.log('str',str);
  switch(str){
    case '抠鼻':
      msg = msg.substring(0,s1) + '<i class="emoji5"></i>' + msg.substring(s2+1,msg.length-1);
      break;
    case '再见':
      msg = msg.substring(0,s1) + '<i class="emoji6"></i>' + msg.substring(s2+1,msg.length-1);
      break;
    case '坏笑':
      msg = msg.substring(0,s1) + '<i class="emoji7"></i>' + msg.substring(s2+1,msg.length-1);
      break;
  };
  var template = "";
  if(flag){
    template = render_son(msg);
  }else{
    template = render_mom(msg);
  }


  $('.wrapper_chat').append(template);
  // 发送图片
  if(msg.indexOf('img')){
    debugger
    console.log('有图片');
    $('.chat_mother').eq(num).find('.chat_box').css('background','red');
  }
  moveup();
}


$('#send').click(function(){
  var son_text = $('.input').text();
  show(1,son_text);
  $('.input').text('');
  chating()
});

var tops = 0;
function moveup(){
  var screenH = $(window).height();
  var dh = screenH - keyboardH;
  var h = $('.wrapper_chat').height();
  console.log(screenH+'  '+keyboardH+'  '+dh);
  console.log('wrap-height'+h);
  if(h >= dh){
    // tops = tops -20;
    console.log('top'+tops);
    $('.wrapper_chat').css('bottom',(keyboardH)+'px');
  }
}


//统计
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-58583546-8', 'auto');
ga('send', 'pageview');

//按钮点击统计
// $('#button').on('click',function(){
//   ga('send', 'event', 'button', 'click', 'download-button');
// });
