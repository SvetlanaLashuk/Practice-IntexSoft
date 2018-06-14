var Ajv = require('ajv');
var localize = require('ajv-i18n');

var validation = function (schema, data) {
    var ajv = new Ajv({allErrors: true});
    var validate = ajv.compile(schema);
    var valid = validate(data);
    if (!valid) {
        // ru for Russian
        localize.ru(validate.errors);
        // string with all errors and data paths
        console.log(ajv.errorsText(validate.errors, {separator: '\n'}));
    }
    else console.log("JSON is valid!");
};
module.exports = validation;