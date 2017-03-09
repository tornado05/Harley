var gulp            = require('gulp'),
    eslint          = require('gulp-eslint'),
    fs              = require('fs'),
    less            = require('gulp-less'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    cleanCSS        = require('gulp-clean-css'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    concatCss       = require('gulp-concat-css'),
    watch           = require('gulp-watch');

var DIST_DIR = 'dist',
    LAYOUT_PORT = 8000;

gulp.task('lint', function (cb) {
    cb();
});

gulp.task('make-dirs', function () {
    return fs.mkdir(DIST_DIR + '/logs', function (err) {
        if (err) {
            console.log('Adding directories failed' + err);
        }
    });
});

gulp.task('build-back-end', function () {
    return gulp.src(['./src/back_end/**/**'])
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('compile-html', function () {
    return gulp.src(['./src/front-end/html/**/**'])
        .pipe(gulp.dest(DIST_DIR + '/public'));
});

gulp.task('compile-js', function () {
    return gulp.src([
        './src/front-end/js/app.js',
        './src/front-end/js/router.js',
        './src/front-end/js/components/*.js',
        './src/front-end/js/constants/*.js',
        './src/front-end/js/controllers/*.js',
        './src/front-end/js/factories/*.js',
        './src/front-end/js/services/*.js',
        './src/front-end/js/filters/*.js'
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(DIST_DIR + "/public/js"))
});

gulp.task('vendor-js', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/underscore/underscore-min.js',
        './bower_components/leaflet/dist/leaflet.js',
        './bower_components/chart.js/dist/Chart.min.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular-route/angular-route.min.js',
        './bower_components/angular-resource/angular-resource.min.js',
        './bower_components/angular-resource/angular-chart.min.js',
        './bower_components/ui-leaflet/dist/ui-leaflet.min.js',
        './bower_components/angular-ui-bootstrap/dist/ui-bootstrap-2.5.0.min.js',
        './bower_components/angular-ui-bootstrap/dist/ui-bootstrap-tpls-2.5.0.min.js',
        './bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
        './bower_components/angular-chart.js/dist/angular-chart.min.js'
    ])
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_DIR + '/public/js'));
});

gulp.task('compile-less', function () {
    return gulp.src([
        './src/front-end/less/main.less'
    ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_DIR + '/public/css/'));
});

gulp.task('vendor-css', function () {
    return gulp.src([
        './bower_components/leaflet/dist/leaflet.css',
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
        './bower_components/angular-ui-bootstrap/dist/ui-bootstrap-2.5.0-csp.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concatCss('vendor.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_DIR + '/public/css/'));
});

gulp.task('vendor-images', function () {
    return gulp.src([
        './bower_components/leaflet/dist/images/*.*'
    ])
        .pipe(gulp.dest(DIST_DIR + '/public/img/leaflet'));
});

gulp.task('fonts', function(){
    return gulp.src([
        './bower_components/bootstrap/dist/fonts/**'
    ])
        .pipe(gulp.dest(DIST_DIR + '/public/fonts/'));
});

gulp.task('leaflet-images', function(){
    return gulp.src([
        './bower_components/leaflet/dist/images/**'
    ])
        .pipe(gulp.dest(DIST_DIR + '/public/css/images'));
});

gulp.task('img', function(){
    return gulp.src([
        './src/front-end/img/**/*.*'
    ],{base:'./src/front-end/img/'})
        .pipe(gulp.dest(DIST_DIR + '/public/img/'));
});

gulp.task('watch', function () {
    return gulp.watch('./src/**/**', [
        'update-front-end',
        'build-back-end'
    ]);
});

gulp.task('build-front-end', [
    'vendor-css',
    'vendor-js',
    'vendor-images',
    'update-front-end',
    'fonts',
    'img',
    'leaflet-images'
]);

gulp.task('update-front-end', [
    'compile-html',
    'compile-js',
    'compile-less'
]);

gulp.task('build', [
    'lint', 
    'make-dirs',
    'build-back-end',
    'build-front-end'
]);

gulp.task('default', [
    'build',
    'watch'
]);
