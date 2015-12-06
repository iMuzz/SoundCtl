
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
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

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
  gulp.watch('./app/reactApp/**/*.jsx', ['js-build']);
});

gulp.task('js-build', function () {
  return browserify({entries: './app/reactApp/main.jsx', extensions: ['.jsx'], debug: true})
      .transform(babelify, {presets: ["es2015", "react"]})
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/scripts/dist'));
});