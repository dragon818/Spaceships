const {src, watch, dest, parallel} = require('gulp');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
// const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const imgmin = require('gulp-imagemin');

function watcher () {
  watch('./src/images/**/*.png', copyimg)
  watch('./src/index.html', copyhtml)
  watch('./src/js/**/*.js', minjs)
  watch('./src/css/**/*.css', style)
}

function copyhtml () {
  return src('./src/index.html')
  .pipe(dest('./dest/'))
  // .pipe(browserSync.stream());
}

function style () {
  return src('./src/css/**/*.css')
  .pipe(autoprefixer({
    browsers:['last 2 versions']
  }))
  .pipe(cleanCss())
  .pipe(dest('./dest/css'))
  // .pipe(browserSync.stream());
}

function copyimg () {
  return src('./src/images/**/*')
  .pipe(imgmin())
  .pipe(dest('./dest/images'))
  // .pipe(browserSync.stream());
}

function minjs () {
  return src('./src/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(dest('./dest/js'))
  // .pipe(browserSync.stream());
}

exports.style = style;
exports.copyimg = copyimg;
exports.watcher = watcher;
exports.minjs = minjs;
exports.copyhtml = copyhtml;

exports.all = parallel(watcher, style, copyimg, minjs, copyhtml);