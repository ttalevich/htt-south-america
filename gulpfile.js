var gulp = require('gulp');
var shell = require('gulp-shell');
var browserSync = require('browser-sync').create();
var css = require('gulp-clean-css');
var js = require('gulp-uglify');
var imgCompress = require('gulp-imagemin');
var autoprefix = require('gulp-autoprefixer');
var cache = require('gulp-cache');
var notify = require('gulp-notify');
var rename = require('gulp-rename');

// Task for building blog when something changed:
gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
// gulp.task('build', shell.task(['jekyll build --watch']));

// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});


// Task for finalizing site
gulp.task('styles', function() {
	return gulp.src('_site/css/**/*.css', {base: '_site'})
		.pipe(autoprefix('last 2 version'))
		.pipe(css({compatibility: 'ie8'}))
		.pipe(gulp.dest('_site/css/'));
});

gulp.task('script', function() {
	return gulp.src('_site/js/*.js')
		.pipe(js());
});

gulp.task('compress', function() {
	return gulp.src('_site/**/*.{jpg,png}')
		.pipe(cache(imgCompress()));
});

gulp.task('deploy', ['styles', 'script', 'compress']);

gulp.task('default', ['build', 'serve']);