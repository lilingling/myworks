// 
左侧条目与编辑框的关联
	增、删、改
	共同点：
		2、条目内容对应编辑框内容
		3、实时展示

	不通点：
		增加的时候，编辑框置空
		修改，对应条目内容
		删除，没有编辑框

/**
	type: 操作类型
		1. 增加
		2. 删除
		3. 改动
	id: 对应条目

 */
var a = {
	'a': 1,
	'b': 2,
	'c': 3
	'item-1': 4
}



var start = 0;
var cacheContent = {
	'item-1': {
		'title': 'lljkljk',
		'author': 'aldkjlakj',
		'photo': 'url',
		'summary': 'blabalbal',
		'details': 'lkjlkjlkjlkj'
	}
};
// window.localStorage.setItem('cacheContent', cacheContent )
// 增加条目
additem.on('click', function( e ){
	start += 1;
	renderItem( start, 1 );
})

// 修改
edititem.on('click', function( e ){
	var id = target.attr('id').split('-')[1];
	renderItem( id, 3 );
})

function renderItem( start, type ){
	<div id="item-" + start></div>

	showEditor( type, start)
}

function showEditor( type, id ){
	// 编辑器
	var $editorBox = $("#editor");
	// dom元素存起来
	var $editorModal = {
		'$title': $editorBox.find(".title"),
		'$author': $editorBox.find(".author")
	}

	if( type == 1 ){
		renderEditor();
		bindInput();
	} else if( type == 2){
		removeEditor();
	} else if( type == 3 ){
		renderEditor();
		fillEditor( id );
		bindInput();
	}

	// 渲染框容器
	function renderEditor(){
		// 显示出来
		// 移动到对应的位置
		// 清空内容
		emptyEditor();
	}

	// 清空
	function emptyEditor(){
		$editorBox.find('.typebox').val('');
	}

	// 管理内容
	function fillEditor( id ){
		// 从缓存拿内容
		// 'item-1': {
		// 	'title': 'lljkljk',
		// 	'author': 'aldkjlakj',
		// 	'photo': 'url',
		// 	'summary': 'blabalbal',
		// 	'details': 'lkjlkjlkjlkj'
		// }
		var currentItem = cacheContent[ 'item-' + id ]
		$editorModal.$title.val( currentItem.title )
		$editorModal.$title.val( currentItem.author )
		$editorModal.$title.val( currentItem.title )
		$editorModal.$title.val( currentItem.title )
		$editorModal.$title.val( currentItem.title )
	}

	// 删除
	function removeEditor(){
		// 需要考虑删除后的定位问题
		// 最简单就是隐藏

	}

	// 绑定输入事件
	function bindInput(){
		// 写了之后左边显示
		var idText = '#item-' + id;
		var $wrapper = $( idText );
		var $title = $wrapper.find('.title-box');
		if( !cacheContent[idText] ){
			cacheContent[idText] = {}
		}
		cacheItem = cacheContent[idText];

		$('title').keyup(function(){
			$title = $( this ).val();
			cacheItem.title = $title;
		})
		// ...
	}
}

