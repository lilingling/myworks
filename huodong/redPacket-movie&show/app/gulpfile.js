var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jademodule = require('jade');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var connect = require('gulp-connect');


/**********************************
 *
 * 编译jade模板
 *
**********************************/
gulp.task('jade',function(){
	var YOUR_LOCALS = {};
	gulp.src('./src/*.jade')
		.pipe(jade({
			locals: YOUR_LOCALS
		}))
		.pipe(gulp.dest('./dist/'))
});

/**********************************
 *
 * 编译css
 *
**********************************/
gulp.task('sass',function(){
	gulp.src('./src/css/*.scss')
		.pipe(sass())
		// .pipe(importCss())
		.pipe(gulp.dest('./dist/css'));
});


/**********************************
 *
 * 合并、压缩js文件
 *
**********************************/
gulp.task('scripts',function(){
	 var src = './src/js/',
        jsArr = ['zepto.js',
								'wx.js',
								'wxbridge.js',
                'app.js']; //请按文件引入顺序存放
        for (var i=0,len=jsArr.length; i<len; i++) {
            jsArr[i] = src + jsArr[i];
        }
        console.log(jsArr);

    gulp.src(jsArr)
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('./dist/js'));
});


/**********************************
 *
 * 压缩图片
 *
**********************************/
gulp.task('tinypng',function(){
	gulp.src('./src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images'));
});


/**********************************
 *
 * 搭建本地服务器访问
 *
**********************************/
gulp.task('webserver',function(){
  connect.server({
    livereload: true,
    root: [ 'dist' ],
    port: 8081
    // host: 'lingling.dev'
  })
});
/**********************************
 *
 * 监视
 *
**********************************/
gulp.task('default', ['jade','sass','tinypng','scripts','webserver'], function() {
      gulp.watch('./src/*.jade', ['jade']);
      gulp.watch('./src/css/*.scss',['sass']);
      gulp.watch('./src/js/*.js',['scripts']);
      gulp.watch('./src/images/*',['tinypng']);

});
