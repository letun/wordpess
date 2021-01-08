'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
	return gulp.src('./wp-content/themes/lettera/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./wp-content/themes/lettera/'));
});

gulp.task('watch', function () {
	gulp.watch('./wp-content/themes/lettera/**/*.scss', gulp.series('sass'));
});