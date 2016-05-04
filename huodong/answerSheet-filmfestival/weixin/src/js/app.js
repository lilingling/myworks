
  $(document).ready(function(){
    // 页面适配
    $(window).resize(function(){
      var deviceW = $(document).width();
      var pageW = 640;
      var scale = deviceW/pageW;
      $('html').css('font-size',scale*100 +'px');
    }).trigger('resize');

    // loading
    var eventsConfig = {
      'preLoadImgs': [
        'images/loadingBg.png',
        'images/board.png',
        'images/icons.png',
        'images/spites.png',
        'images/button.png',
        'images/text.png',
        'images/xiaopiao-result.png',
        'images/film1.png',
        'images/film2.png',
        'images/film.png'
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
            $('.loading').hide();
          }
        }
        fakeImg.onload = loadSuccess;
      })
    })();


    $('#mark_rule').click(function(){
      $('.rule-box').addClass('active');
        $('.rule-box').css('pointer-events','visible');
    });

    $('#butn_close').click(function(){
      $('.rule-box').removeClass('active');
      $('.rule-box').css('pointer-events','none');
    });

    //开始答题
    $('#start').click(function(){
      window.location.href="#answer-sheet";
    });

    var questions = [
      {"title":'梦露的这个经典画面，源自哪部电影?',
       "options":['热情如火','七年之痒','游龙戏凤','愿嫁金龟婿'],
       "type":'好莱坞',
       "correct":'B'
      },
      {"title":'电影《星球大战》中的达斯·维达的原名是？',
       "options":['韩·索罗','欧比-旺·肯诺比','阿纳金','卢克·天行者'],
       "type":'科幻',
       "correct":'C'
      },
      {"title":'电影《喜剧之王》中，张柏芝扮演的角色名字是？',
       "options":['柳飘飘','周星星','白晶晶','鱼珊珊'],
       "type":'港片',
       "correct":'A'
      },
      {"title":'电影《这个杀手不太冷》中，里昂最喜欢喝的东西是？',
       "options":['咖啡','红茶','牛奶','酒'],
       "type":'爱情',
       "correct":'C'
      },
      {"title":'以下哪个人没有参演《教父》（第一部）？',
       "options":['马龙·白兰度','詹姆斯·凯恩','阿尔·帕西诺','罗伯特·德尼罗'],
       "type":'好莱坞',
       "correct":'D'
      },
      {"title":'电影《搏击俱乐部》中，爱德华·诺顿最开始的职业是？',
       "options":['汽车公司职员','卖肥皂的商人','房地产商人','银行职员'],
       "type":'好莱坞',
       "correct":'A'
      },
      {"title":'《异形2》的导演是？',
       "options":['詹姆斯·卡梅隆','雷德利·斯科特','让-皮埃尔·热内','大卫·芬奇'],
       "type":'科幻',
       "correct":'A'
      },
      {"title":'电影《PTU》中，很重要的冲突发生在一间餐厅，这间餐厅在很多港片中也曾反复出现，是哪家？',
       "options":['九龙冰室','中国冰室','金鼎轩','祥兴茶餐厅'],
       "type":'港片',
       "correct":'B'
      },
      {"title":'谢耳朵的这个手势是致敬哪部电影的经典动作？',
       "options":['《星际穿越》','《星际迷航》','《星球大战》','《星际传奇》'],
       "type":'科幻',
       "correct":'B'
      },
      {"title":'电影《志明与春娇》中，春娇在哪家化妆品店工作？',
       "options":['Sasa','丝芙兰','屈臣氏','万宁'],
       "type":'港片',
       "correct":'B'
      },
      {"title":'今年是电影《党同伐异》上映多少周年？',
       "options":['90年','100年','110年','120年'],
       "type":'好莱坞',
       "correct":'B'
      },
      {"title":'电影《黑客帝国》中，尼奥吞下的小药丸是什么颜色？',
       "options":['红&黑','黑&白','黄&蓝','红&蓝'],
       "type":'科幻',
       "correct":'D'
      },
      {"title":'以下哪个中国演员参演了《末代皇帝》？',
       "options":['章子怡','张曼玉','巩俐','陈冲'],
       "type":'好莱坞',
       "correct":'D'
      },
      {"title":'电影《重庆森林》中，梁朝伟的警察编号是？',
       "options":['223','633','233','663'],
       "type":'港片',
       "correct":'D'
      },
      {"title":'《2001太空漫游》的原著作者是？',
       "options":['阿瑟·C.克拉克','艾萨克·阿西莫夫','罗伯特·安森·海因莱因','儒勒·凡尔纳'],
       "type":'科幻',
       "correct":'A'
      },
      {"title":'电影《暗战》中，刘德华最后从刘青云手中智取了一笔现金，捐给了儿童癌症基金会。这笔钱是多少？',
       "options":['2000万','5000万','300万','1500万'],
       "type":'港片',
       "correct":'A'
      },
      {"title":'以下哪部电影中，男女主角最终走在一起了？',
       "options":['《恋恋笔记本》','《和莎莫的500天》','《泰坦尼克号》','《罗密欧与朱丽叶》'],
       "type":'爱情',
       "correct":'A'
      },
      {"title":'电影《罗马假日》中，赫本最后用什么武器打跑了坏人？',
       "options":['吉他','木棍','酒瓶','相机'],
       "type":'爱情',
       "correct":'A'
     },
      {"title":'原节A子在哪部电影中没扮演”出嫁的女儿“角色？',
      "options":['《东京物语》','《秋刀鱼之味》','《晚春》','《麦秋》'],
      "type":'爱情',
      "correct":'B'
      },
      {"title":'电影《瓦力》中，WALL·E送给Eve的定情信物是？ ',
       "options":['植物','磁带','灯泡','DVD'],
       "type":'爱情',
       "correct":'C'
      }
    ];
    var num =1;
    var h = 0;
    var correctAnswer ='';
    var correctCount =0;
    var answer ='';
    var type ='';
    var movieAcorret= 0;
    var movieBcorret = 0;
    var movieCcorret = 0;
    var movieDcorret = 0;
    function analyse(){
      correctAnswer = questions[num-1].correct;
      type = questions[num-1].type;
      if(answer == correctAnswer){
        switch(type){
          case '好莱坞':movieAcorret ++;
          break;
          case '科幻':movieBcorret ++;
          break;
          case '港片':movieCcorret ++;
          break;
          case '爱情':movieDcorret ++;
          break;
        };
      }
    };
    function showResult(){
      correctCount = movieAcorret + movieBcorret +movieCcorret +movieDcorret ;
      var arry = [{"type":'好莱坞经典电影',"val":movieAcorret},{"type":'科幻片',"val":movieBcorret},{"type":'港片',"val":movieCcorret},{"type":'爱情片',"val":movieDcorret}];
      arry.sort(function(a,b){
        return a.val<b.val;
      });
      console.log(arry);
      if(correctCount >= 12){
        window.location.href="#result2";
        $('#movieType').text(arry[0].type+'、'+arry[1].type);
      }
      else{
        window.location.href="#result1";
        $('#correctCount').text(correctCount);
      }
    };
    $('.question').on('click','.19th li',function(){
      answer = $(this).find('span').data('answer');
      analyse();
    });
    function render(){
      if(num==19){
        var _19str = ' 19th';
      }
      else{
        var _19str = '';
      }
      var question = questions[num];
      var questionNum = 'QUESTION-';
      if(num < 9){
        questionNum = 'QUESTION-0';
      }
      else{
        questionNum = 'QUESTION-';
      }
      var question_box = '<div class="question-box question-box'+(num+1)+'">'
                     +'<h1 class="question-num">'+questionNum+(num+1)+'</h1>'
                     +'<div class="question-title">'+question.title+'</div>'
                     +'<ul class="options'+_19str+'">'
                     +'<li><span data-answer ="A">A. </span>'+question.options[0]+'</li>'
                     +'<li><span data-answer ="B">B. </span>'+question.options[1]+'</li>'
                     +'<li><span data-answer ="C">C. </span>'+question.options[2]+'</li>'
                     +'<li><span data-answer ="D">D. </span>'+question.options[3]+'</li>'
                     +'</ul>'
                     +'<img src="images/pic0'+(num+1)+'.jpg" alt="" class="pic">'
                     +'</div>';
      h -= $(window).height();
      $('.question-box:first').animate({marginTop: h},500);
      if(!$('.question').hasClass('restart')){
        $('.question').append(question_box);
      }
    };
    $('.question').on('click','.options li',function(){
      $(this).addClass('selected');
      if(num >= 20){
        showResult();
        return;
      }else{
        render();
        answer = $(this).find('span').data('answer');
        analyse();
        num++;
      }

    });
    //重新答题
    $('#restart').on('click',function(){
      $('.question-box:first').css('marginTop', 0);
      window.location.href="#answer-sheet";
      h=0;
      num=1;
      movieAcorret =0;
      movieBcorret =0;
      movieCcorret =0;
      movieDcorret =0;
      $('.question').addClass('restart');
      $('.options li').removeClass('selected');
    });

    //领取红包并抽奖
  $('#getpacket').on('click', function() {
    $('#packet-box').show();
  });

  var phone ='';
  function checkPhone(phone_num) {
    phone = $('#'+phone_num).val();
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
      $('#'+phone_num).next().css('visibility', 'visible');
      $('#'+phone_num).focus();
      console.log(phone);
      return false;
    }
    else {
      $('.error').css('visibility', 'hidden');
      return true;
    }
  };
  $('#getBonus').on('click', function(){
    // 存储手机号
    if(checkPhone('phone_num1')){
      var timestamp=new Date().getTime();
      var openid = timestamp + Math.random();
      $.ajax({
        method:'POST',
        url:'http://api.biz.wepiao.com/common/saveactivityuserinfo',
        dataType:'jsonp',
        data:{
          "openid":openid,
          "activeid":'20160317001',
          "content":phone,
          "newDecrypt":2
        },
        success:function(){
          console.log('成功');
          console.log(phone);
        },
        error:function(){
          console.log('失败');
        }
      });
    }
      window.location.href = 'http://b.wepiao.com/hongbao/index.html?pid=02b72c10b38e10c6&channelid=3&chid=100';
  });

  $('input[name="tel"]').focus(function() {
    var defaultvalue = document.getElementById("phone_num1").defaultValue;
    if($(this).val() == defaultvalue){
      $(this).val('');
    }
  });


  //统计
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-58583546-8', 'auto');
  ga('send', 'pageview');

  })
