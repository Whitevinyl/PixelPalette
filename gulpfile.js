var gulp = require('gulp');
var concat = require('gulp-concat-sourcemap');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var eventStream = require('event-stream');
var runSequence = require('run-sequence');

var metadata = require('./package');
var header = '// ' + metadata.name + ' v' + metadata.version + ' ' + metadata.homepage + '\n';


gulp.task('build', function() {
    var tsResult = gulp.src(['src/*.ts', '!src/*.d.ts'])
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: true,
            module: 'amd',
            sortOutput: true
        }));

    return eventStream.merge(
        tsResult.dts.pipe(concat('./PixelPalette.d.ts')).pipe(gulp.dest('./')),
        tsResult.js.pipe(concat('./PixelPalette.js')).pipe(gulp.dest('./'))
    );
});

gulp.task('browserify', function (callback) {
    return gulp.src(['./PixelPalette.js'])
        .pipe(browserify({
            transform: ['deamdify']
        }))
        .pipe(rename('PixelPalette.browser.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('libs', function() {
    gulp.src(['./lib/*.js', './PixelPalette.js']).pipe(concat('./PixelPalette.js')).pipe(gulp.dest('./'));
    gulp.src(['./lib/*.js', './PixelPalette.browser.js']).pipe(concat('./PixelPalette.browser.js')).pipe(gulp.dest('./'));
});

// todo: rename files
gulp.task('minify', function() {
    return gulp.src(['./PixelPalette.js', './PixelPalette.browser.js'])
        .pipe(uglify())
        .pipe(insert.prepend(header))
        //.pipe(rename('PixelPalette.browser.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function(callback) {
    runSequence('build', 'browserify', 'libs', callback);
});
