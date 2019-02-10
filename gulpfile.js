const gulp = require('gulp');
const uglify = require("gulp-uglify");
const rename = require('gulp-rename');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('uglifyJS', () => {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', () => {
  return gulp.src('./src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});
 
gulp.task('sass:watch', () => {
  gulp.watch('./src/sass/*.sass', ['sass']);
});

// Default task
gulp.task('default', gulp.series('uglifyJS'));