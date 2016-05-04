/****************************
* 领取红包
/****************************/
// var _code = null;
// var getWxcode = function(){
//   //获取url字段
//   function _getQueryString(name) {
//      var param = decodeURIComponent(window.location.search);
//      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//      var r = param.substr(1).match(reg);
//      if (r != null)
//          return unescape(r[2]);
//      return null;
//   }
//     _code = _getQueryString( 'code' );
//   if( !_code ){
//       var REDIRECT_URI = encodeURIComponent("http://wx.wepiao.com/cgi/bonus_proxy.php?url="+encodeURIComponent(location.href));
//       var openurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92cf60f7577e2d48&redirect_uri="+REDIRECT_URI+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
//       window.location.replace( openurl );
//       return _code;
//   }
// }();

// $('#send').on('click',function(){
// //获取用户openId
//   $.ajax({
//     url:'http://apitest.biz.wepiao.com/Common/Loginwechat?callback=syhlogin&wxcode=' + _code,
//     type:'get',
//     dataType:'jsonp',
//     success:function(data){
//       doGetBonus( data.data.wxopenidcrypt );
//       // console.log('请求成功'+data);
//     },
//     error:function(error,status,code){
//       alert(error);
//       console.log('请求失败！')
//     }
//
//   });
//    $('.wrapper_getbonus').addClass('active');
// });
//请求红包接口
// function doGetBonus( openid ){
//   $.ajax({
//     url:'http://apitest.biz.wepiao.com/Bonus/getbonus?res_id=a9fd3c500321e074&suin='+openid,
//     type:'get',
//     dataType:'jsonp',
//     success:function(data){
//       doBonusResult(data.apicode,data.data.receivecentertitle);
//       // console.log('请求成功'+data);
//     },
//     error:function(error,status,code){
//       alert(error);
//       console.log('请求失败！')
//     }
//
//   })
// }
// //领取红包结果处理
// function doBonusResult(apicode,receivecentertitle){
//   if(apicode == 10000 && receivecentertitle == 1){
//     //领取成功
//     $('.get_success').css('opacity','1');
//     $('.get_failure').css('opacity','0');
//   }
//   else{
//     //领取失败
//     $('.get_success').css('opacity','0');
//     $('.get_failure').css('opacity','1');
//   }
//
// }
document.addEventListener("WeixinJSBridgeReady", function () {
    WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
      $('#music_message').play();

    });
}, false);
