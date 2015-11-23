
/* File: gulpfile.js */

// Grab Gulp Essentials
var gulp  = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

// CSS Build Libraries
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');

// Javscript Build Dependencies
var fs = require('fs');
var watchify = require('watchify');
var browserify = require('gulp-browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var assign = require('lodash.assign');

// CONSTANT PATHS
var PATH =  {
	scss_src: './assets/scss/**/*.scss',
	js_src: './app/js/app.js',
	js_dist: './public/scripts/'
}

//  CSS TASKS
gulp.task('css-build', function () {
  gulp.src(PATH.scss_src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concatCss("./main.css"))
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch(PATH.scss_src, ['css-build']);
});

