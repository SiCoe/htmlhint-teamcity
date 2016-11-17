var gulp = require('gulp'),
    print = require('gulp-print'),
    util = require('gulp-util'),
    htmlhint = require('gulp-htmlhint'),
    assert = require('assert'),
    htmlhintTeamcity = require('../');


it('should be used by gulp-htmlhint', function (done) {
    var err = false,
        log = process.stdout.write.bind(process.stdout);

    process.stdout.write = function (str) {
        log(str);

        if (/Doctype must be declared first/ig.test(util.colors.stripColor(str || ''))) {
            err = true;
        }
    };

    gulp
        .src(['test/test-input*.html'])
        .pipe(print())
        .pipe(htmlhint())
        .pipe(htmlhint.reporter(htmlhintTeamcity))
        .on('data', function () {
            process.stdout.write = log;
            assert(err);
        });
        
        done();
});