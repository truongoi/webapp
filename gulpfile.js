// Deep Breaths //
//////////////////

// Gulp
var gulp = require('gulp');

// Sass/CSS stuff
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// JavaScript
var uglify = require('gulp-uglify');

// Images
var imagemin = require('gulp-imagemin');

// Browsersync
var browserSync = require('browser-sync').create();

// Clean
var clean = require('gulp-clean');

// Stats and Things
var size = require('gulp-size');

//

// Compile SCSS
gulp.task('build:css', function (){
	gulp.src(['./src/scss/*.scss', '!./src/scss/_variables.scss'])
	.pipe(sass({
		includePaths: ['./src/scss'],
		outputStyle: 'expanded'
	}))
	.pipe(prefix(
		"last 2 version", "> 1%"
		))
	.pipe(gulp.dest('./src/css'))
	.pipe(minifycss())
	.pipe(gulp.dest('./dist/css'));
});
gulp.task('css-watch', ['build:css'], function(done) {
  browserSync.reload();
  done();
});


// Uglify JS
gulp.task('build:js', () =>{
	gulp.src('./src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});
gulp.task('js-watch', ['build:js'], function(done) {
  browserSync.reload();
  done();
});


// Images
gulp.task('build:images', () => {
	gulp.src('./src/img/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/img'));
});
gulp.task('css-watch', ['build:css'], function(done) {
  browserSync.reload();
  done();
});


gulp.task('build:html', () => {
	gulp.src("./src/*.html")
	.pipe(gulp.dest('./dist'));
})


gulp.task('clean', () => {
	gulp.src("./dist")
	.pipe(clean({force: true}));
})


// Stats and Things
gulp.task('stats', ['build'], () => {
	gulp.src('./dist/**/*')
	.pipe(size())
	.pipe(gulp.dest('./dist'));
});

//
gulp.task('serve', ['build:css', 'build:js'], () => {

	browserSync.init({
    reloadDelay: 100,
		server: {
		  baseDir: ['./src']
		}
	});

	gulp.watch("./src/scss/*.scss", ['css-watch']);
	gulp.watch("./src/js/**/*.js", ['js-watch']);
	gulp.watch("./src/img/**/*", ['images-watch']);
	gulp.watch("./src/*.html").on('change', browserSync.reload);
});

gulp.task('build', () => {
	gulp.start(['build:css', 'build:js', 'build:images', 'build:html']);
});

gulp.task('default', () => {
	gulp.start('serve');
});
