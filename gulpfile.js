'use strict';

const gulp      = require('gulp');
const webpack   = require('gulp-webpack');
const del       = require('del');
const sass      = require('gulp-sass');
const lint      = require('gulp-eslint')


let paths = ['*.js', 'app/js/*.js', 'app/**/*.**'];

gulp.task('eslint', () => {
  gulp.src(paths)
  .pipe(lint())
  .pipe(lint.format());
});

gulp.task('sass', () => {
  return gulp.src('./app/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./public/build/css'));
})

gulp.task('del-build', () => {
  return del([
    __dirname + '/build/**', __dirname + '!/public/build'
  ])
  .then(paths => console.log('Deleted files and folders:\n', paths.join('\n')));
});

gulp.task('copy-html', () => {
  gulp.src(__dirname + '/app/index.html')
  .pipe(gulp.dest(__dirname + '/public/build'));
});

// gulp.task('copy-css', () => {
//   gulp.src(__dirname + '/app/sass/*.**')
//   .pipe(gulp.dest(__dirname + '/public/build/css'));
// });

gulp.task('sass:watch', function () {
  gulp.watch('./app/sass/*.scss', ['sass']);
});

// gulp.task('webpack', () => {
//   return gulp.src(__dirname + '/public/js/app.js')
//   .pipe(webpack({
//     watch: true,
//     module: {
//       loaders: [
//         { test: /\.css$/, loader: 'style!css'}
//       ]
//     },
//     output: {
//       filename: 'bundle.js'
//     }
//   }))
//   .pipe(gulp.dest(__dirname + '/public/build'));
// });


gulp.task('watch', () => {
  gulp.watch(paths);
});

gulp.task('default', ['eslint', 'del-build','copy-html', 'sass', 'sass:watch']);
