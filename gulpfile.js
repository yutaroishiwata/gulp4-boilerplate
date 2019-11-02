"use strict";

// Load plugins
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const csscomb = require('csscomb');
const order = require('gulp-order');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const htmlhint = require('gulp-htmlhint');
const sasslint = require('stylelint-scss');
const eslint = require('gulp-eslint');
const browsersync = require('browser-sync').create();
const del = require('del');
const prettify = require('gulp-prettify');
const replace = require('gulp-replace');

// Paths
const paths = {
  input: '_src/',
  output: 'dist/',
  markups: {
    src: './_src/pug/**/*.pug',
    module: './_src/pug/**/_*.pug',
    dest: './dist/',
  },
  styles: {
    src: './_src/sass/**/*.s+(a|c)ss',
    component: './_src/sass/**/_*.s+(a|c)ss',
    dest: './dist/css',
    map: './dist/css/maps',
  },
  scripts: {
    src: './_src/js/**/*.js',
    dest: './dist/js',
    map: './dist/js/maps',
    core: '_src/js/core/**/*.js',
    app: '_src/js/app/**/*.js',
  },
  images: {
    src: './_src/img/**/*.{jpg,jpeg,png,svg,gif}',
    dest: './dist/img/',
  },
};

// HTML
function html() {
  return gulp
  .src([paths.markups.src, '!' + paths.markups.module])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(pug({pretty: '\t', doctype: 'html'}))
    .pipe(gulp.dest(paths.markups.dest));
}

// CSS
function css() {
  return gulp
    .src([paths.styles.src, '!' + paths.styles.component])
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest(paths.styles.dest, { sourcemaps: './maps' }));
}

// JS
function js() {
  return gulp
    .src(paths.scripts.src, { sourcemaps: true })
    .pipe(order([paths.scripts.core, paths.scripts.app], { base: './' }))
    .pipe(babel({presets: ['@babel/env'],}))
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min',}))
    .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: './maps' }));
}

// Optimize Images
function img() {
  return gulp
    .src(paths.images.src, { since: gulp.lastRun(img),})
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest(paths.images.dest));
}

const imageminOption = [
  pngquant({
    quality: [0.7, 0.85],
  }),
  mozjpeg({
    quality: 85,
  }),
  imagemin.gifsicle(),
  imagemin.jpegtran(),
  imagemin.optipng(),
  imagemin.svgo({
    removeViewBox: false,
  }),
];


// HTML Lint
function htmlLint() {
  return gulp
    .src(paths.markups.src)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
}

//SASS Lint
function sassLint() {
  return gulp
    .src(paths.styles.src)
    .pipe(sassLint({config: '.stylelintrc.json'}));
}

// ESLint
function esLint() {
  return gulp
    .src([paths.scripts.src, '!./src/js/core/**/*.js'])
    .pipe(
      eslint({
        useEslintrc: true,
        fix: true,
      }),
    )
    .pipe(eslint.format())
 }

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: paths.output
    },
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Watch files
function watchFiles(done) {
  gulp.watch(paths.markups.src).on('change', gulp.series(html, browserSyncReload));
  gulp.watch(paths.styles.src).on('change', gulp.series(css, browserSyncReload));
  gulp.watch(paths.scripts.src).on('change', gulp.series(js, browserSyncReload));
  gulp.watch(paths.images.src).on('change', gulp.series(img, browserSyncReload));
}

// define complex tasks
const build = gulp.series(browserSync, gulp.parallel(html, css, js, img));
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.htmlLint = htmlLint;
exports.sassLint = sassLint;
exports.esLint = esLint;
exports.watch = watch;
exports.default = build;
