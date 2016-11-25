HTMLHint-TeamCity
=================

[![NPM version](https://img.shields.io/npm/v/htmlhint-teamcity.svg)](https://www.npmjs.com/package/htmlhint-teamcity)
[![MIT License](https://img.shields.io/github/license/SiCoe/htmlhint-teamcity.svg)](https://github.com/SiCoe/htmlhint-teamcity/blob/master/LICENSE)
[![Dependency Status](https://img.shields.io/david/SiCoe/htmlhint-teamcity.svg)](https://david-dm.org/SiCoe/htmlhint-teamcity)
[![devDependency Status](https://img.shields.io/david/dev/SiCoe/htmlhint-teamcity.svg)](https://david-dm.org/SiCoe/htmlhint-teamcity?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/SiCoe/htmlhint-teamcity.svg)](https://github.com/SiCoe/htmlhint-teamcity/issues)

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