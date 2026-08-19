var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

// Copy third party libraries from /node_modules into /vendor
function vendor(done) {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ], { base: './node_modules/bootstrap/dist' })
    .pipe(gulp.dest('./vendor/bootstrap'));

  // Font Awesome 5
  gulp.src([
      './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
      './node_modules/@fortawesome/fontawesome-free/webfonts/**/*',
      './node_modules/@fortawesome/fontawesome-free/LICENSE.txt'
    ], { base: './node_modules/@fortawesome/fontawesome-free' })
    .pipe(gulp.dest('./vendor/fontawesome-free'));

  // jQuery
  gulp.src('./node_modules/jquery/dist/jquery.min.js')
    .pipe(gulp.dest('./vendor/jquery'));

  // jQuery Easing
  gulp.src('./node_modules/jquery.easing/jquery.easing.min.js')
    .pipe(gulp.dest('./vendor/jquery-easing'));

  // Simple Line Icons
  gulp.src('./node_modules/simple-line-icons/fonts/**')
    .pipe(gulp.dest('./vendor/simple-line-icons/fonts'));

  gulp.src('./node_modules/simple-line-icons/css/simple-line-icons.css')
    .pipe(gulp.dest('./vendor/simple-line-icons/css'));

  done();
}

// Compile SCSS
function cssCompile() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./css'));
}

// Minify CSS (only the Sass-compiled output; hand-written css/*.css files
// like timeline.css and blog.css are committed as-is and linked directly)
function cssMinify() {
  return gulp.src('./css/stylish-portfolio.css')
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
}

var css = gulp.series(cssCompile, cssMinify);

// Minify JavaScript
function jsMinify() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
}

var js = gulp.series(jsMinify);

// Configure the browserSync task
function serve(done) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  done();
}

function watchFiles() {
  gulp.watch('./scss/**/*.scss', css);
  gulp.watch('./js/*.js', js);
  gulp.watch('./*.html').on('change', browserSync.reload);
}

var build = gulp.series(css, js, vendor);
var dev = gulp.series(css, js, serve, watchFiles);

exports.vendor = vendor;
exports.css = css;
exports.js = js;
exports.build = build;
exports.dev = dev;
exports.default = build;
