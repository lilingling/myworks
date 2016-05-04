$.util = {
            //获取url参数的方法
            'getUrlParam': function (name) {
                var url = location.search; //获取url中"?"符后的字串
                var theRequest = {};
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                     strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            }};
    if(mqq && mqq.ui){
    var isMine = ($.util.getUrlParam().page === 'mycoupons'),
        isActivity = ($.util.getUrlParam().activity === '1' || $.util.getUrlParam().activity);

    if(!isMine && !isActivity){
        // $.util.getUrlParam().page  指从url获取的page参数
        mqq.ui.setActionButton({
            title: '我的',
            hidden: false
        },function() {

            if($.util.getUrlParam().webviewtype == '1'){
                // 定制化已弃用
            }else{
                mqq.ui.openUrl({
                    url:'http://web.p.qq.com/qqmpmobile/coupon/mycoupons.html?_bid=108&_wv=5123&page=mycoupons',
                    target: 0,
                    style: 1
                });
                /* 解决一种BUG：
                从聊天窗口进入评论页面，由于评论页面设置了setOnCloseHandler
                导致在评论页面使用location.href做跳转时，由于是在同一个webview，设置的callback函数失效，从而导致返回按钮点击失效 */
                resetClose();
            }
        })
    }else{
        mqq.ui.setActionButton({
            title: '',
            hidden: true
        }, function(){
            // mqq.ui.showShareMenu();
        });
        isMine && resetClose();
    }
}

function resetClose(){
    mqq.ui.setOnCloseHandler(function(arg) {
        mqq.ui.setOnCloseHandler('');
        history.go(-1);
    });
}


//根据“吃喝玩乐”给出的上报接口文档，上传相应的参数。
function postUrl(module,action,obj1,obj2,platform,ver,operid,followid,channel1,channel2,channel3,channel4){
    var  data={
                module:module,cmd:100,
                action:action,obj1:obj1,
                obj2:obj2,
                platform:platform,ver:ver,source:'4',
                operid:operid,followid:followid,
                channel1:channel1,channel2:channel2,channel3:channel3,channel4:channel4

    };
//上报的接口地址
    var myUrl='http://s.p.qq.com/cgi-bin/coupon_q/api/report.fcg';

    $.ajax({
        url:myUrl,
        type:"GET",
        data:data,
        dataType: "jsonp",
        jsonpCallback: 'fnsuccesscallback'
    });

}
//购票按钮统计
$('.detailButn,.button1,.button2,.ticketButn').on('click',function(){
    //以openUrl()方式打开链接
    var href = $(this).attr("hhref");
    mqq.ui.openUrl({
        url: href,
        target:1,
        style:1
    });
    var module='activity';
    var action='click';
    var obj1='8ywy';
    //var obj2=$(this).data('obj2');
    var obj2='';
    var ver =mqq.QQVersion;
    var browser = navigator.userAgent;
    !!browser.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(browser.indexOf('Android') > -1 || browser.indexOf('Linux') > -1){
        var platform='Android'
    }
    if(browser.indexOf('iPhone') > -1){
        var platform='ios'
    }
    // if($(this).hasClass("ticketButn")){
    //     obj2="";
    // }
   var mylink=window.location.href;
//     var mylink = "http://weixin.wepiao.com?obj3=6&sid=Af5w9jpc6auS-AjfwAydMNFI&platform=6&ver=5.7.2&res6=-1&operid=66&followid=&channel1=11001&channel2=&channel3=&channel4=&network=wifi&module=allcity%24tab&action=click&obj1=0&obj2=1&followid=99";

    var search = mylink.substring(mylink.indexOf("?")+1,mylink.length-1);
    var operid = "";
    var followid = "";
    var channel1 = "",channel2 = "",channel3 = "",channel4="";
    var arry = search.split("&");
    for(var i in arry){
        var item = arry[i];
        var keys = item.split("=");
        var key = keys[0];
        if(key == "operid"){
            operid = keys[1];
        }
        if(key=="followid"){
            followid = keys[1];
        }
        if(key == "channel1"){
            channel1 = keys[1];
        }
        if(key == "channel2"){
            channel2 = keys[1];
        }
        if(key == "channel3"){
            channel3 = keys[1];
        }
        if(key == "channel4"){
            channel4 = keys[1];
        }
    }
    postUrl(module,action,obj1,obj2,platform,ver,operid,followid,channel1,channel2,channel3,channel4);
})

//打开页面的统计
    $(function(){
        var module="activity";
        var action="view";
        var obj2="";
        var obj1='8ywy';
        var ver =mqq.QQVersion;
        var browser = navigator.userAgent;
        !!browser.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(browser.indexOf('Android') > -1 || browser.indexOf('Linux') > -1){
            var platform='Android'
        }
        if(browser.indexOf('iPhone') > -1){
            var platform='ios'
        }
        var mylink=window.location.href;
//        var mylink = "http://weixin.wepiao.com?obj3=6&sid=Af5w9jpc6auS-AjfwAydMNFI&platform=6&ver=5.7.2&res6=-1&operid=66&followid=&channel1=11001&channel2=&channel3=&channel4=&network=wifi&module=allcity%24tab&action=click&obj1=0&obj2=1&followid=99";

        var search = mylink.substring(mylink.indexOf("?")+1,mylink.length-1);
        // var search = mylink.substring(2,mylink.length-1);
        var operid = "";
        var followid = "";
        var channel1 = "",channel2 = "",channel3 = "",channel4="";
        var arry = search.split("&");
        for(var i in arry){
            var item = arry[i];
            var keys = item.split("=");
            var key = keys[0];
            if(key == "operid"){
                operid = keys[1];
            }
            if(key=="followid"){
                followid = keys[1];
            }
            if(key == "channel1"){
                channel1 = keys[1];
            }
            if(key == "channel2"){
                channel2 = keys[1];
            }
            if(key == "channel3"){
                channel3 = keys[1];
            }
            if(key == "channel4"){
                channel4 = keys[1];
            }
        }
        postUrl(module,action,obj1,obj2,platform,ver,operid,followid,channel1,channel2,channel3,channel4);
    });