var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject'),
    concat = require('gulp-concat');

gulp.task('build', function () {
    // inject all of the js dependencies into the html
    var sources = gulp.src(['./extdata/*.js', './src/**/*.js', './src/**/*.css', './directives/app-core.js', './directives/*/**/*.js'], {read: false});
    return gulp.src('./src/window.html')
        .pipe(inject(sources, {addRootSlash: false}))
        .pipe(wiredep({ignorePath: '../'}))
        .pipe(gulp.dest('./'));
});

