//获取code
var _code = null;
var getWxcode = function(){
  //获取url字段
  function _getQueryString(name) {
     var param = decodeURIComponent(window.location.search);
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = param.substr(1).match(reg);
     if (r != null)
         return unescape(r[2]);
     return null;
  }
    _code = _getQueryString( 'code' );
  if( !_code ){
      var REDIRECT_URI = encodeURIComponent("http://wx.wepiao.com/cgi/bonus_proxy.php?url="+encodeURIComponent(location.href));
      var openurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92cf60f7577e2d48&redirect_uri="+REDIRECT_URI+"&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
      window.location.replace( openurl );
      return _code;
  }
}();
//用code换取openid
$.ajax({
  url:'http://api.biz.wepiao.com/Bonus/getbonus?res_id=1',
  method:'get',
  dataType:'jsonp',
  success:function(data){
    console.log(data.apicode);
  },
  error:function(jqxhr){
    console.log(jqxhr.status);
  }

});
