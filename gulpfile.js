var gulp            = require('gulp'),
    jslint          = require('gulp-jslint'),
    fs              = require('fs'),
    less            = require('gulp-less'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    cleanCSS        = require('gulp-clean-css'),
    uglify          = require('gulp-uglify'),
    concat          = require('gulp-concat'),
    compile         = require('gulp-ejs-template'),
    concatCss       = require('gulp-concat-css'),
    browserSync     = require('browser-sync').create(),
    watch           = require('gulp-watch'),
    webpack         = require('gulp-webpack');

var DIST_DIR = 'dist',
    LAYOUT_PORT = 8000;

gulp.task('lint', function (cb) {
    return gulp.src(['./src/**/*.js'])
        .pipe(jslint({
            node: true,
            stupid: true
        }))
        .pipe(jslint.reporter('default', {}));
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
    return gulp.src(['./src/front-end/html/*'])
        .pipe(gulp.dest(DIST_DIR + '/public'));
});

gulp.task('compile-js', function () {
    return gulp.src([
        './src/front-end/js/**/*.jsx'
    ])
        .pipe(webpack({
            module: {
                loaders: [
                    {
                         loader: 'babel-loader',
                         exclude: /node_modules/,
                         query: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            output: {
                filename: 'bundle.js'
            }
        }))        
        .pipe(gulp.dest(DIST_DIR + '/public/js'));
});

gulp.task('vendor-js', function () {
    return gulp.src([
        './bower_components/jquery/dist/jquery.min.js*',
        './bower_components/underscore/underscore-min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/leaflet/dist/leaflet.js',
        './bower_components/leaflet/dist/leaflet-src.js'
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
        './bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concatCss('vendor.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(DIST_DIR + '/public/css'));
});

gulp.task('vendor-images', function () {
    return gulp.src([
        './bower_components/leaflet/dist/images/*.*'
    ])
        .pipe(gulp.dest(DIST_DIR + '/public/img/leaflet'));
});

gulp.task('fonts', function(){
    return gulp.src([
        './src/front-end/fonts/roboto/**/**'
    ])
        .pipe(gulp.dest(DIST_DIR + '/public/fonts/'));
});

gulp.task('img', function(){
    return gulp.src([
        './src/front-end/img/**/*.*'
    ],{base:'./src/front-end/img/'})
        .pipe(gulp.dest(DIST_DIR + '/public/img/'));
});

gulp.task('templates', function() {
    return gulp.src('./src/front-end/templates/*.ejs')
        .pipe(compile({
            moduleName: 'templates',
            escape: false
        }))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_DIR + '/public/js'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        port: LAYOUT_PORT,
        server: {
            baseDir: DIST_DIR +"/public"
        }
    });
});

gulp.task('watch-fr', function () {
    return gulp.watch('./src/front-end/**', [
        'update-front-end',
        browserSync.reload
    ]);
});

gulp.task('watch', function () {
    return gulp.watch('./src/**/**', ['build']);
});

gulp.task('front-end', [
    'vendor-js',
    'vendor-css',
    'vendor-images',
    'compile-html',
    'compile-js',
    'compile-less',
    'fonts',
    'templates',
    'img'
]);

gulp.task('update-front-end', [
    'compile-html',
    'compile-js',
    'compile-less',
    'templates',
    'img'
]);

gulp.task('layout', [
    'front-end',
    'browser-sync',
    'watch-fr'
]);

gulp.task('backbone', [
    'front-end',
    'watch-fr'
]);

gulp.task('build', [
    'lint', 
    'make-dirs',
    'build-back-end',
    'front-end'
]);

gulp.task('default', ['build']);
