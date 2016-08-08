var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
	livereload = require('gulp-livereload'),
	templateCache = require('gulp-angular-templatecache'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	jsmin = require('gulp-jsmin');


//gulp.task('inject', function() {
//	console.log(bowerFiles());
//	return gulp.src('./web/index.html')
//	.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
//	.pipe(inject(gulp.src(['web/app/app.js', 'web/app/routes/routes.js'],{read: false})))
//	.pipe(gulp.dest('./web'));
//});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch("./web/**/*.js", browserSync.reload);
	gulp.watch("./web/**/*.html", browserSync.reload);
});

gulp.task('cacheTemplate', function() {
	gulp.src([
		'./web/app/directives/multiple-autocomplete-field/multiple-autocomplete-tpl.html'
	])
	.pipe(templateCache("templates.js", { module:'templates', standalone:true}))
	.pipe(gulp.dest('./web/app/templates/'));
});

gulp.task('cssminify', function () {
	gulp.src('./web/styles/styles.css')
		.pipe(cssmin())
		.pipe(rename('multiple-select.min.css',{suffix: '.min'}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('jsminify', function () {
	gulp.src('./build/multiple-select.js')
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('copy', function () {
	gulp.src('./web/styles/styles.css')
		.pipe(rename('multiple-select.css'))
		.pipe(gulp.dest('./build/'));
});

gulp.task('build', ['copy','cssminify', 'cacheTemplate', 'jsminify'], function() {
	return gulp.src([
		'./web/app/templates/templates.js',
		'./web/app/app.js',
		'./web/app/directives/multiple-autocomplete-field/multiple-autocomplete-field.js'
	])
	.pipe(concat('multiple-select.js'))
	.pipe(gulp.dest('./build/'));
});

gulp.task('inject', function () {
	gulp.src('./web/index.html')
		.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
		.pipe(gulp.dest('./web'));
});
// Static server
gulp.task('serve', ['inject', 'watch'] , function() {
    browserSync.init({
        server: {
            baseDir: "./web",
			routes: {
				"/bower_components": "bower_components",
				"/static": "static",
				"/web": "web"
			}
        },
		port:5000
    });
});