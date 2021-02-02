'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jslint = require('gulp-jslint');
var eslint = require('gulp-eslint');
var phplint = require('gulp-phplint');
var scsslint = require('gulp-stylelint');
var postcss = require('gulp-postcss');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
	return gulp.src(
		'./wp-content/themes/lettera/*.scss',
		'!./wp-content/themes/lettera/**/lettera.scss'
		)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./wp-content/themes/lettera/'));
});

var addMargin = function (css, opts) {
	css.walkDecls(function(decl) {
		if (decl.prop.startsWith('margin')) {
			decl.parent.insertAfter(decl, {
				prop: decl.prop.charAt(0).toUpperCase() + decl.prop.slice(1),
				value: decl.value
			});
		}
		if (decl.prop === 'font-size' && decl.value === 0) {
			decl.parent.insertAfter(decl, {
				prop: decl.prop,
				value: decl.value + "px"
			});
		}
	});
};

gulp.task('sass--lettera', function () {
	var plugins = [
		addMargin
	];
	return gulp.src('./wp-content/themes/lettera/lettera.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./wp-content/themes/lettera/'));
});

gulp.task('watch', function () {
	gulp.watch('./wp-content/themes/lettera/**/*.scss', gulp.series('sass', 'sass--lettera'));
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
	return gulp.src(['./wp-content/themes/lettera/js/**/*.js'])
		.pipe(jslint({ /* this object represents the JSLint directives being passed down */ }))
		.pipe(jslint.reporter('default', true));
});

gulp.task('scsslint', function lintCssTask() {
	return gulp
		.src('./wp-content/themes/lettera/scss/lettera/**/*.scss')
		.pipe(eslint({
			reporters: [
				{formatter: 'string', console: true}
			]
		}));
});

gulp.task('eslint', function () {
	return gulp.src(['./wp-content/themes/lettera/blocks/src/elements/text-small/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("test", gulp.series("phplint", "jslint", "scsslint", "eslint") );