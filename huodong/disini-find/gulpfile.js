var gulp = require('gulp');
var sass = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');


//压缩css任务
gulp.task('sass', function() {
    return gulp.src('./styles/style.css')      //压缩的文件
        .pipe(sass())  //执行压缩
        .pipe(gulp.dest('./dist/css/'));   //输出文件夹
});

//压缩js
gulp.task('uglifyjs', function(){
	var src = './scripts/',
		jsArr = ['zepto.js',
        'wx.js',
        'wxbridge.js',
				'index.js']; //请按文件引入顺序存放
		for (var i=0,len=jsArr.length; i<len; i++) {
			jsArr[i] = src + jsArr[i];
		}
		console.log(jsArr);

	gulp.src(jsArr)
      .pipe(uglify())
      .pipe(concat('all.js'))
      // .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/scripts/'));
});
//压缩图片
gulp.task('imagemin', function() {
	return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images/'));
});
//生成html文档
gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe(gulp.dest('dist/'));
});

//初始化并监听
gulp.task('default', ['sass', 'imagemin','html', 'uglifyjs'], function() {
	livereload.listen({port: 3002});
  	// gulp.watch(['./src/*.html', './css/*.css'], ['html']);
  	// gulp.watch('./src/css/*.scss', ['sass']);
  	// gulp.watch('./src/javascripts/*.js', ['uglifyjs']);
});