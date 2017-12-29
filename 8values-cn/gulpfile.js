var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'), //sass编译
    uglify= require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //文件重命名
    imagemin = require('gulp-imagemin'), //图片压缩
    cache = require('gulp-cache'); //缓存

// 静态资源路径，根据各自项目实际情况调整

var devRoot = 'dev/',
    distRoot = 'dist/';

var devPath = {
    css : devRoot + 'scss/',
    js : devRoot + 'js/',
    images : devRoot + 'images/',
    pic : devRoot + 'pic/'
};

var distPath = {
    css : distRoot + 'css/',
    js : distRoot + 'js/',
    images : distRoot + 'images/',
    pic : distRoot + 'pic/'
};

// sass生成压缩
gulp.task('sass', function () {
    sass(devPath.css + '**/*.scss', {
            require:'octopusUI',
            style:'compressed'
        })
    .pipe(gulp.dest(distPath.css));
});

// sass生成未压缩
gulp.task('cssfull', function () {
    sass(devPath.css + '**/*.scss', {
            require:'octopusUI',
            style:'compact'
        })
    .pipe(rename({suffix:'.full'}))
    .pipe(gulp.dest(distPath.css));
});

// js压缩
gulp.task('jsmin', function () {
    gulp.src(devPath.js+'**/*.js')
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(distPath.js));
});

// 样式图片压缩
gulp.task('imagemin', function () {
    gulp.src(devPath.images + '/**/*')
        .pipe(cache(imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(distPath.images));
});

// 数据图片压缩
gulp.task('picmin', function () {
    gulp.src(devPath.pic + '/**/*')
        .pipe(cache(imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(distPath.pic));
});

// 实时监听
gulp.task('watch', ['sass','jsmin','imagemin','picmin'],function () {
    gulp.watch(devPath.css + '**/*.scss', ['sass']);
    gulp.watch(devPath.js + '**/*.js', ['jsmin']);
    gulp.watch(devPath.images + '**/*', ['imagemin']);
    gulp.watch(devPath.pic + '**/*', ['picmin']);
});

// gulp任务
gulp.task('default',['watch']);