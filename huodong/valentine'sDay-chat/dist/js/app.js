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
    'images/chat_user.png',
    'images/emoji1.jpg',
    'images/emoji2.gif',
    'images/emoji3.jpg',
    'images/emoji4.gif',
    'images/emoji.png',
    'images/portrait-mother.png',
    'images/portrait-son.png',
    'images/symbol.png'
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
  {'msg':'有没有什么爱情片，秀恩爱的那种？','flag':0},
  {'msg':'要不看看章子怡的《奔爱》？','flag':1},
  {'msg':'听着不错，帮我俩买个电影票吧','flag':0},
];
var num = 0;
function chating(){
  $('.input').addClass('minHeight');
  var t = setTimeout(function(){
    $('.button_send').addClass('active');
    var len = chats.length;
    if(num == len){
      $('.butn_box').addClass('active');
      $('#send').unbind('click');
      return;
    }
    var chart = chats[num];
    var flag = chart.flag;
    var msg = chart.msg;
    if(flag==0){
      show(flag,msg);
      num ++;
      chating();

    }
    if(flag==1){
      if(num==6){
        $('.keyboard').css('background-position','left bottom');
        $('.button_send').hide();
        $('.emoji').addClass('active');
        $('.emoji').click(function(){
          show(flag,msg);
          num ++;
          chating();
          $('.keyboard').css('background-position','0 0');
          $('.button_send').show();
          $('.keyboard .emojitemp').hide();
        });
        return;
        show(flag,msg);
        num ++;
        chating();
        return;
      }
      $('.input').removeClass('minHeight');
      print(msg);
      num ++;
    }

  },1000);
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

  $('.input').html(msg);
  if(msg.indexOf('img') != -1){
    $('.input').find('img').hide();
    $('.keyboard').css('background-position','left bottom');
    $('.button_send').hide();
    $('.emoji').addClass('active');
  }
  keyboardH = $('.box_keyboard').height();
}
var wrapperH1;
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
      msg = msg.substring(0,s1) + '<i class="emoji6"></i>' ;
      console.log(msg.length);
      break;
    case '坏笑':
      msg = msg.substring(0,s1) + '<i class="emoji7"></i>' ;
      break;
  };

  var template = "";
  if(flag){
    template = render_son(msg);
  }else{
    template = render_mom(msg);
  }
  wrapperH1 = $('.wrapper_chat').height();
  $('.wrapper_chat').append(template);
  $('.wrapper_chat').find('.emoji3').show();
  // alert($('.wrapper_chat').find('.emoji3').length);
  // alert($('.wrapper_chat').find('.emoji3').css("display"));

  // 发送图片
  if(flag == 0){
    if(msg.indexOf('img')!=-1){
      $('.chat_mother:last').find('.chat_box').addClass('chat_img');
    }
  }
  if(flag == 1){
    if(msg.indexOf('img')!=-1){
      $('.chat_son:last').find('.chat_box').addClass('chat_img');
    }
  }

  moveup();
}


$('#send').click(function(){
  var son_text = $('.input').text();
  if(son_text == ''||son_text == null){
    return;
  }
  show(1,son_text);
  $('.input').text('');

  chating();
});
var moveH = 0;
function moveup(){
  var screenH = $(window).height();
  var dh = screenH - keyboardH;
  var wrapperH2 = $('.wrapper_chat').height();
  console.log(wrapperH2+"====="+wrapperH1);
  var des = wrapperH2 - wrapperH1;
  moveH += des;
  console.log(moveH);
  if(wrapperH2 >= dh){
    //$('.wrapper_chat').animate({'bottom',keyboardH+'px'});
    $('.wrapper_chat').animate({'top':""-(moveH-150)+"px"});
  }
};
$('.butn_a,.butn_b').on('click',function(){
  window.location.href = 'wxmovie://movielist?type=1';
});

/****************************
* 分享到微信判断
/****************************/
function isWeiXin(){
  var ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return true;
  }else{
      return false;
  }
}
if(isWeiXin()){
  $('.butn_a,.butn_b').on('click',function(){
    window.location.href = 'http://promotion.wepiao.com/down/mobilelist/download.html?fromId=3309040001';
  });
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
$('.butn_a').on('click',function(){
  ga('send', 'event', 'button', 'click', 'selectA');
});
$('.butn_b').on('click',function(){
  ga('send', 'event', 'button', 'click', 'selectB');
});
