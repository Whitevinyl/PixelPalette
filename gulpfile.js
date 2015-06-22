var argv = require('yargs').argv,
    browserify = require('gulp-browserify'),
    bump = require('gulp-bump'),
    concat = require('gulp-concat'),
    Config = require('./gulpfile.config'),
    connect = require('gulp-connect'),
    del = require('del'),
    eventStream = require('event-stream'),
    exec = require('child_process').exec,
    insert = require('gulp-insert'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    ts = require('gulp-typescript'),
    uglify = require('gulp-uglify'),
    gulp = require('gulp');

var config = new Config();

gulp.task('build', function() {
    var tsResult = gulp.src(['src/*.ts', '!src/*.d.ts'])
        .pipe(ts({
            declarationFiles: true,
            noExternalResolve: true,
            module: 'amd',
            sortOutput: true
        }));

    return eventStream.merge(
        tsResult.dts.pipe(gulp.dest(config.dist)),
        tsResult.js.pipe(gulp.dest(config.dist))
    );
});

gulp.task('browserify', function (cb) {
    return gulp.src(['./*.js'], { cwd: config.dist })
        .pipe(browserify({
            transform: ['deamdify'],
            standalone: config.standalone
        }))
        .pipe(rename(config.out))
        .pipe(gulp.dest(config.dist));
});

gulp.task('bump', function(){
    var bumpType = argv.type || 'patch'; // major.minor.patch

    gulp.src(['./bower.json', './package.json'])
        .pipe(bump({type: bumpType}))
        .pipe(gulp.dest('./'));
});

// requires global gulp-cli
gulp.task('bump:minor', function(cb){
    exec('gulp bump --type minor', function (err, stdout, stderr) {
        cb();
    });
});

// requires global gulp-cli
gulp.task('bump:major', function(cb){
    exec('gulp bump --type major', function (err, stdout, stderr) {
        cb();
    });
});

gulp.task('clean:dist', function (cb) {
    del([
        config.dist + '/*'
    ], cb);
});

gulp.task('libs', function() {
    gulp.src(['./lib/*.js', config.dist + '/' + config.out]).pipe(concat('/PixelPalette.js')).pipe(gulp.dest(config.dist));
    //gulp.src(['./lib/*.js', config.dist + '/PixelPalette.b.js']).pipe(concat('/PixelPalette.b.js')).pipe(gulp.dest(config.dist));
});

gulp.task('minify', function() {
    return gulp.src([config.out], { cwd: config.dist })
        .pipe(rename(function (path) {
            path.extname = ".min" + path.extname;
        }))
        .pipe(uglify())
        .pipe(insert.prepend(header))
        .pipe(gulp.dest(config.dist));
});

gulp.task('serve', function() {
    connect.server({
        root: './'
    });
});

gulp.task('default', function(cb) {
    runSequence('clean:dist', 'build', 'bump', 'browserify', 'libs', cb);
});