var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
// var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cache = require('gulp-cache');

//处理sass任务
gulp.task('sass', function() {
	return sass('./src/css/style.scss', {sourcemap: true})
	  .on('error', function(err) { //当错误时抛出错误信息
	  	console.error('error', err.message);
	  })
	  .pipe(autoprefixer())
	  // .pipe(sourcemaps.write())
	  .pipe(gulp.dest('./dist/css/'));
});

//压缩js
gulp.task('uglifyjs', function(){
	var src = './src/javascripts/',
		jsArr = ['zepto.min.js',
				'zepto.fullpage.js',
				'wx.js',
				'wxbridge.js',
				'iscroll.js',
				'app.js']; //请按文件引入顺序存放
		for (var i=0,len=jsArr.length; i<len; i++) {
			jsArr[i] = src + jsArr[i];
		}
		console.log(jsArr);

	gulp.src(jsArr)
      .pipe(uglify())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/javascripts/'));
});

//压缩图片
gulp.task('imagemin', function() {
	return gulp.src('./src/images/*')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/images/'));
});

//生成html文档
gulp.task('html', function() {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('dist/'));
});

//清空缓存
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

//初始化并监听
gulp.task('default', ['sass', 'imagemin', 'html', 'uglifyjs'], function() {
	// livereload.listen({port: 3002});
  	gulp.watch(['./src/*.html', './src/css/*.css'], ['html']);
  	gulp.watch('./src/css/*.scss', ['sass']);
  	gulp.watch('./src/javascripts/*.js', ['uglifyjs']);
});