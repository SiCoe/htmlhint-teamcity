var tsm = require('teamcity-service-messages');
var path = require('path');

var REPORTER = 'HtmlHint';

function addRule(rules, rule) {
    rule.errors = [];
    rules.push(rule);
    return rule;
}

module.exports = file => {
    if (file.htmlhint && file.htmlhint.errorCount > 0) {

        tsm.testSuiteStarted({ name: REPORTER });

        var filePath = path.relative(file.cwd, file.htmlhint.messages[0].file);

        tsm.testSuiteStarted({ name: filePath });

        file.htmlhint.messages
            .reduce((currentRules, message) => {
                //create array of rules with their associated errors
                (
                    currentRules.find(rule => message.error.rule.id === rule.id) ||
                    addRule(currentRules, message.error.rule)
                ).errors.push(message.error);
                return currentRules;
            }, [])
            .forEach(rule => {
                //iterate over the array of rules and output new testFailed for each error on that rule
                tsm.testSuiteStarted({ name: rule.description });

                rule.errors.forEach(error => {
                    var name = "line " + error.line + ", col " + error.col + ", " + error.message;
                    tsm.testStarted({ name: name })
                        .testFailed({
                            name: name,
                            message: error.message,
                            detailed: "evidence:" + error.evidence + " (" + error.rule.link + ")"
                        })
                        .testFinished({ name: name });
                });

                tsm.testSuiteFinished({ name: rule.description });
            });

        tsm.testSuiteFinished({ name: filePath });
        tsm.testSuiteFinished({ name: REPORTER });
    }
};
