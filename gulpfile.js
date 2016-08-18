var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
//Minification
var uglify = require('gulp-uglify');
var utilities = require('gulp-util');
var del = require('del');
var buildProduction = utilities.env.production;
//Linter
var jshint = require('gulp-jshint');
//Dev't Server
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
//For SASS
var sourcemaps = require('gulp-sourcemaps');
//bower-files() runs immediately
var lib = require('bower-files')({
  "overrides": {
    "bootstrap": {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

//TASKS

//Concat JS Interface Files
gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

//Converts JS into browser-readable files
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

//Minification
gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

//removes out of date files
gulp.task("clean", function(){
  return del(['build', 'tmp']);
});

//Dev't build command: > gulp build
//Production build command: > gulp build --production
gulp.task('build', ['clean'], function(){
  if (buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
  gulp.start('cssBuild');
});

//JS Linter
gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

//Concat and minify JS files
gulp.task('bowerJS', function() {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

//Concat and minify CSS files
gulp.task('bowerCSS', function () {
  return gulp.src(lib.ext('css').files)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/css'));
});

//Converts SASS into CSS
gulp.task('cssBuild', function() {
  return gulp.src(['scss/*.scss'])
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./build/css'))
  .pipe(browserSync.stream());
});

//Combine bower tasks immediately above
gulp.task('bower', ['bowerJS', 'bowerCSS']);

//Server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  //Watch for changes to these files and rebuild (keeping server active)
  gulp.watch(['js/*.js'], ['jsBuild']);
  gulp.watch(['bower.json'], ['bowerBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(["scss/*.scss"], ['cssBuild']);
});

//Tasks used in 'serve' above to reload after building
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function() {
  browserSync.reload();
});

gulp.task('bowerBuild', ['bower'], function() {
  browserSync.reload();
});

gulp.task('htmlBuild', function() {
  browserSync.reload();
});
