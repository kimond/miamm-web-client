var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');



// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('app/assets/scss/*.scss')
  .pipe(sass())
  .pipe(connect.reload())
  .pipe(gulp.dest('app/assets/css'));
});

gulp.task('connect', function() {
  connect.server({
    root:'app',
    livereload: true
  });
});

gulp.task('watch', function() {

  gulp.watch('app/assets/scss/*.scss', ['sass']);

});

// Default Task
gulp.task('default', ['sass','connect','watch']);
