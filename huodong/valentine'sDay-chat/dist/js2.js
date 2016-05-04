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
  {'msg':'听着不错，帮我俩买个电影票吧','flag':0}
];

var n = 0;

function chating(){
  // 显示对话
  var t = setTimeout(function(){
  var chat = chats[n];
  var msg = chat.msg;
  var flag = chat.flag;
  if(flag == 1){
    // 儿子
    print(msg);
  }
  else{
    // 母亲
    show(flag,msg);
  }
},1000);
}

chating();

function show(flag,msg){
  var s1 = msg.indexOf('[');
  var s2 = msg.indexOf(']');
  var str = msg.substring(s1+1,s2);
  switch(str){
    case '抠鼻':
    msg = msg.substring(0,s1)+'<i class="emoji5"></i>' + msg.substring(s2+1);
    break;
    case '再见':
    msg = msg.substring(0,s1)+'<i class="emoji6"></i>' + msg.substring(s2+1);
    break;
    case '坏笑':
    msg = msg.substring(0,s1)+'<i class="emoji7"></i>' + msg.substring(s2+1);
    break;
  };
  var template = "";
  if(flag == 1){
    template = render_son(msg);
  }
  else{
    template = render_mom(msg);
  }
  $('.wrapper_chat').append(template);
  n++;
  chating();
}
function print(msg){
  // 打印对话
  $('.input').text(msg);

};
$('#send').on('click',function(){
  // 点击发送
  var son_text = $('.input').text();
  $('.input').text('');
  show(1,son_text);
});

function render_mom(msg){
  var mom = '<div class="chat_mother">'
            + '<img class="portrait" src="images/portrait-mother.png" />'
            + '<div class="chat_box">'+msg+'</div>'
            + '</div>';
  return mom;
};
function render_son(msg){
  var son = '<div class="chat_son">'
            + '<div class="chat_box">'+msg+'</div>'
            + '<img class="portrait" src="images/portrait-son.png" />'
              + '</div>'
            + '<div class="clear"></div>';
  return son;
};
