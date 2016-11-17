var tsm = require('teamcity-service-messages');
var path = require('path');

var REPORTER = 'HtmlHint';

module.exports = function (file) {
    if (file.htmlhint && file.htmlhint.errorCount > 0) {

        tsm.testSuiteStarted({ name: REPORTER });

        var filePath = path.relative(file.cwd, file.htmlhint.messages[0].file);

        tsm.testSuiteStarted({ name: filePath });

        file.htmlhint.messages.forEach(function (message) {
            var error = message.error;
            tsm.testStarted(error.rule.description)
                .testFailed({
                    name: "line " + error.line + ", col " + error.col + ", " + error.message,
                    message: error.message,
                    detailed: "evidence:" + error.evidence + " (" + error.rule.link + ")"
                })
                .testFinished({ name: error.rule.description });
        });

        tsm.testSuiteFinished({ name: filePath });
        tsm.testSuiteFinished({ name: REPORTER });
    }
};
