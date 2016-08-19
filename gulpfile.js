var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Jekyll gulp config by aaronlasseigne.com
const child = require('child_process');
const gutil = require('gulp-util');

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

// tasks
gulp.task('sass', function(){
	return gulp.src('css/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('_site/css'))
		.pipe(browserSync.reload({
			stream: true
	}))
});

gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: '_site'
		},
	})
});

// watchers
gulp.task('watch', ['browserSync', 'jekyll', 'sass'], function(){
	gulp.watch('css/**/*.scss', ['sass']);
	gulp.watch('_site/**/.html', browserSync.reload);
	gulp.watch('_site/js/**/.js', browserSync.reload);
	// OTHER WATCHERS
});

/*gulp.task('jekyll-watch', ['jekyll'], function(){
	gulp.watch('', ['jekyll']);
});*/

// main task
gulp.task('build', ['jekyll', 'watch']);
