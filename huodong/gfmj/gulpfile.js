var gulp = require('gulp');

gulp.task('default', ['sass', 'js', 'jade', 'images'], function(){
	gulp.watch('./src/stylesheets/style.scss', ['sass']);
	gulp.watch('./src/javascripts/*.js', ['js']);
	gulp.watch('./src/index.jade', ['jade']);
	gulp.watch('./src/images/*', ['images']);
});

gulp.task('sass', function(){
	var sass = require('gulp-ruby-sass');
	var autoprefixer = require('gulp-autoprefixer');
	var sourcemaps = require('gulp-sourcemaps');
	return sass('./src/stylesheets/style.scss', {
		sourcemap: true
	})
	    .on('error', function(err) {
	      console.error('error', err.message);
	    })
	    .pipe(autoprefixer())
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest('./dist/stylesheets/'));
});

gulp.task('js', function(){
	return gulp.src('./src/javascripts/*.js')
			.pipe(gulp.dest('./dist/javascripts/'));
});

gulp.task('jade', function(){
	var jade   = require('gulp-jade');
	gulp.src('./src/index.jade')
	.pipe(jade({
      // locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('images', function(){
	gulp.src('./src/images/*')
		.pipe(gulp.dest('./dist/images/'));
});

gulp.task('imagemin', function() {
  var imagemin = require('gulp-imagemin');
  var pngquant = require('imagemin-pngquant');
  return gulp.src('./src/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/images/'));
});