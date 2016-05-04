try {
    console.log('log');
} catch (e) {
    var console = {log: function () {
    }};
}

(function () {

    gb.classes = {};
    
    gb.events = {
        Click : 'touchend',
        TouchStart : 'touchstart',
        TouchMove : 'touchmove',
        TouchEnd : 'touchend'
    };


    var ua = navigator.userAgent.toLowerCase();
    var app = navigator.appVersion.toLowerCase();
    var browser = {};
    var sys = {};
    var device = {};
    gb.browser = {
        init : function(ua_){
            if(ua_) ua = ua_.toLowerCase();
            var b;
            (b = ua.match(/msie ([\d.]+)/)) ? browser.ie = b[1] : undefined;
            (b = ua.match(/firefox\/([\d.]+)/)) ? browser.firefox = b[1] : undefined;
            (b = ua.match(/crios\/([\d.]+)/)) ? browser.chromemob = b[1] : undefined;
            (b = ua.match(/opera.([\d.]+)/)) ? browser.opera = b[1] : undefined;
            (b = ua.match(/micromessenger\/([\d.]+)/)) ? browser.micromessenger = b[1] : undefined;
            (b = ua.match(/ucbrowser\/([\d.]+)/)) ? browser.ucbrowser = b[1] : undefined;
            (b = ua.match(/ uc /)) ? browser.ucbrowser = b : undefined;
            (b = ua.match(/miuibrowser\/([\d.]+)/)) ? browser.miuibrowser = b[1] : undefined;
            (b = ua.match(/weibo__([\d.]+)/)) ? browser.weibo = b[1] : undefined;
            (b = ua.match(/qq\/([\d.]+)/)) ? browser.qq = b[1] : undefined;
            (b = ua.match(/mqqbrowser\/([\d.]+)/)) ? browser.mqqbrowser = b[1] : undefined;
            (b = ua.match(/maxthon\/([\d.]+)/)) ? browser.maxthon = b[1] : undefined;
            (b = ua.match(/baiduboxapp\/([\d.]+)/)) ? browser.baiduapp = b[1] : undefined;
            (b = ua.match(/baidubrowser\/([\d.]+)/)) ? browser.baidubrowser = b[1] : undefined;
            (b = ua.match(/chrome\/([\d.]+)/)) ? browser.chrome = b[1] : undefined;
            (b = ua.match(/version\/([\d.]+).*safari/)) ? browser.safari = b[1] : 0;

            var s;
            (s = ua.match(/windows nt ([\d.]+)/)) ? sys.windows = s[1] : undefined;
            (s = ua.match(/mac os x ([\d._]+)/)) ? sys.mac = s[1] : undefined;
            (s = ua.match(/cpu iphone os ([\d._]+)/)) ? sys.ios = s[1] : undefined;
            (s = ua.match(/cpu os ([\d._]+)/)) ? sys.ios = s[1] : undefined;
            (s = ua.match(/iph os ([\d._]+)/)) ? sys.ios = s[1] : undefined;
            (s = ua.match(/android ([\d._]+)/)) ? sys.android = s[1] : undefined;
            (s = ua.match(/tablet os ([\d.]+)/)) ? sys.tabletos = s[1] : undefined;

            var d;
            var oppo = ["x909t","r827t","x909"];
            for(var i=0;i<oppo.length;i++){
                (ua.indexOf(oppo[i])>-1) ? device.oppo = oppo[i] : undefined;
            }
            var nubia = ["nx507j"];
            for(i=0;i<nubia.length;i++){
                (ua.indexOf(nubia[i])>-1) ? device.nubia = nubia[i] : undefined;
            }
            (d = ua.match(/iphone/)) ? device.iphone = d : undefined;
            (d = ua.match(/iph os/)) ? device.iphone = d : undefined;
            (d = ua.match(/ipad/)) ? device.ipad = d : undefined;
            (d = ua.match(/ipod/)) ? device.ipod = d : undefined;
            (d = ua.match(/macintosh/)) ? device.mac = d : undefined;
            (d = ua.match(/windows/)) ? device.pc = d : undefined;
            (d = ua.match(/playbook/)) ? device.blackberry = d : undefined;
            (d = ua.match(/gt-([a-z\d.]+)/)) ? device.samsung = d[1] : undefined;
            (d = ua.match(/sch-([a-z\d.]+)/)) ? device.samsung = d[1] : undefined;
            (d = ua.match(/sm-([a-z\d.]+)/)) ? device.samsung = d[1] : undefined;
            (d = ua.match(/sgh-([a-z\d.]+)/)) ? device.samsung = d[1] : undefined;
            (d = ua.match(/(hm note [a-z\d.]+)/)) ? device.xiaomi = d[1] : undefined;
            (d = ua.match(/(mi [\d.]+)/)) ? device.xiaomi = d[1] : undefined;
            (d = ua.match(/ (m[\d.]+) /)) ? device.meizu = d[1] : undefined;
            (d = ua.match(/lenovo_([a-z\d.]+)/)) ? device.lenove = d : undefined;
            (d = ua.match(/sonyericsson([a-z\d.]+)/)) ? device.sonyericsson = d[1] : undefined;
            (d = ua.match(/sony([a-z\d.]+)/)) ? device.sony = d[1] : undefined;
            (d = ua.match(/htc ([a-z\d.]+)/)) ? device.htc = d[1] : undefined;
            (d = ua.match(/changhong([a-z\d.]+)/)) ? device.changhong = d[1] : undefined;
            (d = ua.match(/nexus ([a-z\d.]+)/)) ? device.nexus = d[1] : undefined;
            (d = ua.match(/lg-([a-z\d.]+)/)) ? device.lg = d[1] : undefined;
            (d = ua.match(/huawei_([a-z\d.]+)/)) ? device.huawei = d[1] : undefined;
            (d = ua.match(/huawei([a-z\d.]+)/)) ? device.huawei = d[1] : undefined;
            (d = ua.match(/hisense ([a-z\d.]+)/)) ? device.hisense = d[1] : undefined;
            (d = ua.match(/hs-([a-z\d.]+)/)) ? device.hisense = d[1] : undefined;

        },
        getUserAgent : function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPod: u.indexOf('iPod') > -1, //是否为iPod或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                isMac: u.indexOf('Mac') > -1,   //是否是mac终端
                isLinux: u.indexOf('Linux') > -1,//是否是linux系统
                isWeiXin:navigator.userAgent.indexOf('MicroMessenger') > -1,//判断是不是微信浏览器
                isWindowsPhone:u.indexOf('Windows Phone') > -1//是否是windows phone
            };
        },
        browser : function(){
            this.init();
            if (browser.ie) return('IE');
            if (browser.firefox) return('Firefox');
            if (browser.chromemob) return('Chrome Mobile');
            if (browser.opera) return('Opera');
            if (browser.micromessenger) return('WeiXin');
            if (browser.ucbrowser) return('UC');
            if (browser.miuibrowser) return('MiuiBrowser');
            if (browser.weibo) return('Weibo');
            if (browser.qq) return('QQ');
            if (browser.mqqbrowser) return('QQBrowser');
            if (browser.maxthon) return('Maxthon');
            if (browser.baiduapp) return('BaiDuApp');
            if (browser.baidubrowser) return('BaiDuBrowser');
            if (browser.chrome) return('Chrome');
            if (browser.safari) return('Safari');
        }
    };





    //===========
    // Class
    //===========
    var initializing = false;
    var fnTest = /xyz/.test(function () {
        xyz;
    }) ? /\b_super\b/ : /.*/;
    this.Class = function () {
    };
    Class.extend = function (prop) {
        var _super = this.prototype;
        initializing = true;
        var pty = new this();
        initializing = false;
        for (var name in prop) {
            pty[name] = typeof prop[name] == "function" &&
            typeof _super[name] == "function" && fnTest.test(prop[name]) ?
                (function (name, fn) {
                    return function () {
                        var tmp = this._super;
                        this._super = _super[name];
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;
                        return ret;
                    };
                })(name, prop[name]) :
                prop[name];
        }
        function Class() {
            if (!initializing && this.ctor)
                this.ctor.apply(this, arguments);
        }

        Class.prototype = pty;
        Class.prototype.constructor = Class;
        Class.extend = arguments.callee;
        return Class;
    };
    gb.classes.Class = Class;

    /**
     *
     * 添加事件侦听
     *
     * */
    gb.events.addHandler = function(element, type, handler){
        if (element.addEventListener){

            element.addEventListener(type, handler, false);

        } else if (element.attachEvent){

            element.attachEvent("on" + type, handler);

        } else {

            element["on" + type] = handler;

        }
    };

    /**
     *
     * 删除事件侦听
     *
     * */
    gb.events.removeHandler = function(element, type, handler){
        if (element.removeEventListener){

            element.removeEventListener(type, handler, false);

        } else if (element.detachEvent){

            element.detachEvent("on" + type, handler);

        } else {

            element["on" + type] = null;

        }
    };


})();
/* -------------------------------------------gbbase end */



var SitePanel = gb.classes.Class.extend({
    _config:null,
    name:null,
    view:null,
    _callback:null,
    _htmlMap:null,
    ctor:function(config_,name_,callback_){
        var self = this;
        self._htmlMap = {};
        self.name = name_;
        self.view = $('#'+name_);
        self._config = config_;
        self._callback = callback_;

        var total = 0;
        var currentid = 0;

        for (var i in self._config.panels) {
            // console.log(i,self._config.panels[i],self._config.panels[i].hasOwnProperty('html'));
            if(self._config.panels[i].hasOwnProperty('html')){
                total++;
                var obj = {panelName: i},
                handler = function(data_){

                    self._htmlMap[this.panelName] = data_;

                    // var divhtml = '<div id="Panel_'+this.panelName+'" style="display:none;">'+data_+'</div>';
                    // self.view.prepend(divhtml);
                    currentid++;
                    if(currentid == total){

                        self.htmlLoadComplete();
                    }
                    // console.log(data_,this.panelName,this);
                };

                $.ajax({
                    url: self._config.panels[i].html,
                    dataType: 'html',
                    type: 'GET',
                    mydata: {panelName: i},
                    success:$.proxy(handler, obj)
                });

            }
            
        }

    },
    htmlLoadComplete:function(){
        var self = this;
        
        if(self._callback){
            self._callback();
        }
    },
    interHtml:function(){
        var self = this;

        for (var i in self._htmlMap) {
            var divhtml = '<div id="Panel_'+i+'" style="display:none;">'+self._htmlMap[i]+'</div>';
            self.view.prepend(divhtml);            
        }

    }
});

/* ------------------------------------------------SitePanel end */

var BaseClass = gb.classes.Class.extend({
    _callBack:null,
    _direction:null,
    view:null,
    name:null,
    ctor:function(name_){
        var self = this;
        self.view = $('#Panel_'+name_);
        self.name = name_;
        self.view.addClass('base-view');

    },
    askToAdd:function(data_){
        var self = this;

        // self.view.css('opacity',0);
        // self.view.css('z-index',100);

        self.toAdd();

        if(data_){

            if(data_.type == 1){
                self.startAnimOut();
            }else if(data_.type == 2){
                self.startAnimIn();
            }
        }
        //console.log('askToAdd::',data_.type);

    },
    askToRemove:function(data_){
        var self = this;
        // self.view.css('z-index',200);
        if(data_){

            self._callBack = data_.callBack;
            self._direction = data_.type;

            if(data_.type == 1){
                self.overAnimOut();
            }else if(data_.type == 2){
                self.overAnimIn();
            }


        }
        //console.log('askToRemove::',data_.type);
    },
    toAdd:function(){
        var self = this;
        self.view.css('display','block');
    },
    toRemove:function(){
        var self = this;
        self.view.css('display','none');
    },
    startAnimIn:function(){
        var self = this;
        TweenMax.set(self.view,{rotationY:0});
        //console.log('startAnimIn::',self.view.attr('id'));
    },
    startAnimOut:function(){
        var self = this;
        TweenMax.to(self.view,0.6,{rotationY:0});
        // console.log(app.currentId);
        //console.log('startAnimOut::',self.view.attr('id'));
    },
    overAnimIn:function(){
        var self = this;
        // self.overComplete();
        if(self._callBack){
            self._callBack();
        }
        TweenMax.to(self.view,0.6,{rotationY:90,onComplete:function(){
            self.toRemove();
        }});
        
    },
    overAnimOut:function(){
        var self = this;
        // self.overComplete();
        if(self._callBack){
            self._callBack();
        }
        setTimeout(function(){
            self.toRemove();
        },600);
        // TweenMax.to(self.view,0.6,{rotationY:90});
    },
    overComplete:function(){
        var self = this;
        self.toRemove();
        if(self._callBack){
            self._callBack();
        }

    }
});
/* -------------------------------------------base class end */

var SoundManage = {
    sound:null,
    isOn:true,
    name:'bg',
    init:function(){
        this.sound = {};
        this.sound['bg'] = $('#bg').get(0);
        
    },
    playSound:function(param_){
        this.sound[param_].play();  
        
    },
    stopSound:function(param_){
        
        this.sound[param_].pause();  
        // $('#media').get(0).pause();
    }
};

/* ------------------------------------------------SoundManage end */

var Loading = BaseClass.extend({
    _callback:null,
    _logingTxt:null,
    ctor:function(name_,callback_){
        var self = this;
        self._super(name_);
        self.view.css({'z-index':200,backgroundColor:'#000'});
        self._logingTxt = self.view.find('.loging-txt');
        self._callback = callback_;
    },
    askToAdd:function(data_){
        var self = this;
        // self._super();
    },
    askToRemove:function(data_){
        var self = this;
        //self._super();
        self.toRemove();
        self.view.empty();
        self.view.remove();
        // TweenMax.to(self.view,1,{alpha:0,onComplete:function(){
            
        // }});
    },
    onProgress:function(val_){
        var self = this;
        self._logingTxt.html(val_+'%');
        
        // console.log(val_);
    },
    onComplete:function(val_){
        var self = this;
        self._logingTxt.html('100%');
        // self.toRemove();
        // self.askToRemove();
        if(self._callback) self._callback();
        SoundManage.playSound('bg');

    }
});


/* ------------------------------------------------Loading end */

var IndexPanel = BaseClass.extend({
    _indexImg1:null,
    _indexSibi:null,
    _indexFanye:null,
    ctor:function(name_){
        var self = this;
        self._super(name_);

        self._indexImg1 = self.view.find('.index-img1');
        self._indexSibi = self.view.find('.index-sibi');
        self._indexFanye = self.view.find('.index-fanye');

    },
    askToAdd:function(data_){
        var self = this;

        TweenMax.set(self._indexImg1,{alpha:0});
        TweenMax.set(self._indexSibi,{scaleX:2,scaleY:2,alpha:0});
        self._indexFanye.css('display','none');
        self._super(data_);
        

    },
    askToRemove:function(data_){
        var self = this;
        self._indexFanye.removeClass('left-move-anim');
        self._super(data_);
        

    },
    startAnimIn:function(){
        var self = this;
        self._super();
        self.nextAnim();
        
    },
    startAnimOut:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);
        
        
    },
    overAnimIn:function(){
        var self = this;
        self._super();

    },
    overAnimOut:function(){
        var self = this;
        self._super();
        //console.log('overAnimOut::',self.view.attr('id'));
        // self.overComplete();
    },
    nextAnim:function(){
        var self = this;
        
        
        TweenMax.to(self._indexImg1,0.8,{alpha:1});
        TweenMax.to(self._indexSibi,0.8,{scaleX:1,scaleY:1,alpha:1,delay:0.6,onComplete:function(){
            self._indexFanye.addClass('left-move-anim');
            self._indexFanye.css('display','block');    
        }});
        

    }
});


var PagePanel2 = BaseClass.extend({
    _page2Txt1:null,
    _page2Txt2:null,
    _page2Qiaokeli1:null,
    _page2Qiaokeli2:null,
    _page2Fanye:null,
    _page2Head:null,
    _page2Img1:null,
    _page2Img2:null,
    _page2Img3:null,
    _page2Yanwu:null,
    _yejiao:null,
    _timer1:null,
    _timer2:null,
    _timer3:null,
    _timer4:null,
    ctor:function(name_){
        var self = this;
        self._super(name_);
        self._page2Txt1 = self.view.find('.page2-txt1');
        self._page2Txt2 = self.view.find('.page2-txt2');
        self._page2Qiaokeli1 = self.view.find('.page2-qiaokeli1');
        self._page2Qiaokeli2 = self.view.find('.page2-qiaokeli2');
        self._page2Fanye = self.view.find('.page2-fanye');
        self._page2Head = self.view.find('.page2-head');
        self._page2Img1 = self.view.find('.page2-img1');
        self._page2Img2 = self.view.find('.page2-img2');
        self._page2Img3 = self.view.find('.page2-img3');

        self._page2Yanwu = self.view.find('.page2-yanwu');
        self._yejiao = self.view.find('.yejiao');

        self.view.bind(gb.events.TouchEnd,{self:self},self.onBtnEvent);

    },
    askToAdd:function(data_){
        var self = this;
        
        clearTimeout(self._timer1);
        clearTimeout(self._timer2);
        clearTimeout(self._timer3);
        clearTimeout(self._timer4);

        self._isTouch = false;
        TweenMax.set(self._page2Txt1,{y:-30,alpha:0});
        TweenMax.set(self._page2Txt2,{y:30,alpha:0});
        self._page2Qiaokeli1.css('display','block');
        self._page2Qiaokeli2.css('display','none');
        self._page2Fanye.css('display','none');
        TweenMax.set(self._page2Head,{alpha:0});
        self._page2Img1.css('display','none');
        self._page2Img2.css('display','none');
        self._page2Img3.css('display','none');
        self._page2Yanwu.css('display','none');
        self._yejiao.css('display','none');

        self._super(data_);

    },
    askToRemove:function(data_){
        var self = this;
        self._page2Fanye.removeClass('left-move-anim');
        clearTimeout(self._timer1);
        clearTimeout(self._timer2);
        clearTimeout(self._timer3);
        clearTimeout(self._timer4);
        self._super(data_);
        

    },
    startAnimIn:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);
        
    },
    startAnimOut:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);
        //console.log('startAnimOut::',self.view.attr('id'));
    },
    overAnimIn:function(){
        var self = this;
        self._super();
        //console.log('overAnimIn::',self.view.attr('id'));
        // self.overComplete();
    },
    overAnimOut:function(){
        var self = this;
        self._super();
        //console.log('overAnimOut::',self.view.attr('id'));
        // self.overComplete();
    },
    nextAnim:function(){
        var self = this;

        TweenMax.to(self._page2Txt1,0.6,{y:0,alpha:1});
        // TweenMax.to(self._page2Qiaokeli1,0.6,{y:30,onComplete:function(){
        //     TweenMax.to(self._page2Qiaokeli1,0.6,{y:0,onComplete:function(){
                
        //     }});    
        // }});


        // TweenMax.to(self._page2Qiaokeli1,0.6,{y:30,delay:1.2,onComplete:function(){
        //     TweenMax.to(self._page2Qiaokeli1,0.6,{y:0,onComplete:function(){
                // self._page2Qiaokeli1.css('display','none');
                // self._page2Qiaokeli2.css('display','block');
                // setTimeout(function(){
                //     self.twoAnim();
                // },1500);
        //     }});    
        // }});

        self.toDown();    
        


    },
    twoAnim:function(){
        var self = this;

        self._page2Qiaokeli2.css('display','none');
        TweenMax.to(self._page2Head,0.6,{alpha:1,onComplete:function(){

            self._page2Yanwu.css('display','block');
            self._timer1 = setTimeout(function(){
                self._page2Img1.css('display','block');
            },500);

            self._timer2 = setTimeout(function(){
                self._page2Img1.css('display','none');
                self._page2Img2.css('display','block');
            },2800);

            self._timer3 = setTimeout(function(){
                TweenMax.to(self._page2Txt2,0.6,{y:0,alpha:1});
                self._page2Img2.css('display','none');
                self._page2Img3.css('display','block');
            },4800);

            self._timer4 = setTimeout(function(){
                self._page2Yanwu.css('display','none');
                self._page2Fanye.addClass('left-move-anim');
                self._page2Fanye.css('display','block');   
                self._yejiao.css('display','block'); 
            },5800);

        }});

    },
    toDown:function(){
        var self = app.getPanel('panel2');
        TweenMax.to(self._page2Qiaokeli1,0.6,{y:30,onComplete:function(){
            self.toUp();
        }});
    },
    toUp:function(){
        var self = app.getPanel('panel2');
        TweenMax.to(self._page2Qiaokeli1,0.6,{y:0,onComplete:function(){
            self.toDown();    
        }});
    },
    onBtnEvent:function(e){
        var self = e.data.self;
        if(self._isTouch) return;
        e.stopPropagation();
        e.preventDefault();

        TweenMax.to(self._page2Qiaokeli1,0.6,{y:0,onComplete:function(){

            self._page2Qiaokeli1.css('display','none');
            self._page2Qiaokeli2.css('display','block');
            setTimeout(function(){
                self.twoAnim();
            },1500);

        }});

        self._isTouch = true;

    }
});

var PagePanel3 = BaseClass.extend({
    _page3Head:null,
    _page3Txt1:null,
    _page3Zb:null,
    _page3Img1:null,
    _page3Img2:null,
    _page3Img3:null,
    _page3Jiubei:null,
    _page3F2:null,
    _page3Img4:null,
    _page3Img5:null,
    _page3Img6:null,
    _page3Goufudai:null,
    _page3Fanye:null,
    _yejiao:null,
    ctor:function(name_){
        var self = this;
        self._super(name_);

        self._page3Head = self.view.find('.page3-head');
        self._page3Txt1 = self.view.find('.page3-txt1');
        self._page3Zb = self.view.find('.page3-zb');
        self._page3Img1 = self.view.find('.page3-img1');
        self._page3Img2 = self.view.find('.page3-img2');
        self._page3Img3 = self.view.find('.page3-img3');
        self._page3Jiubei = self.view.find('.page3-jiubei');

        self._page3F2 = self.view.find('.page3-f2');

        self._page3Img4 = self.view.find('.page3-img4');
        self._page3Img5 = self.view.find('.page3-img5');
        self._page3Img6 = self.view.find('.page3-img6');
        self._page3Goufudai = self.view.find('.page3-goufudai');

        self._page3Fanye = self.view.find('.page2-fanye');
        self._yejiao = self.view.find('.yejiao');


    },
    askToAdd:function(data_){
        var self = this;
        TweenMax.set(self._page3Head,{alpha:0});
        TweenMax.set(self._page3Txt1,{alpha:0});
        TweenMax.set(self._page3Zb,{alpha:0,y:-20});
        TweenMax.set(self._page3Img1,{alpha:0,y:-100});
        TweenMax.set(self._page3Img2,{alpha:0,y:-100});
        TweenMax.set(self._page3Img3,{alpha:0,y:-100});
        self._page3Jiubei.css('display','none');

        TweenMax.set(self._page3F2,{alpha:0,y:-20});
        TweenMax.set(self._page3Img4,{alpha:0,y:-100});
        TweenMax.set(self._page3Img5,{alpha:0,y:-100});
        TweenMax.set(self._page3Img6,{alpha:0,y:-100});

        self._page3Goufudai.css('display','none');
        self._page3Fanye.css('display','none');   
        self._yejiao.css('display','none'); 

        self._super(data_);
        
    },
    askToRemove:function(data_){
        var self = this;
        self._page3Fanye.removeClass('left-move-anim');
        self._super(data_);
        

    },
    startAnimIn:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);
        //console.log('startAnimIn::',self.view.attr('id'));
    },
    startAnimOut:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);

        //console.log('startAnimOut::',self.view.attr('id'));
    },
    overAnimIn:function(){
        var self = this;
        self._super();
        //console.log('overAnimIn::',self.view.attr('id'));
        // self.overComplete();
    },
    overAnimOut:function(){
        var self = this;
        self._super();
        //console.log('overAnimOut::',self.view.attr('id'));
        // self.overComplete();
    },
    nextAnim:function(){
        var self = this;

        TweenMax.to(self._page3Head,0.6,{alpha:1});
        TweenMax.to(self._page3Txt1,0.6,{alpha:1,delay:0.3});
        TweenMax.to(self._page3Zb,0.6,{alpha:1,y:0,delay:0.9});
        TweenMax.to(self._page3Img1,0.6,{alpha:1,y:0,delay:1.5});
        TweenMax.to(self._page3Img2,0.6,{alpha:1,y:0,delay:2.1});
        TweenMax.to(self._page3Img3,0.6,{alpha:1,y:0,delay:2.7,onComplete:function(){
            self._page3Jiubei.css('display','block');
        }});
        

        TweenMax.to(self._page3F2,0.6,{alpha:1,y:0,delay:3.5});
        TweenMax.to(self._page3Img4,0.6,{alpha:1,y:0,delay:4.1});
        TweenMax.to(self._page3Img5,0.6,{alpha:1,y:0,delay:4.7});
        TweenMax.to(self._page3Img6,0.6,{alpha:1,y:0,delay:5.3,onComplete:function(){
            self._page3Goufudai.css('display','block');
            setTimeout(function(){

                self._page3Fanye.addClass('left-move-anim');
                self._page3Fanye.css('display','block');   
                self._yejiao.css('display','block'); 

            },200);
        }});

        

    }
});

var PagePanel4 = BaseClass.extend({
    _page4Txt1:null,
    _page42b:null,
    _page4Line:null,
    _page4Head1:null,
    _page4Head2:null,
    _page4Head3:null,
    _page4Head4:null,
    _page4Head5:null,
    _page4Dianji:null,
    _page42b1:null,
    _page42b2:null,
    _page42b3:null,
    _page42b4:null,
    _page42b5:null,
    _page44b:null,
    _page4Fanye:null,
    _yejiao:null,
    _isTouch:false,
    ctor:function(name_){
        var self = this;
        self._super(name_);

        self._page4Txt1 = self.view.find('.page4-txt1');
        self._page42b = self.view.find('.page4-2b');
        self._page4Line = self.view.find('.page4-line');
        self._page4Head1 = self.view.find('.page4-head1');
        self._page4Head2 = self.view.find('.page4-head2');
        self._page4Head3 = self.view.find('.page4-head3');
        self._page4Head4 = self.view.find('.page4-head4');
        self._page4Head5 = self.view.find('.page4-head5');

        self._page4Dianji = self.view.find('.page4-dianji');
        self._page42b1 = self.view.find('.page4-2b1');
        self._page42b2 = self.view.find('.page4-2b2');
        self._page42b3 = self.view.find('.page4-2b3');
        self._page42b4 = self.view.find('.page4-2b4');
        self._page42b5 = self.view.find('.page4-2b5');

        self._page44b = self.view.find('.page4-4b');

        self._page4Fanye = self.view.find('.page2-fanye');
        self._yejiao = self.view.find('.yejiao');

        self.view.bind(gb.events.TouchEnd,{self:self},self.onBtnEvent);

    },
    askToAdd:function(data_){
        var self = this;
        self._page4Fanye.css('display','none');   
        self._yejiao.css('display','none'); 
        self._isTouch = false;
        TweenMax.set(self._page4Txt1,{alpha:0});
        TweenMax.set(self._page42b,{scaleX:0,scaleY:0});
        TweenMax.set(self._page4Line,{alpha:0});
        TweenMax.set(self._page4Head1,{scaleX:0,scaleY:0});
        TweenMax.set(self._page4Head2,{scaleX:0,scaleY:0});
        TweenMax.set(self._page4Head3,{scaleX:0,scaleY:0});
        TweenMax.set(self._page4Head4,{scaleX:0,scaleY:0});
        TweenMax.set(self._page4Head5,{scaleX:0,scaleY:0});

        
        TweenMax.set(self._page4Dianji,{alpha:0});
        TweenMax.set(self._page42b1,{scaleX:2,scaleY:2,alpha:0});
        TweenMax.set(self._page42b2,{scaleX:2,scaleY:2,alpha:0});
        TweenMax.set(self._page42b3,{scaleX:2,scaleY:2,alpha:0});
        TweenMax.set(self._page42b4,{scaleX:2,scaleY:2,alpha:0});
        TweenMax.set(self._page42b5,{scaleX:2,scaleY:2,alpha:0});
        TweenMax.set(self._page44b,{scaleX:2,scaleY:2,alpha:0});



        self._super(data_);
        
    },
    askToRemove:function(data_){
        var self = this;
        self._page4Fanye.removeClass('left-move-anim');
        self._super(data_);
        

    },
    startAnimIn:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);
        //console.log('startAnimIn::',self.view.attr('id'));
    },
    startAnimOut:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);

        //console.log('startAnimOut::',self.view.attr('id'));
    },
    overAnimIn:function(){
        var self = this;
        self._super();
        //console.log('overAnimIn::',self.view.attr('id'));
        // self.overComplete();
    },
    overAnimOut:function(){
        var self = this;
        self._super();
        //console.log('overAnimOut::',self.view.attr('id'));
        // self.overComplete();
    },
    nextAnim:function(){
        var self = this;

        TweenMax.to(self._page4Txt1,0.6,{alpha:1});
        TweenMax.to(self._page42b,0.6,{scaleX:1,scaleY:1,ease:Back.easeOut,delay:0.5,onComplete:function(){
            self._page42b.addClass('scale-anim');
        }});
        TweenMax.to(self._page4Line,0.6,{alpha:1,delay:1});
        TweenMax.to(self._page4Head1,0.6,{scaleX:1,scaleY:1,ease:Back.easeOut,delay:1.6});
        TweenMax.to(self._page4Head2,0.6,{scaleX:1,scaleY:1,ease:Back.easeOut,delay:1.6});
        TweenMax.to(self._page4Head3,0.6,{scaleX:1,scaleY:1,ease:Back.easeOut,delay:2.8});
        TweenMax.to(self._page4Head4,0.6,{scaleX:1,scaleY:1,ease:Back.easeOut,delay:2.2});
        TweenMax.to(self._page4Head5,0.6,{scaleX:1,scaleY:1,ease:Back.easeOut,delay:2.2});
        
        TweenMax.to(self._page4Dianji,0.6,{alpha:1,delay:2.3});


    },
    onBtnEvent:function(e){
        var self = e.data.self;
        if(self._isTouch) return;
        e.stopPropagation();
        e.preventDefault();

        
        self._page42b.removeClass('scale-anim');

        TweenMax.to(self._page42b,0.6,{scaleX:0,scaleY:0,ease:Back.easeIn});
        TweenMax.to(self._page4Dianji,0.6,{alpha:0});

        TweenMax.to(self._page42b1,0.6,{scaleX:1,scaleY:1,alpha:1,delay:0.5});
        TweenMax.to(self._page42b2,0.6,{scaleX:1,scaleY:1,alpha:1,delay:0.7});
        TweenMax.to(self._page42b3,0.6,{scaleX:1,scaleY:1,alpha:1,delay:0.9});
        TweenMax.to(self._page42b4,0.6,{scaleX:1,scaleY:1,alpha:1,delay:1.1});
        TweenMax.to(self._page42b5,0.6,{scaleX:1,scaleY:1,alpha:1,delay:1.3});
        TweenMax.to(self._page44b,0.6,{scaleX:1,scaleY:1,alpha:1,delay:1.5,onComplete:function(){
                self._page4Fanye.addClass('left-move-anim');
                self._page4Fanye.css('display','block');   
                self._yejiao.css('display','block'); 
        }});
        self._isTouch = true;
    }
});

var PagePanel5 = BaseClass.extend({
    _page5Txt1:null,
    _page5Head1:null,
    _page5Txt2:null,
    _page5Head2:null,
    _page5Txt3:null,
    _page5Dajia:null,
    _page5Img1:null,
    _page5Head3:null,
    _page5Head4:null,
    _page5Wenhao1:null,
    _page5Wenhao2:null,
    _page5Vs:null,
    _page5Dianji1:null,
    _page5Dianji2:null,
    _page5Fanye:null,
    _yejiao:null,
    _isTouch:false,
    ctor:function(name_){
        var self = this;
        self._super(name_);
        self._page5Txt1 = self.view.find('.page5-txt1');
        self._page5Txt2 = self.view.find('.page5-txt2');
        self._page5Txt3 = self.view.find('.page5-txt3');

        self._page5Head1 = self.view.find('.page5-head1');
        self._page5Head2 = self.view.find('.page5-head2');

        self._page5Dajia = self.view.find('.page5-dajia');

        self._page5Img1 = self.view.find('.page5-img1');
        self._page5Head3 = self.view.find('.page5-head3');
        self._page5Head4 = self.view.find('.page5-head4');

        self._page5Wenhao1 = self.view.find('.page5-wenhao1');
        self._page5Wenhao2 = self.view.find('.page5-wenhao2');

        self._page5Vs = self.view.find('.page5-vs');
        self._page5Dianji1 = self.view.find('.page5-dianji1');
        self._page5Dianji2 = self.view.find('.page5-dianji2');

        self._page5Fanye = self.view.find('.page2-fanye');
        self._yejiao = self.view.find('.yejiao');

        self.view.bind(gb.events.TouchEnd,{self:self},self.onBtnEvent);

    },
    askToAdd:function(data_){
        var self = this;
        self._page5Dajia.css('display','none');
        self._page5Fanye.css('display','none');   
        self._yejiao.css('display','none'); 

        self._isTouch = false;

        TweenMax.set(self._page5Txt1,{alpha:0});
        TweenMax.set(self._page5Head1,{alpha:0});
        TweenMax.set(self._page5Txt2,{x:-30,alpha:0});
        TweenMax.set(self._page5Head2,{alpha:0});
        TweenMax.set(self._page5Txt3,{x:30,alpha:0});

        TweenMax.set(self._page5Img1,{alpha:0});
        TweenMax.set(self._page5Wenhao1,{alpha:0});
        TweenMax.set(self._page5Wenhao2,{alpha:0});
        TweenMax.set(self._page5Dianji1,{alpha:0});
        TweenMax.set(self._page5Dianji2,{alpha:0});

        TweenMax.set(self._page5Head3,{scaleX:0,scaleY:0});
        TweenMax.set(self._page5Head4,{scaleX:0,scaleY:0});

        TweenMax.set(self._page5Vs,{x:-50,alpha:0});

        self._super(data_);
        
    },
    askToRemove:function(data_){
        var self = this;
        self._page5Fanye.removeClass('left-move-anim');
        self._super(data_);
        

    },
    startAnimIn:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);
        //console.log('startAnimIn::',self.view.attr('id'));
    },
    startAnimOut:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);

        //console.log('startAnimOut::',self.view.attr('id'));
    },
    overAnimIn:function(){
        var self = this;
        self._super();
        //console.log('overAnimIn::',self.view.attr('id'));
        // self.overComplete();
    },
    overAnimOut:function(){
        var self = this;
        self._super();
        //console.log('overAnimOut::',self.view.attr('id'));
        // self.overComplete();
    },
    nextAnim:function(){
        var self = this;

        TweenMax.to(self._page5Txt1,0.6,{alpha:1});
        TweenMax.to(self._page5Head1,0.6,{alpha:1,delay:0.5});
        TweenMax.to(self._page5Txt2,0.6,{x:0,alpha:1,delay:1});
        TweenMax.to(self._page5Head2,0.6,{alpha:1,delay:1});
        TweenMax.to(self._page5Txt3,0.6,{x:0,alpha:1,delay:1.3,onComplete:function(){
            self._page5Dajia.css('display','block');
        }});

        TweenMax.to(self._page5Img1,0.6,{alpha:1,delay:1.5});
        TweenMax.to(self._page5Wenhao1,0.6,{alpha:1,delay:1.8,onComplete:function(){
            self._page5Wenhao1.addClass('rotate-anim');
        }});
        TweenMax.to(self._page5Wenhao2,0.6,{alpha:1,delay:1.8,onComplete:function(){
            self._page5Wenhao2.addClass('rotate-anim');
        }});
        TweenMax.to(self._page5Dianji1,0.6,{alpha:1,delay:2.1});
        TweenMax.to(self._page5Dianji2,0.6,{alpha:1,delay:2.1});

    },
    onBtnEvent:function(e){
        var self = e.data.self;
        if(self._isTouch) return;
        e.stopPropagation();
        e.preventDefault();

        self._page5Wenhao1.removeClass('rotate-anim');
        self._page5Wenhao2.removeClass('rotate-anim');

        TweenMax.killTweensOf(self._page5Wenhao1);
        TweenMax.killTweensOf(self._page5Wenhao2);

        TweenMax.to(self._page5Wenhao1,0.6,{scaleX:0,scaleY:0});
        TweenMax.to(self._page5Wenhao2,0.6,{scaleX:0,scaleY:0});
        TweenMax.to(self._page5Dianji1,0.6,{alpha:0});
        TweenMax.to(self._page5Dianji2,0.6,{alpha:0});

        TweenMax.to(self._page5Head3,0.6,{scaleX:1,scaleY:1});
        TweenMax.to(self._page5Head4,0.6,{scaleX:1,scaleY:1});

        TweenMax.to(self._page5Vs,0.6,{x:0,alpha:1,delay:0.3,onComplete:function(){
                self._page5Fanye.addClass('left-move-anim');
                self._page5Fanye.css('display','block');   
                self._yejiao.css('display','block'); 
        }});


        self._isTouch = true;
    }
});

var PagePanel6 = BaseClass.extend({
    _page6Img1:null,
    _page6Txt1:null,
    _page6Pople1:null,
    _page6Pople2:null,
    _page6Btn:null,
    _page6Logo:null,
    ctor:function(name_){
        var self = this;
        self._super(name_);

        self._page6Img1 = self.view.find('.page6-img1');
        self._page6Img2 = self.view.find('.page6-img2');
        self._page6Txt1 = self.view.find('.page6-txt1');
        self._page6Txt2 = self.view.find('.page6-txt2');
        self._page6Pople1 = self.view.find('.page6-pople1');
        self._page6Pople2 = self.view.find('.page6-pople2');

        self._page6Btn = self.view.find('.page6-btn');
        self._page6Logo = self.view.find('.page6-logo');

        self._page6Btn.bind(gb.events.TouchEnd,function(e){

            e.stopPropagation();
            e.preventDefault();

            window.location.href = 'wxmovie://filmdetail?movieid=5532';
        });


    },
    askToAdd:function(data_){
        var self = this;
        TweenMax.set(self._page6Img1,{alpha:0,y:-30});
        TweenMax.set(self._page6Txt1,{alpha:0});
        TweenMax.set(self._page6Txt2,{alpha:0});
        TweenMax.set(self._page6Pople1,{alpha:0,x:-30});
        TweenMax.set(self._page6Pople2,{alpha:0,x:30});
        TweenMax.set(self._page6Btn,{alpha:0});
        TweenMax.set(self._page6Logo,{alpha:0});
        TweenMax.set(self._page6Img2,{alpha:0});

        self._super(data_);
        
    },
    askToRemove:function(data_){
        var self = this;
        self._super(data_);
        

    },
    startAnimIn:function(){
        var self = this;
        self.view.css({'z-index':-1});
        self._super();
        setTimeout(function(){

            self.nextAnim();    
            self.view.css({'z-index':0});
        },600);
        //console.log('startAnimIn::',self.view.attr('id'));
    },
    startAnimOut:function(){
        var self = this;
        self._super();
        setTimeout(function(){
            self.nextAnim();    
        },600);

        //console.log('startAnimOut::',self.view.attr('id'));
    },
    overAnimIn:function(){
        var self = this;
        self.view.css({'z-index':100});
        setTimeout(function(){
            self.view.css({'z-index':0});
        },600);
        self._super();
        //console.log('overAnimIn::',self.view.attr('id'));
        // self.overComplete();
    },
    overAnimOut:function(){
        var self = this;
        self._super();
        //console.log('overAnimOut::',self.view.attr('id'));
        // self.overComplete();
    },
    nextAnim:function(){
        var self = this;

        TweenMax.to(self._page6Img1,0.6,{alpha:1,y:0});
        TweenMax.to(self._page6Txt1,0.6,{alpha:1,delay:0.3});
        TweenMax.to(self._page6Txt2,0.6,{alpha:1,delay:0.9});
        TweenMax.to(self._page6Pople1,0.6,{alpha:1,x:0,delay:0.9});
        TweenMax.to(self._page6Pople2,0.6,{alpha:1,x:0,delay:0.9});
        TweenMax.to(self._page6Btn,0.6,{alpha:1,delay:1.4,onComplete:function(){
            self._page6Btn.addClass('scale-anim');
        }});
        TweenMax.to(self._page6Logo,0.6,{alpha:1,delay:1.4});
        TweenMax.to(self._page6Img2,0.6,{alpha:1,delay:1.4});

    }
});



/* ------------------------------------------------IndexPanel end */

var PublicPanel = gb.classes.Class.extend({
    ctor:function(){
        var self = this;

        var _currentPointX = 0;
        $(document).bind(gb.events.TouchStart,function(e){
            e.stopPropagation();
            e.preventDefault();
            
            _currentPointX = e.changedTouches[0].pageX;
            
        });
        $(document).bind(gb.events.TouchMove,function(e){
            e.stopPropagation();
            e.preventDefault();
            
            
            
        });
        $(document).bind(gb.events.TouchEnd,function(e){

            e.stopPropagation();
            e.preventDefault();
            
            var pointx = e.changedTouches[0].pageX;
            if(Math.abs(_currentPointX - pointx) < 50) return;
            if(_currentPointX > pointx){
                
                app.nextPage();
                // console.log(2222);              
            }else{
                
                app.prevPage();  
                // console.log(1111);              

            }
        });

        $('.music').bind(gb.events.TouchEnd,function(e){

            e.stopPropagation();
            e.preventDefault();
            if(app.isPlaying) return;

            if(SoundManage.isOn){
                SoundManage.isOn = false;
                $(this).find('img').attr('src','img/music-off.png');

                if(SoundManage.name != ''){
                    SoundManage.stopSound(SoundManage.name);
                }
                

            }else{

                SoundManage.isOn = true;
                
                $(this).find('img').attr('src','img/music-on.png');
                if(SoundManage.name != ''){
                    SoundManage.playSound(SoundManage.name);    
                }
                
            }
        });
        
    }
});

/* ------------------------------------------------初始化配置 start */

(function () {


    config = {
        panels: {

            loading: {
                id:''
            },
            index:{
                html:'html/indexpage.html'  
            },
            panel2:{
                html:'html/panel2.html'  
            },
            panel3:{
                html:'html/panel3.html'  
            },
            panel4:{
                html:'html/panel4.html'  
            },
            panel5:{
                html:'html/panel5.html'  
            },
            panel6:{
                html:'html/panel6.html'  
            }
        }
    };


    function initView() {
        // gb.events.removeHandler(window, 'load', initView);
        gb.events.removeHandler(document, 'DOMContentLoaded', initView);


        initViewDom();
        // var domwidth = document.documentElement.clientWidth;
        // var domheight = document.documentElement.clientHeight;
        // alert(domwidth+'--'+domheight);

        app = {
            site:null,
            _getPanel:null,
            pageArr:['index','panel2','panel3','panel4','panel5','panel6'],
            panelFunArr:null,
            currentPage:'',
            currentId:-1,
            prevPageId:-1,
            totalNums:0,
            isHtml:false,
            isImage:false,
            init:function(){

                app._getPanel = [];
                this.panelFunArr = [];

                var loading = new Loading('loading',app.loadImageComplete);
                loading.askToAdd();
                // var publicpanel = new PublicPanel();
                app.setPanel('loading',loading);
                // app.setPanel('public',publicpanel);
                
                this.panelFunArr['index'] = IndexPanel;
                this.panelFunArr['panel2'] = PagePanel2;
                this.panelFunArr['panel3'] = PagePanel3;
                this.panelFunArr['panel4'] = PagePanel4;
                this.panelFunArr['panel5'] = PagePanel5;
                this.panelFunArr['panel6'] = PagePanel6;

                app.totalNums = app.pageArr.length;


                // wxapp.addPro(function(percent){
                //     // var percent = Math.round((e.completedCount / e.totalCount) * 100);
                //     loading.onProgress(percent);
                //     console.log("当前加载了", percent, "%");
                // });

                // wxapp.addCom(function(){
                //     loading.onComplete();
                //     console.log("当前加载了100%");
                // });

                gb.ImageLoader.load({
                    images: wxapp.fileList,
                    thread: 1,
                    onUpdate: function(percent, counter, total) {
                        // var percent = Math.round( e.target.progress * 100);
                        loading.onProgress(percent);

                        // console.log(percent, counter, total);
                        
                    },
                    onComplete: function () {
                        loading.onComplete();
                    }
                });

            },
            setPanel:function(param_,class_){
                app._getPanel[param_] = class_;
            },
            getPanel:function(param_){
                return app._getPanel[param_];
            },
            loadHtmlComplete:function(){
                
                app.isHtml = true;
                app.loadComplete();
            },
            loadImageComplete:function(){

                app.isImage = true;
                app.loadComplete();
            },
            loadComplete:function(){
                
                if(app.isHtml && app.isImage){
                    app.site.interHtml();
                    var loading = app.getPanel('loading');
                    loading.askToRemove();

                    app.initPage();
                    
                }
            },            
            initPage:function(){

                var publicpanel = new PublicPanel();
                app.setPanel('public',publicpanel);

                this.nextPage();
                this.nextLoad();
            },
            nextPage:function(){
                app.prevPageId = app.currentId;
                app.currentId++;

                var len = app.pageArr.length;
                if(app.currentId >= len){
                    app.currentId = 0;
                    // return;
                }
                app.currentPage = app.pageArr[app.currentId];

                app._direction = 2;

                if(app.prevPageId != -1){

                    var prevPanel = app.getPanel( app.pageArr[app.prevPageId] );
                    
                    if(!prevPanel){
                        app.panelCallBack();
                    }else{
                        prevPanel.askToRemove({type:2,callBack:app.panelCallBack});
                    }

                }else if(app.prevPageId == -1){

                    app.panelCallBack();
                }

            },
            prevPage:function(){
                app.prevPageId = app.currentId;
                app.currentId--;
                if(app.currentId == -1){
                    app.currentId = 0;
                    return;
                }

                app.currentPage = app.pageArr[app.currentId];
                app._direction = 1;

                if(app.prevPageId != -1){

                    var prevPanel = app.getPanel( app.pageArr[app.prevPageId] );
                    prevPanel.askToRemove({type:1,callBack:app.panelCallBack});

                }

            },
            gotoPage:function(param_){

                app.prevPageId = app.currentId;
                app.currentId = param_;

                // if(app.currentId == -1){
                //     app.currentId = 0;
                //     return;
                // }

                app.currentPage = app.pageArr[app.currentId];

                if(app.prevPageId > app.currentId){

                    app._direction = 1;

                }else if(app.prevPageId < app.currentId){

                    app._direction = 2;

                }

                if(app.prevPageId != -1){

                    var prevPanel = app.getPanel( app.pageArr[app.prevPageId] );
                    prevPanel.askToRemove({type:1,callBack:app.panelCallBack});

                }
            },
            panelCallBack:function(){
                
                var panel = app.getPanel( app.pageArr[app.currentId] );
                
                if(!panel){

                    panel = new app.panelFunArr[ app.pageArr[app.currentId] ]( app.pageArr[app.currentId] );
                    app.setPanel(app.pageArr[app.currentId],panel);
                    
                }

                panel.askToAdd({type:app._direction});

            },
            nextLoad:function(){
                gb.ImageLoader.load({
                    images: wxapp.fileList2,
                    thread: 1,
                    onUpdate: function(percent, counter, total) {
                        

                        // console.log(percent, counter, total);
                        
                    },
                    onComplete: function () {
                        // console.log('load::');
                    }
                });
            }
        };
        
        app.site = new SitePanel(config,'minisite',app.loadHtmlComplete);
        SoundManage.init();
        app.init();



    };

    function initViewDom()
    {
        // gb.events.removeHandler(document, 'DOMContentLoaded', initViewDom);

        var DEFAULT_WIDTH = 640, // 页面的默认宽度
            ua = navigator.userAgent.toLowerCase(), // 根据 user agent 的信息获取浏览器信息
            deviceWidth = window.screen.width, // 设备的宽度
            devicePixelRatio = window.devicePixelRatio || 1, // 物理像素和设备独立像素的比例，默认为1
            targetDensitydpi;

        

        function onResize()
        {
            var domwidth = document.documentElement.clientWidth;
            var domheight = document.documentElement.clientHeight;
            var scale = Math.max(domwidth/640,domheight/1009);
            var width = 640*scale;
            var height = 1009*scale;

            TweenLite.set($('#minisite'),{scaleX:scale,scaleY:scale});
            $('#minisite').css({left:-(width-domwidth)/2,top:-(height-domheight)/2});
            // alert(domwidth+'--'+domheight);
        }

        $(window).resize(onResize);
        onResize();



        if(gb.browser.getUserAgent().android && gb.browser.browser() != 'Chrome' && gb.browser.browser() != 'UC' && gb.browser.browser() != 'Firefox'){
            targetDensitydpi = DEFAULT_WIDTH / deviceWidth * devicePixelRatio * 160;
            $('meta[name="viewport"]').attr('content', 'target-densitydpi=' + targetDensitydpi + ', width=device-width, user-scalable=no');
        }

    }

    

    // gb.events.addHandler(window, 'load', initView);
    gb.events.addHandler(document, 'DOMContentLoaded', initView);

})();

/* ------------------------------------------------初始化配置 end */

