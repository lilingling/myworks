var gulp = require('gulp'),
	jade = require('gulp-jade');
	concat = require('gulp-concat');
	uglify = require('gulp-uglify');
	rename = require('gulp-rename');
	jshint = require('gulp-jshint');

gulp.task('default',function (){
	gulp.run('templates', 'scripts');
	gulp.watch('./static/script/*.js', function(){
        gulp.run('scripts');
    });
});
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
  gulp.src('./views/pages/home.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./static/'))
});
gulp.task('scripts',function(){
  	return gulp.src(['./static/script/zepto.min.js', './static/script/wx.js','./static/script/wxbridge.js','./static/script/index.js','./static/script/share_analytics.js',])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./static/dist/'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
	.pipe(gulp.dest('./static/dist/'))
});


