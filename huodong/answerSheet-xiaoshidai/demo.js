// 统计答题个数 4选1
// 2016.2.22

$(function(){
    $('#fullpage').fullpage({
      scrollingSpeed: 500
    });
    var num = 1;
    var correctCount = 0;
    var aCorrect =0;
    var bCorrect =0;
    var descs = ['明明有帅气的男友，却因为利益的原因，和别人滚了床单',
                  '暗恋一个人，始终不敢说出口，直到最后和别人在一起了',
                  '明明喜欢他，却悄悄走开消失不见',
                  '发现有人背叛闺蜜，不告诉他，反而最后使他更受伤害',
                  '死心踏地的爱着渣男，被他伤透了心却依然不肯放弃'
                ];
    var correctAnswers = [{'option':'A','msg':'眼镜要擦干净点','type':'A'},
                        {'option':'A','msg':'把注意力放在脖子上','type':'A'},
                        {'option':'B','msg':'故意选错是没有彩蛋的','type':'B'},
                        {'option':'B','msg':'眼科是为你开的','type':'B'},
                        {'option':'C','msg':'差一点就对了','type':'A'}];

    function render(){
      var t =setTimeout(function(){
        $('.bgImg').attr('src','images/pic0'+ num + '.jpg');
        $('.num').text(num);
        $('.desc').text(descs[num-1]);
        $('.answer').text('');
      },1000)
    };
    function showResult(){
      var score = analy();
      $('.result > #score').text(score);
      console.log('a类有几个' + aCorrect);
      console.log('b类有几个' + bCorrect);
    };
    function showAnswer(){
      var correctAnswer = correctAnswers[num-1];
      var option = correctAnswer.option;
      var msg = correctAnswer.msg;
      var type = correctAnswer.type;

      if(answer == option){
        correctCount ++;
        $('.answer').text('答对了！');
        if(type == 'A'){
          aCorrect ++;

        }
        if(type == 'B'){
          bCorrect ++;
        }
      }
      else{
        $('.answer').text(msg);
      }
    };
    function analy(){
      var result ='';
      switch(correctCount){
        case 0: result = 0;
        break;
        case 1:result = 1;
        break;
        case 2:result = 2;
        break;
        case 3:result = 3;
        break;
        case 4:result = 4;
        break;
        case 5:result = 5;
        break;
      }
      return result;
    };
    var answer = '';
    $('.butn').on('click',function(){
       answer = $(this).data('answer');
      showAnswer();
      num++;
      if(num >= 6){
        window.location.href ="#result";
        showResult();
        return
      }
      render();

    });
});
