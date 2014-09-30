var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    ngAnnotate = require('gulp-ng-annotate'),
    clean = require('gulp-clean'),
    size = require('gulp-size');

var options = {
    paths: {
        'dist': 'dist',
        'app': 'src',
        'html': ['src/index.html', 'src/**/*.html']
    },
    minifyCss: {
        'debug':false
    }
};

gulp.task('clean', function () {
    return gulp.src(options.paths.dist + '/**/*', {read: false})
        .pipe(clean());
});

gulp.task('process-assets', function () {
    return gulp.src(options.paths.app + '/assets/**')
        .pipe(gulp.dest(options.paths.dist + '/assets'))
        .pipe(size({ title: 'assets size'}));
});

gulp.task('copy-config', function () {
    return gulp.src(options.paths.app + '/web.config')
        .pipe(gulp.dest(options.paths.dist));
});

gulp.task('process-html', function() {
    gulp.src(options.paths.html, {base: options.paths.app})
        .pipe(
        usemin({
            css: [
                minifyCss(options.minifyCss),
                rev()
            ],
            html: [
                minifyHtml({empty: true, conditionals:true})
            ],
            js: [
                ngAnnotate(),
                uglify(),
                rev()
            ]
        })
    )
        .pipe(gulp.dest(options.paths.dist))
        .pipe(size({ title: 'html size'}));
});

gulp.task('build', ['clean'], function() {
    gulp.start('process-html', 'process-assets', 'copy-config');
});