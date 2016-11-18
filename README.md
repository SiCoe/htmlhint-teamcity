HTMLHint-TeamCity
=================

TeamCity reporter for [HTMLHint](https://htmlhint.com) errors.

## Install

```shell
npm install --save-dev htmlhint-teamcity
```

## Usage

Use the [gulp-htmlhint](https://www.npmjs.com/package/gulp-htmlhint) module
for [gulp](https://www.npmjs.com/package/gulp) to pipe in files to be analysed.

When run in [TeamCity](https://www.jetbrains.com/teamcity/) the errors will
show as failed test results and can therefore fail the build. 

```js
var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');

gulp.task('default', function () {
    gulp.src(['**/*.html'])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter('htmlhint-teamcity'));
```

Errors are grouped by file and then by [HTMLHint rule](https://github.com/yaniswang/HTMLHint/wiki/Rules)
when displayed in TeamCity *Build Log* or *Tests* tab.