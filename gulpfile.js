var gulp = require('gulp');
var pump = require('pump');
var del = require('del');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('clean', function () {
  // delete destination folder
  return del(['dist']);
});

gulp.task('markup', function () {
  return gulp.src('src/views/**/*.html')
    // pipe to this destination
    .pipe(gulp.dest('dist'))
});

gulp.task('styles', function () {
  return gulp.src('src/assets/styles/**/*.scss')
    // initialise sourcemaps
    .pipe(sourcemaps.init())
    // compile sass to css
    .pipe(sass().on('error', sass.logError))
    // autoprefix & minify styles
    .pipe(postcss([autoprefixer(), cssnano()]))
    // write sourcemap files
    .pipe(sourcemaps.write('.'))
    // pipe to this destination
    .pipe(gulp.dest('dist/assets/styles'))
    // inject the changed files into page without reload
    .pipe(browserSync.stream());
});

gulp.task('scripts', function (cb) {
  pump([
    gulp.src('src/assets/scripts/*.js'),
    // initialise sourcemaps
    sourcemaps.init(),
    // minify scripts
    uglify(),
    sourcemaps.write('.'),
    // pipe to this destination
    gulp.dest('dist/assets/scripts')
  ],
    cb
  )
});

gulp.task('media', function () {
  return gulp.src('src/**/*.{ico,jpeg,jpg,png,svg}')
    // pipe to this destination
    .pipe(gulp.dest('dist'))
    // inject the changed files into page without reload
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
  browserSync.init({ server: { baseDir: './dist' } });
  // watch markup files, reload on change
  gulp.watch('src/views/**/*.html', ['markup']).on('change', browserSync.reload);
  // watch style files
  gulp.watch('src/assets/styles/**/*.scss', ['styles']);
  // watch script files, reload on change
  gulp.watch('src/assets/scripts/**/*.js', ['scripts']).on('change', browserSync.reload);
  // watch media files
  gulp.watch('src/**/*.{ico,jpeg,jpg,png,svg}', ['media']);
});

// default task
gulp.task('default', ['clean', 'markup', 'styles', 'scripts', 'media']);
// serve task (for development)
gulp.task('serve', ['browser-sync']);
