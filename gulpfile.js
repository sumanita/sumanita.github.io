// Require Gulp and plugins
var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'), 
    imagemin = require('gulp-imagemin');

// Scripts task
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
});

// Styles task
gulp.task('styles', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(
    	{browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1']
    }))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/css'))
});

gulp.task('imgMinified', function(){
    gulp.src('src/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('assets/images'))
});

// Watch task
gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/images/**/*.*', ['imgMinified']);
});

// Default task
gulp.task('default', ['scripts', 'styles', 'imgMinified', 'watch']);