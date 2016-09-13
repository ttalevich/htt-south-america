var gulp = require('gulp');
var sass = require('gulp-sass');
var broswerify = require('browserify');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');


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

gulp.task('browserSync', function(){
	browserSync.init({
		port: 5000,
		
		proxy: {
			target: 'localhost:5000',
			ws: true
		},
		
		ui: {
			port: 8080
		}
	})
});


gulp.task('sass', function(){
	return gulp.src('css/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./_site/css'))
		.pipe(browserSync.stream());
});

gulp.task('js'), function() {
	return gulp.src('js/**/*.js')
		//.pipe(uglify())
		.pipe(browserify())
		.pipe(gulp.dest('_site/js'))
}

gulp.task('bStream', function (done){
	 browserSync.reload();
   done();
});

// watchers
//gulp.task('watch', ['sass', 'jekyll', 'browserSync'], function(){
//	gulp.watch('css/**/*.scss', ['sass']);
//	gulp.watch('js/**/*.js', ['js']);
////	gulp.watch('*/**/.html'), ['sass'];
////	gulp.watch('_site/**/*.html').on('change', browserSync.reload);
////	gulp.watch('_site/js/**/.js').on('change', browserSync.reload);
//	// OTHER WATCHERS
//});

gulp.task('watch', function(){
	gulp.watch('css/**/*.scss', ['sass']);
	gulp.watch('js/**/*.js', ['js']);
//	gulp.watch('*/**/.html'), ['sass'];
//	gulp.watch('_site/**/*.html').on('change', browserSync.reload);
//	gulp.watch('_site/js/**/.js').on('change', browserSync.reload);
	// OTHER WATCHERS
});

/*gulp.task('jekyll-watch', ['jekyll'], function(){
	gulp.watch('', ['jekyll']);
});*/



// main task
// gulp.task('default', ['watch', 'jekyll', 'sass', 'browserSync']);
gulp.task('default', function() {
	runSequence(
		'jekyll',
		['js', 'sass'],
		'browserSync'
	);
});
