var gulp = require("gulp");
var typescript = require("gulp-tsc");

gulp.task("default", function(){
	gulp.src(["src/**/*.ts"])
	.pipe(typescript({
		sourcemap: true,
		module: "commonjs",
		target: "es5"
	}))
	.pipe(gulp.dest("src/"));
});