var autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  jssmin = require('gulp-jsmin'),
  imagemin = require('gulp-imagemin'),
  myth = require('gulp-myth'),
  mainBowerFiles = require('main-bower-files'),
  order = require('gulp-order'),
  plumber = require('gulp-plumber'),
  webserver = require('gulp-webserver'),

var config = {
  srcDir: {
    fonts: './src/fonts/',
    html: './src/html/',
    css: './src/css/',
    img: './src/img/',
    js: './src/js/',
  },
  bowerDir: './bower_components/',
  basePath: './build/',
  buildDir: {
    css: './build/css/',
    fonts: './build/fonts/',
    html: './build/',
    img: './build/img/',
    js: './build/js/',
  }
}

gulp.task('images', function() {
  gulp.src(config.srcDir.img + '**/*')
  // .pipe(watch(config.srcDir.img + '**/*'))
  .pipe(imagemin())
  .pipe(plumber())
  .pipe(gulp.dest(config.buildDir.img));
});

gulp.task('scripts-custom', function() {
  gulp.src(config.srcDir.js + '**/*.js')
  .pipe(jsmin)
  .pipe(concat('custom-scripts.js'))
  .pipe(gulp.dest(config.buildDir.js));
});

gulp.task('cssmin', function() {
  gulp.src(config.)
  .pipe(autoprefixer())
  .pipe(concat('vendors-style.css'))
  .pipe(plumber())
  .pipe(myth())
})
gulp.task('scripts-vendors', function() {
  var vendors = mainBowerFiles();
  var concatJsFilter = filter(['**/*.js','!**/*html5shiv*'],{restore:true});
  return gulp.src(vendors)
  // .pipe(watch(vendors))
  .pipe(concatJsFilter)
  .pipe(order(['*jquery*','*bootstrap*']))
  .pipe(concat('vendor-scripts.js'))
  .pipe(gulp.dest(config.buildDir.js));
});
gulp.task('html', function() {
  gulp.src(config.srcDir.templates + '**/*.html')
  .pipe(gulp.dest(config.buildDir.templates));
});

gulp.task('fonts', function() {
  gulp.src([config.srcDir.fonts + '/*/**',config.bowerDir + '/bootstrap-sass/assets/fonts/*/**'])
  .pipe(gulp.dest(config.buildDir.fonts));
});


gulp.task('watch', function() {
  gulp.watch(config.srcDir.js + '**/*.js', ['jsmin']);
  gulp.watch( config.srcDir.img + '**/*', ['images']);
  gulp.watch( config.srcDir.fonts + '**/*', ['fonts']);
  gulp.watch( config.srcDir.templates + '**/*.html', ['html']);
});

gulp.task('server', function(done) {
  gulp.src('./build')
    .pipe(webserver({
      fallback: 'index.html',
      livereload: { enable: true},
      directoryListing: {
        path: './build'
      },
      open: true
    }));
});
gulp.task('default', ['html', 'images','scripts-vendors', 'scripts-custom', 'fonts', 'server', 'watch']);