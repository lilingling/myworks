(function (window) {
//Start

console.log('Hello World!');
/** Utils **/
window.Utils = {
    'queryHref' : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!==null) {
            return unescape(r[2]);
        } else {
            return null;
        }
    }
};

/**
 * 图片预加载并显示进度
 * loading
 * IIFE
 */
var loading = (function(){
    $( '.icon-process' ).html( '0%' );
    var loadCount = 0,
        preLoadImgs = eventsConfig.preLoadImgs,
        len = preLoadImgs.length;
    if( len < 2 ){
        $( '.mask_loading' ).css('opacity', 0 ).hide();
        return;
    }
    $.each( preLoadImgs, function( index, item ){
        var fakeImg = new Image();
        fakeImg.src = item;
        fakeImg.onerror = function(){
            loadSuccess();
        }
        function loadSuccess(){
            var percent = parseInt( ( loadCount/len ).toFixed( 2 ) * 100 );
            loadCount ++;
            $( '.icon-process' ).html( percent + '%' );
            if( loadCount === len ){
                $( '.icon-process' ).html( 100 + '%' );
                setTimeout(function(){
                	$( '.mask_loading' ).css('opacity', 0 ).hide();
                }, 200);
            }
        }
        fakeImg.onload = loadSuccess;
    })
})();

//End
}(this));
