const gulp = require('gulp');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const sync = require('browser-sync');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// HTML

const html = () => {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

exports.html = html;

// Styles

const styles = () => {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(sync.stream());
};

exports.styles = styles;

// Scripts

const scripts = () => {
    return gulp.src('src/scripts/main.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream());
};

exports.scripts = scripts;

// Copy

const copy = () => {
    return gulp.src([
        'src/fonts/**/*',
        'src/images/**/*',
        'src/vendor/**/*',
    ], {
        base: 'src'
    })
        .pipe(gulp.dest('dist'))
        .pipe(sync.stream({
            once: true
        }));
};

exports.copy = copy;

// Server

const server = () => {
    sync.init({
        ui: false,
        notify: false,
        server: {
            baseDir: 'dist'
        }
    });
};

exports.server = server;

// Watch

const watch = () => {
    gulp.watch('src/*.html', gulp.series(html));
    gulp.watch('src/styles/**/*.scss', gulp.series(styles));
    gulp.watch('src/scripts/**/*.js', gulp.series(scripts));
    gulp.watch([
        'src/fonts/**/*',
        'src/images/**/*',
        'src/vendor/**/*',
    ], gulp.series(copy));
};

exports.watch = watch;

// Start

const start = gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
    ),
    gulp.parallel(
        watch,
        server,
    ),
);


exports.start = start;

// Default

exports.default = gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
    )
);
