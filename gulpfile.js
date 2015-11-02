
/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp');
var gutil = require('gulp-util');

// CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
// var sourcemaps = require('gulp-sourcemaps');

// CONSTANT PATHS
var PATH =  {
	scss: './assets/scss/**/*.scss'
}

gulp.task('css-build', function () {
  gulp.src(PATH.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concatCss("./main.css"))
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch(PATH.scss, ['css-build']);
});