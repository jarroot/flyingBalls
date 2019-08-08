var gulp = require('gulp');
var concat = require('gulp-concat');

var basePath = {
	'app': './app/',
	'jsModules': './app/modules'
};

gulp.task('scripts', gulp.series(function (done) {
	var scripts = [
		basePath.jsModules + '/jquery.js',
		basePath.jsModules + '/Ball.js',
		//basePath.jsModules + '/BlackHole.js',

		basePath.app + 'main.js'
	];

	gulp.src(scripts)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./dist/'));

	done();
}));


gulp.task('watch', function () {
	gulp.watch('./app/**/*.js', gulp.series('scripts'));
});

gulp.task('default', gulp.series('scripts', 'watch'));