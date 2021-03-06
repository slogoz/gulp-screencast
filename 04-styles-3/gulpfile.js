'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {

  return gulp.src('frontend/styles/main.styl')
      .pipe(gulpIf(isDevelopment, sourcemaps.init()))
      .pipe(stylus())
      .pipe(gulpIf(isDevelopment, sourcemaps.write()))
      .pipe(gulp.dest('public'));

});

gulp.task('clean', function() {
  return del('public');
});

gulp.task('assets', function() {
  return gulp.src('frontend/assets/**')
      .pipe(gulp.dest('public'));
});


gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'assets'))
);
