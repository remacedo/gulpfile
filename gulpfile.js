var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var browserSync = require('browser-sync');

var directory = 'build';

// Scripts
gulp.task('scripts', function(){
	return gulp
	.src('src/js/*.js')
	.pipe(uglify())
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest(directory + '/js'));
});

// Sass
gulp.task('sass', function() {
	return sass('src/sass/', {style: 'compressed'})
	.on('error', function (err) {
		console.error('Error!', err.message);
	})
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest(directory + '/css'));
});

// Compress Images
gulp.task('images', function(){
	return gulp
	.src('src/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest(directory + '/images'));
})

// Minify HTML
gulp.task('minify-html', function() {
	var opts = {
		conditionals: true,
		spare:true
	};

	return gulp.src('*.html')
	.pipe(minifyHTML(opts))
	.pipe(gulp.dest(directory));
});

// Browser Sync
gulp.task('browser-sync', function() {
	browserSync.init(["index.html", "build/css/style.min.css", "build/js/scripts.min.js"], {
		server: {
			baseDir: "./"
		}
	});
});

// Watch 
gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['scripts']);
	gulp.watch('src/sass/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'minify-html', 'images', 'browser-sync', 'watch']);
