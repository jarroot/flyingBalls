const gulp = require('gulp');
const concat = require('gulp-concat');

var basePath = {
	'app': './app/',
	'jsModules': './app/modules'
};

gulp.task('scripts', function () {
	var scripts = [
		basePath.jsModules + '/jquary.min.js',
		basePath.jsModules + '/Ball.js',
		basePath.jsModules + '/BlackHole.js',


		basePath.app + 'main.js'
	];


	gulp.src(scripts)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/'));
})
;


gulp.task('watch', function () {
	gulp.watch('./app/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);