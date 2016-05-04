
var massMessage = {
    rightForm:$('#rightForm'),
    templateItem:$('.templateItem'),
    templateEdit:$('.templateEdit'),
    index:this.getIndex(),
    getIndex:function(){
        var index = $(".msgItem:not(.templateItem)").length-1;
        return index;
    },
    currentEditor = $('.main:not(.templateEdit)').eq(index),
    uploadImg:function(){
        rightForm.delegate('.fileInput', 'change', function(e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            var formData = new FormData();
            var files = $(this)[0].files;
            if(files){
                formData.append('fileInput', files[0]);
            }else{
                alert('(╯‵□′)╯︵┻━┻ 请至少选个图片啊......');
                return;
            }
            var msg_id = $('#msg_id').val();
            var url = '';
            if(msg_id && msg_id != ''){
                //update
                url = '/admin/api/mass/fileUpdate';
            }else{
                //insert
                url = '/admin/api/mass/fileInsert';
            }
            $.ajax({
                url: url,
                data: formData,
                headers: {
                    'X-CSRF-Token': csrfKey
                },
                type: 'POST',
                dataType: 'json',
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.ret == 0) {
                        alert(res.msg);
                        $('#cover').attr('src', res.msg);
                        $('#msg_id').val(res.id);
                        $('#coverMask').css('display', 'block');
                    } else {
                        alert('(╯‵□′)╯︵┻━┻ 失败......');
                    }
                }
            });
        });
    },
    addMsgItem:function(){
        var $item = "<div id='' class='msgItem'>"+this.templateItem.html()+"</div>";
        var $edit = "<section id='' class='main'>"+this.templateEdit.html()+"</section>";
        $('#msgPrivew').append($item);
        $('.matMsg').append($edit);
        var top = (this.index-1) * 100+150;
        this.currentEditor.show();
        this.currentEditor.find('.inner').css('margin-top',top);
        this.currentEditor.siblings(".main").hide();
           
    },
    countChar:function(name){
        var $name = $('.'+name).eq(this.index);
        var char_num = 0,title_num = 0,author_num = 0;
        $name.on('keyup',function(){
            var char_num = (name == 'title-input')?++title_num:++author_num;
            var $char_num = $('.'+name+'+.item'+'>.char_number');
            var $item = $('.'+name+'+.item');
            $char_num.text(char_num);
            var maxCharNum = (name == 'title-input')?64:8;
            if(char_num >maxCharNum){
                $item.css('color','#f87171');
            };
        
        });
    },
    showInfo:function(){
        var _this = this;
        $('.matMsg').delegate('.title-input','keydown',function(){
                
                console.log('index'+_this.index);
                var title_value = $('.title-input').eq(index).val();
                console.log('title_value'+$('.title-input'));
                $('.msgItem').eq(index).find('h4').text(title_value);

        });
    }

};
var mss = massMessage;
$('.matMsg').delegate('.title-input','keydown',function(){
    mss.showInfo();
});
$('#addMsg').on('click',function(){
    mss.addMsgItem;
    var item_len = $('#msgPrivew .msgItem').length;
    if(item_len >8){
        alert('最多只能添加8条！');
        $(this).off();
    };
});
// 鼠标滑过弹层显示
$('#msgPrivew').delegate('.msgItem','mouseenter',function(){
    $(this).find('.editMask').show();
});
$('#msgPrivew').delegate('.msgItem','mouseleave',function(){
    $(this).find('.editMask').hide();
});