//获取code
var _code = null;
var getWxcode = function() {
  //获取url字段
  function _getQueryString(name) {
    var param = decodeURIComponent(window.location.search);
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = param.substr(1).match(reg);
    if (r != null)
      return unescape(r[2]);
    return null;
  }
  _code = _getQueryString('code');
  if (!_code) {
    var REDIRECT_URI = encodeURIComponent("http://wx.wepiao.com/cgi/bonus_proxy.php?url=" + encodeURIComponent(location.href));
    var openurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92cf60f7577e2d48&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
    window.location.replace(openurl);
    return _code;
  }
}();
$.ajax({
  url: 'http://api.biz.wepiao.com/Bonus/getbonus?res_id=1&suin=' + _code,
  method: 'GET',
  dataType: 'jsonp',
  success: function(data) {
    var callbackStatus = data.apicode;
    var getBonusStatus = data.receivecentertitle;
    if (callbackStatus == 1000) {
      switch (getBonusStatus) {
        case 1:
          alert('红包领取成功！');
          // bonusvalue 红包金额(5 10)

          break;
        case 2:
          alert('领的够多了 给别人留点吧');
          break;
        case 3:
          alert('红包抢光了 下手慢');
          break;
        case 4:
          alert('让红包飞一会 小票迷路了');
          break;
        case 5:
          alert('没有领取资格');
          break;
      };
    } else {
      alert('红包接口请求失败');
    }

  },
  error: function(jqxhr) {
    console.log(jqxhr.status);
  }

});
