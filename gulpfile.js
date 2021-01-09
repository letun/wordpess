'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jslint = require('gulp-jslint');
var phplint = require('gulp-phplint');
var scsslint = require('gulp-stylelint');
var postcss = require('gulp-postcss');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
	return gulp.src('./wp-content/themes/lettera/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./wp-content/themes/lettera/'));
});

var addMargin = function (css, opts) {
	css.walkDecls(function(decl) {
		if (decl.prop === 'margin') {
			decl.parent.insertAfter(decl, {
				prop: 'Margin',
				value: decl.value
			});
		}
	});
};

gulp.task('addMargin', function () {
	var plugins = [
		addMargin
	];
	return gulp.src('./wp-content/themes/lettera/lettera.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./wp-content/themes/lettera/lettera.css'));
});

gulp.task('watch', function () {
	gulp.watch('./wp-content/themes/lettera/**/*.scss', gulp.series('sass'));
});

gulp.task('phplint', function () {
	return gulp.src(['./wp-content/themes/lettera/**/*.php'])
		.pipe(phplint('', {
			skipPassedFiles: true
		}))
		.pipe(phplint.reporter(function(file){
			var report = file.phplintReport || {};
			if (report.error) {
				console.error(report.message+' on line '+report.line+' of '+report.filename);
			}
		}));
});

gulp.task('jslint', function () {
	return gulp.src('./wp-content/themes/lettera/**/*.js')
		.pipe(jslint({ /* this object represents the JSLint directives being passed down */ }))
		.pipe(jslint.reporter('default', true));
});

gulp.task('scsslint', function lintCssTask() {
	return gulp
		.src('./wp-content/themes/lettera/scss/lettera/_alignment.scss')
		.pipe(scsslint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}));
});

gulp.task("test", gulp.series("phplint", "jslint") );