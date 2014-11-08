var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var ts = require('gulp-typescript');
var browserify = require('gulp-browserify');
var eventStream = require('event-stream');

var metadata = require('./package');
var header = '// ' + metadata.name + ' v' + metadata.version + ' ' + metadata.homepage + '\n';


gulp.task('build', function() {
    var tsResult = gulp.src('src/*.ts')
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: true
        }));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest('./')),
        tsResult.js.pipe(gulp.dest('./'))
    );
});

//gulp.task('build', function () {
//    return gulp.src(['src/*.ts', '!src/*.d.ts'])
//        .pipe(tsc({
//            module : 'amd',
//            target: 'es5',
//            sourcemap: false,
//            logErrors: true,
//            declaration: true
//        }))
//        //.pipe(browserify({
//        //    transform: ['deamdify']
//        //}))
//        //.pipe(uglify())
//        .pipe(insert.prepend(header))
//        .pipe(rename('PixelPalette.js'))
//        .pipe(gulp.dest('./dist'));
//});

gulp.task('default', ['build']);
