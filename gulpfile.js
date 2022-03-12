var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer-core");

gulp.task("styles", function () {
  var processors = [autoprefixer({ browsers: "last 5 versions" })];

  return gulp
    .src("./src/**/*.css")
    .pipe(postcss(processors))
    .pipe(gulp.dest("./dest"));
});

gulp.task("watch:styles", function () {
  gulp.watch("**/*.css", ["styles"]);
});
