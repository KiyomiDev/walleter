const livereload = require("gulp-livereload");
const gulp = require("gulp");
// gulp plugin to minify HTML.
const htmlmin = require("gulp-htmlmin");
// gulp plugin to minify CSS, using clean-css
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
//  to cancat files
const concat = require('gulp-concat');
// Enabling you to compile your Pug templates into HTML
const pug = require('gulp-pug');
// To show file name in chrome
const sourcemaps = require('gulp-sourcemaps');
// to reduce reload pages
const cache = require('gulp-cached');
// minify javascript
const terser = require('gulp-terser');
const autoprefixer = require('gulp-autoprefixer');



function pugToHTML() {
  return gulp
    .src(["src/**/*.pug", "!src/components/*.pug"])
    .pipe( pug({ pretty: true}))
    .pipe(cache('linting'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
}


function moveCss() {
  return gulp
    .src(["src/sass/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(cache('linting'))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
}


function minifyJs() {
  return gulp
  .src('src/**/*.js')
  .pipe(terser())
  .pipe(cache('linting'))
  .pipe(gulp.dest('dist'))
  .pipe(livereload());
}


exports.default = function () {
  require("./server.js");
  livereload.listen();
  gulp.watch("src/**/*.pug", pugToHTML);
  gulp.watch("src/**/*.scss", moveCss);
  gulp.watch("src/**/*.js", minifyJs);
};
