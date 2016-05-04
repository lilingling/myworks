/**************************
* snow
**************************/
(function(){
  //创建画布
  var canvas = document.createElement('canvas');
  var snow = document.querySelector('.snow');
  var width = snow.clientWidth;
  var height = snow.clientHeight;

  // 定位画布
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';

  function onResize(){
    canvas.width = width;
    canvas.height= height;
  }
  onResize();
  //定义雪花对象
  var mount = 300;
  var Snowlake = function(){
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.o =0;
    this.r = 0;
    this.reset();
   }
  Snowlake.prototype.reset = function(){
    this.x = Math.random() * width;
    this.y = Math.random() * -height;
    this.vx = 0.5 - Math.random();
    this.vy = 0.5 + Math.random()*2;
    this.o = 0.5 + Math.random()*0.5;
    this.r = 1 + Math.random()*3;
  }
   //将雪花都放入到数组snowlakes
  var snowlakes = [],snowlake;
  for(var i = 0;i < mount; i++){
    snowlake = new Snowlake();
    snowlake.reset();
    snowlakes.push(snowlake);
  }
  //绘制雪花
  var ctx = canvas.getContext('2d');
  function update(){
    ctx.clearRect(0, 0, width, height);

    for(var i = 0;i < mount; i++){
      snowlake = snowlakes[i];
      snowlake.y += snowlake.vy;
      snowlake.x += snowlake.vx;
      ctx.globalAlpha = snowlake.o;
      ctx.beginPath();
      ctx.arc(snowlake.x,snowlake.y,snowlake.r,0,Math.PI*2,false);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#FFF';
      if (snowlake.y > height) {
          snowlake.reset();
        }
    }
    // setTimeout("update()",10);
    requestAnimFrame(update);

  }
  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();
  update();
  //插入canvas对象
   snow.appendChild(canvas);

})();

/**************************
* music
**************************/
(function(){
  var Music ={
    isOn:true,
    sound:document.getElementById('audio'),
    playSound:function(){
      this.sound.play();
    },
    stopSound:function(){
      this.sound.pause();
    }
  }
  var music_switch = document.getElementById('music-switch');
  music_switch.onclick = function(){
    if(Music.isOn){
      Music.stopSound();
      Music.isOn = false;
      this.src = './images/music-off.png';
    }
    else{
      Music.playSound();
      Music.isOn = true;
      this.src = './images/music-on.png';
    }
  }
  document.addEventListener("WeixinJSBridgeReady", function () {
      WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
        Music.playSound();
      });
  }, false);
})();
