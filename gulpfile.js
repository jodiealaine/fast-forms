const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
 return gulp.src('app/styles/*.scss')
   .pipe($.plumber())
   .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'compressed',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
   .pipe($.sourcemaps.write())
   .pipe(gulp.dest('.tmp/styles'))
   .pipe(gulp.dest('dist/styles'))
   .pipe(reload({stream: true}));
});

gulp.task('data', () => {
  return gulp.src('app/data/*.json')
    .pipe(gulp.dest('dist/data'));
});

gulp.task('scripts', () => {
 return gulp.src('app/scripts/**/*.js')
   .pipe($.plumber())
   .pipe($.sourcemaps.init())
    .pipe($.babel({presets: ['es2015']}))
    .pipe($.concat('bundle.js'))
    .pipe($.uglify())
   .pipe($.sourcemaps.write('.'))
   .pipe(gulp.dest('.tmp/scripts'))
   .pipe(gulp.dest('dist/scripts'))
   .pipe(reload({stream: true}));
});

function lint(files, options) {
 return gulp.src(files)
   .pipe(reload({stream: true, once: true}))
   .pipe($.eslint(options))
   .pipe($.eslint.format())
   .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
 return lint('app/scripts/**/*.js', {
   fix: true
 })
   .pipe(gulp.dest('app/scripts'));
});

gulp.task('html', ['styles', 'scripts'], () => {
 return gulp.src('app/*.html')
   .pipe($.htmlmin())
   .pipe(gulp.dest('dist'));
});

gulp.task('extras', () => {
 return gulp.src([
   'app/*.*',
   '!app/*.html'
 ], {
   dot: true
 }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts'], () => {
 browserSync({
   notify: false,
   port: 9000,
   server: {
     baseDir: ['.tmp', 'app'],
     routes: {
       '/bower_components': 'bower_components'
     }
   }
 });

 gulp.watch([
   'app/*.html',
   '.tmp/fonts/**/*'
 ]).on('change', reload);

 gulp.watch('app/styles/**/*.scss', ['styles']);
 gulp.watch('app/scripts/**/*.js', ['scripts']);
 gulp.watch('bower.json', ['wiredep']);
});

gulp.task('serve:dist', () => {
 gulp.start('srcinject')
 browserSync({
   notify: false,
   port: 9000,
   server: {
     baseDir: ['dist']
   }
 });
});

gulp.task('srcinject', function() {
  gulp.src('./dist/**/*.html')
    .pipe($.inject(gulp.src('./dist/**/*.js', {read:false}), {relative: true}))
    .pipe($.inject(gulp.src('./dist/**/*.css', {read:false}), {relative: true}))
    .pipe(gulp.dest('./dist'));
});

// inject bower components
gulp.task('wiredep', () => {
 gulp.src('app/styles/*.scss')
   .pipe(wiredep({
     ignorePath: /^(\.\.\/)/
   }))
   .pipe(gulp.dest('app/styles'));

 gulp.src('app/*.html')
   .pipe(wiredep({
     exclude: ['bootstrap-sass'],
     ignorePath: /^(\.\.\/)*\.\./
   }))
   .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'data', 'extras'], () => {
 return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
 gulp.start('build');
});