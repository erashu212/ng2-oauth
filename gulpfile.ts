const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const sass = require( 'gulp-sass' );
const csso = require( 'gulp-csso' );
const rename = require( 'gulp-rename' );
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');


/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

gulp.task( 'open-url', ()=> {
    gulp.src(__filename)
        .pipe( open( {uri: 'http://localhost:8080/SPA/src/'} ) );
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", () => {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"));
});

/**
 * Compile scss sources and create sourcemaps in build directory.
 */
gulp.task( 'styles', ()=> {
    gulp.src(["src/app/*.scss", "src/styles/*.scss"])
        .pipe( sass({
            outputStyle:        'nested',
            sourceComments:     true,
            errLogToConsole:    true
        }))
        .pipe( csso() )
        .pipe(minifyCSS())
        .pipe( rename( 'index.min.css' ) )
        .pipe( gulp.dest( 'build/css' ) );
});

gulp.task( 'fonts', () => {
    gulp.src(["src/fonts/**"])
    .pipe( gulp.dest( 'build/fonts' ) );
});

gulp.task( 'images', () => {
    gulp.src(["src/images/**"])
    .pipe( gulp.dest( 'build/images' ) );
});

/**
 * Copy all css that are not scss files into build directory.
 */
gulp.task("css", () => {
    return gulp.src(["src/app/*.css", "src/styles/*.css", "!src/**/*.scss"])
        .pipe(minifyCSS())
        .pipe(concat('index.min.css'))
        .pipe(gulp.dest('build/css'))
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts", "!**/*.scss"])
        .pipe(gulp.dest("build"))
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'font-awesome/css/**',
            'font-awesome/fonts/**',
            'bootstrap/dist/**',
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            'js-cookie/src/**',
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

gulp.task( 'watch', ()=> {
    gulp.watch( "src/**/*.ts",  ['compile'] );
    gulp.watch( "src/**/*.scss",       ['styles'] );
    gulp.watch( "src/**/*.html",       ['resources'] );
});

/**
 * Build the project.
 */
gulp.task("build", ['styles', 'compile', "resources", 'libs', 'fonts', 'images'], () => {
    console.log("Building the project ...")
});
