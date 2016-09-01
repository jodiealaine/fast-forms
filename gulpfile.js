var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var del = require('del');

var reload = browserSync.reload;

// paths
var appStyles = 'app/styles/**/*.scss';
var distStyles = 'dist/styles';
var appScripts = 'app/scripts/**/*.js';
var distScripts = 'dist/scripts';
var appData = 'app/data/**/*.json';
var distData = 'dist/data';

gulp.task('styles', () => {
  return gulp.src(appStyles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(distStyles))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src(appScripts)
    .pipe(concat('events.js'))
    .pipe(uglify())
    .pipe(gulp.dest(distScripts))
    .pipe(reload({stream: true}));
});

gulp.task('lint', () => {
  return gulp.src([appScripts])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
});


gulp.task('data', () => {
  return gulp.src(appData)
    .pipe(gulp.dest('dist/data'));
});

gulp.task('clean', del.bind(null, 'dist'));

gulp.task('serve', () => {
  browserSync({
    notify: true,
    port: 8080,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('build', ['lint', 'html', 'scripts', 'styles', 'data'], () => {
  
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
  gulp.start('serve');
});