
<!--微信分享-->
var URL= 'http://weixin.wepiao.com/huodong/wx/20150731/yuesha';
var share_img_url = URL+"/images/share.jpg";
WxBridge.share({
    'imgUrl' : share_img_url, // 图片地址
    'link' : window.location.href, // 链接地址
    'title' : '在夏天快要结束的时候，一起看场电影吧！', // 分享标题
    'desc' : '微信电影票和你相约在夏末的八月' // 分享内容
});


//google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-58583546-8', 'auto');
ga('send', 'pageview');
