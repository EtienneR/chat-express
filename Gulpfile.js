var gulp    = require('gulp'),
    server  = require('gulp-express');
 
gulp.task('server', function () {
  server.run(['index.js']);
  gulp.watch(['index.js'], [server.run]);
});

gulp.task('watch-html', function () {
  gulp.watch(['./views/*.ejs'], server.notify);
});

gulp.task('watch-css', function () {
  gulp.watch(['./public/css/*.css'], server.notify);
});

gulp.task('watch-js', function () {
  gulp.watch(['./public/js/*.js'], server.notify);
});

gulp.task('default', ['server', 'watch-html', 'watch-css', 'watch-js']);
