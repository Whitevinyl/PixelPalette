var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var eventStream = require('event-stream');
var runSequence = require('run-sequence');
var connect = require('gulp-connect');

var metadata = require('./package');
var header = '// ' + metadata.name + ' v' + metadata.version + ' ' + metadata.homepage + '\n';
var dist = './dist';

gulp.task('build', function() {
    var tsResult = gulp.src(['src/*.ts', '!src/*.d.ts'])
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: true,
            module: 'amd',
            sortOutput: true
        }));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest(dist)),
        tsResult.js.pipe(gulp.dest(dist))
    );
});

gulp.task('browserify', function (callback) {
    return gulp.src(['./PixelPalette.js'], { cwd: dist })
        .pipe(browserify({
            transform: ['deamdify'],
            standalone: 'PixelPalette'
        }))
        .pipe(rename('PixelPalette.b.js'))
        .pipe(gulp.dest(dist));
});

gulp.task('libs', function() {
    gulp.src(['./lib/*.js', dist + '/PixelPalette.js']).pipe(concat('/PixelPalette.js')).pipe(gulp.dest(dist));
    gulp.src(['./lib/*.js', dist + '/PixelPalette.b.js']).pipe(concat('/PixelPalette.b.js')).pipe(gulp.dest(dist));
});

gulp.task('minify', function() {
    return gulp.src(['./PixelPalette.js', './PixelPalette.b.js'], { cwd: dist })
        .pipe(rename(function (path) {
            path.extname = ".min" + path.extname;
        }))
        .pipe(uglify())
        .pipe(insert.prepend(header))
        .pipe(gulp.dest(dist));
});

gulp.task('serve', function() {
    connect.server({
        root: './'
    });
});

gulp.task('default', function(callback) {
    runSequence('build', 'browserify', 'libs', callback);
});
